#!/usr/bin/env node

/**
 * Design Token Transformation Script
 * Converts JSON design tokens to CSS variables
 * 
 * This script reads the Design Tokens directory and generates:
 * - CSS variables for use in stylesheets
 * - JavaScript/TypeScript token objects for programmatic access
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const TOKENS_DIR = path.join(__dirname, '../../Design Tokens');
const OUTPUT_CSS_DIR = path.join(__dirname, '../src/styles/tokens');
const OUTPUT_JS_DIR = path.join(__dirname, '../src/tokens');

// Ensure output directories exist
[OUTPUT_CSS_DIR, OUTPUT_JS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Deep merge two objects
 */
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        // If the value is an object (and not null or array), recursively merge
        // But only if it doesn't have 'value' and 'type' properties (which indicates it's a token)
        if (!('value' in source[key] && 'type' in source[key])) {
          result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
          // It's a token definition, just assign it
          result[key] = source[key];
        }
      } else {
        // For primitives, arrays, or null, just assign
        result[key] = source[key];
      }
    }
  }
  
  return result;
}

/**
 * Resolve token references like {color-primitives.White.White}
 */
function resolveTokenValue(value, tokenMap) {
  if (typeof value !== 'string') return value;
  
  // Match {token.reference}
  const referenceMatch = value.match(/^\{(.+)\}$/);
  if (referenceMatch) {
    const reference = referenceMatch[1];
    const resolvedValue = getNestedValue(tokenMap, reference);
    
    // Extract the actual value if it's a token object
    const actualValue = (resolvedValue && typeof resolvedValue === 'object' && 'value' in resolvedValue) 
      ? resolvedValue.value 
      : resolvedValue;
    
    // Recursively resolve if the resolved value also contains a reference
    if (actualValue && typeof actualValue === 'string' && actualValue.includes('{')) {
      return resolveTokenValue(actualValue, tokenMap);
    }
    
    return actualValue || value;
  }
  
  // Handle inline references like "blur({blur.blur-light})"
  return value.replace(/\{([^}]+)\}/g, (match, reference) => {
    const resolvedValue = getNestedValue(tokenMap, reference);
    const actualValue = (resolvedValue && typeof resolvedValue === 'object' && 'value' in resolvedValue) 
      ? resolvedValue.value 
      : resolvedValue;
    
    // If still unresolved, return the match without braces to avoid invalid CSS
    const result = actualValue || match;
    
    // Recursively resolve if the result still contains references
    if (typeof result === 'string' && result.includes('{')) {
      return resolveTokenValue(result, tokenMap);
    }
    
    return result;
  });
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj, path) {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object') {
      // Try direct key access
      if (key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  
  // If the final value is a token object with a 'value' property, return the whole object
  // so that resolveTokenValue can extract the value and recursively resolve if needed
  return current;
}

/**
 * Flatten nested token object to CSS variable format
 */
function flattenTokens(obj, prefix = '', tokenMap = {}) {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Check if the key already starts with the prefix to avoid duplication
    // e.g., prefix="surface" and key="surface-primary-enabled" -> use just "surface-primary-enabled"
    let newPrefix;
    if (prefix && key.startsWith(prefix + '-')) {
      // Key already contains the prefix, use it as is
      newPrefix = prefix ? `${prefix}-${key.substring(prefix.length + 1)}` : key;
    } else if (prefix && key.startsWith(prefix)) {
      // Key starts with prefix but no dash (e.g., "onSurface" with prefix "onSurface")
      // Use the key directly without adding prefix again
      newPrefix = key;
    } else {
      // Normal case: add prefix
      newPrefix = prefix ? `${prefix}-${key}` : key;
    }
    
    if (value && typeof value === 'object') {
      // If object has a 'value' property, it's a token
      if ('value' in value && 'type' in value) {
        const resolvedValue = resolveTokenValue(value.value, tokenMap);
        result[newPrefix] = {
          value: resolvedValue,
          type: value.type,
          original: value.value
        };
      } else {
        // Recursively flatten
        Object.assign(result, flattenTokens(value, newPrefix, tokenMap));
      }
    }
  }
  
  return result;
}

/**
 * Convert token value to CSS-compatible format
 */
function formatCSSValue(value, type) {
  if (value === null || value === undefined) return '';
  
  switch (type) {
    case 'dimension':
    case 'borderRadius':
    case 'lineHeight':
      // If it's a number without unit, add px
      return typeof value === 'number' ? `${value}px` : value;
    
    case 'fontWeights':
      return value.toString();
    
    case 'fontFamilies':
      // Ensure font family is quoted if it contains spaces
      return value.includes(' ') && !value.startsWith('"') ? `"${value}"` : value;
    
    case 'letterSpacing':
      return typeof value === 'number' ? `${value}px` : value;
    
    case 'color':
      return value;
    
    case 'typography':
      // Typography is a composite type, handle separately
      return null;
    
    default:
      return value;
  }
}

/**
 * Generate CSS variables from tokens
 */
function generateCSS(tokens, themeName = '') {
  const cssVars = [];
  const themeClass = themeName ? `.theme-${themeName}` : ':root';
  
  cssVars.push(`/* Auto-generated from Design Tokens${themeName ? ` - ${themeName} theme` : ''} */`);
  cssVars.push(`${themeClass} {`);
  
  for (const [name, token] of Object.entries(tokens)) {
    if (token.type === 'typography') {
      // Skip typography composite tokens in CSS vars, handle them separately
      continue;
    }
    
    const cssValue = formatCSSValue(token.value, token.type);
    if (cssValue) {
      const cssVarName = name.replace(/_/g, '-');
      cssVars.push(`  --${cssVarName}: ${cssValue};`);
    }
  }
  
  cssVars.push('}\n');
  
  return cssVars.join('\n');
}

/**
 * Generate typography classes from typography tokens
 */
function generateTypographyCSS(tokens) {
  const css = ['/* Typography Classes */\n'];
  
  for (const [name, token] of Object.entries(tokens)) {
    if (token.type === 'typography' && typeof token.value === 'object') {
      const className = name.replace(/_/g, '-');
      css.push(`.typography-${className} {`);
      
      const typo = token.value;
      if (typo.fontFamily) css.push(`  font-family: var(--${typo.fontFamily.replace(/[{}]/g, '').replace(/\./g, '-')});`);
      if (typo.fontWeight) css.push(`  font-weight: var(--${typo.fontWeight.replace(/[{}]/g, '').replace(/\./g, '-')});`);
      if (typo.fontSize) css.push(`  font-size: var(--${typo.fontSize.replace(/[{}]/g, '').replace(/\./g, '-')});`);
      if (typo.lineHeight) css.push(`  line-height: var(--${typo.lineHeight.replace(/[{}]/g, '').replace(/\./g, '-')});`);
      if (typo.letterSpacing) css.push(`  letter-spacing: var(--${typo.letterSpacing.replace(/[{}]/g, '').replace(/\./g, '-')});`);
      
      css.push('}\n');
    }
  }
  
  return css.join('\n');
}

/**
 * Generate JavaScript/TypeScript token object
 */
function generateJS(tokens) {
  const js = ['// Auto-generated from Design Tokens\n'];
  js.push('export const designTokens = ');
  js.push(JSON.stringify(tokens, null, 2));
  js.push(';\n');
  
  // Generate TypeScript types
  js.push('\nexport type TokenType = ');
  const types = [...new Set(Object.values(tokens).map(t => `'${t.type}'`))];
  js.push(types.join(' | '));
  js.push(';\n');
  
  js.push('\nexport interface Token {\n');
  js.push('  value: any;\n');
  js.push('  type: TokenType;\n');
  js.push('  original?: string;\n');
  js.push('}\n');
  
  return js.join('');
}

/**
 * Load token files from a specific directory (non-recursive)
 */
function loadTokensFromDir(dir) {
  let tokens = {};
  
  if (!fs.existsSync(dir)) {
    return tokens;
  }
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (!stat.isDirectory() && file.endsWith('.json') && !file.startsWith('.') && !file.startsWith('$')) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileTokens = JSON.parse(content);
        // Use deep merge to preserve tokens from multiple files
        tokens = deepMerge(tokens, fileTokens);
      } catch (error) {
        console.error(`Error loading ${filePath}:`, error.message);
      }
    }
  }
  
  return tokens;
}

/**
 * Load tokens with proper layering: _Base -> 01_Brand -> 03_Semantics
 */
function loadTokensLayered() {
  console.log('📖 Loading tokens with proper layering...\n');
  
  // Layer 1: Load _Base primitives
  console.log('  📦 Layer 1: Loading _Base primitives...');
  const baseDir = path.join(TOKENS_DIR, '_Base');
  const baseTokens = loadTokensFromDir(baseDir);
  console.log(`     ✓ Loaded ${Object.keys(baseTokens).length} base token groups`);
  
  // Layer 2: Load and resolve 01_Brand tokens (reference _Base)
  // Note: 01_Brand contains multiple variants (Default, HighContrast, Minimal)
  // We only load Default.json as it's the standard brand variant
  console.log('  📦 Layer 2: Loading 01_Brand tokens...');
  const brandFile = path.join(TOKENS_DIR, '01_Brand', 'Default.json');
  let brandTokens = {};
  if (fs.existsSync(brandFile)) {
    try {
      const content = fs.readFileSync(brandFile, 'utf8');
      brandTokens = JSON.parse(content);
      console.log(`     ✓ Loaded Default brand variant`);
    } catch (error) {
      console.error(`Error loading ${brandFile}:`, error.message);
    }
  }
  
  // Merge base and brand for resolution context (deep merge to preserve all tokens)
  const baseAndBrand = deepMerge(baseTokens, brandTokens);
  console.log(`     ✓ Brand token groups: ${Object.keys(brandTokens).join(', ')}`);
  
  // Layer 3: Load 02_Global if it exists
  console.log('  📦 Layer 3: Loading 02_Global tokens...');
  const globalFile = path.join(TOKENS_DIR, '02_Global.json');
  let globalTokens = {};
  if (fs.existsSync(globalFile)) {
    try {
      const content = fs.readFileSync(globalFile, 'utf8');
      globalTokens = JSON.parse(content);
      console.log(`     ✓ Loaded global tokens`);
    } catch (error) {
      console.error(`Error loading 02_Global.json:`, error.message);
    }
  } else {
    console.log(`     ⊘ No 02_Global.json found (optional)`);
  }
  
  // Merge all layers up to this point (deep merge)
  const coreTokens = deepMerge(baseAndBrand, globalTokens);
  
  // Layer 4: Load 03_Semantics (reference 01_Brand and _Base)
  console.log('  📦 Layer 4: Loading 03_Semantics tokens...');
  const semanticsDir = path.join(TOKENS_DIR, '03_Semantics');
  const semanticsTokens = loadTokensFromDir(semanticsDir);
  console.log(`     ✓ Loaded ${Object.keys(semanticsTokens).length} semantic token groups`);
  
  // Merge all core layers (deep merge)
  const allCoreTokens = deepMerge(coreTokens, semanticsTokens);
  
  // Layer 5: Skip 04_Responsive to preserve typography and spacing from 02_Global
  // Note: 04_Responsive contains fontSize and spacing overrides for different screen sizes
  // We skip this layer to ensure all typography and spacing values come from 02_Global.json
  console.log('  📦 Layer 5: Skipping 04_Responsive tokens...');
  console.log('     ⊘ Responsive overrides skipped (typography/spacing from 02_Global only)');
  const responsiveTokens = {};
  
  // Layer 5: Load 05_Motion and 05_Interactions
  console.log('  📦 Layer 5: Loading Motion & Interaction tokens...');
  const motionDir = path.join(TOKENS_DIR, '05_Motion');
  const interactionsDir = path.join(TOKENS_DIR, '05_Interactions');
  const motionTokens = loadTokensFromDir(motionDir);
  const interactionsTokens = loadTokensFromDir(interactionsDir);
  const layer5Count = Object.keys(motionTokens).length + Object.keys(interactionsTokens).length;
  if (layer5Count > 0) {
    console.log(`     ✓ Loaded ${layer5Count} motion/interaction token groups`);
  } else {
    console.log(`     ⊘ No motion/interaction tokens found (optional)`);
  }
  
  // Layer 6: Load 06_Interactions (if separate from 05_Interactions)
  const interactions6Dir = path.join(TOKENS_DIR, '06_Interactions');
  const interactions6Tokens = loadTokensFromDir(interactions6Dir);
  if (Object.keys(interactions6Tokens).length > 0) {
    console.log(`     ✓ Loaded ${Object.keys(interactions6Tokens).length} additional interaction token groups`);
  }
  
  // Layer 7: Load 07_Components
  console.log('  📦 Layer 6: Loading Component tokens...');
  const componentsDir = path.join(TOKENS_DIR, '07_Components');
  const componentsTokens = loadTokensFromDir(componentsDir);
  if (Object.keys(componentsTokens).length > 0) {
    console.log(`     ✓ Loaded ${Object.keys(componentsTokens).length} component token groups`);
  } else {
    console.log(`     ⊘ No component tokens found (optional)`);
  }
  
  // Merge all layers (deep merge to preserve all tokens)
  let allTokens = allCoreTokens;
  allTokens = deepMerge(allTokens, responsiveTokens);
  allTokens = deepMerge(allTokens, motionTokens);
  allTokens = deepMerge(allTokens, interactionsTokens);
  allTokens = deepMerge(allTokens, interactions6Tokens);
  allTokens = deepMerge(allTokens, componentsTokens);
  
  console.log('\n✅ All token layers loaded successfully\n');
  
  return allTokens;
}

/**
 * Main transformation process
 */
function main() {
  console.log('🎨 Starting Design Token Transformation...\n');
  console.log('📐 Token Hierarchy: _Base → 01_Brand → 03_Semantics\n');
  
  // Load tokens with proper layering
  const allTokens = loadTokensLayered();
  
  // Flatten tokens
  console.log('🔄 Flattening and resolving token references...');
  const flattenedTokens = flattenTokens(allTokens, '', allTokens);
  
  console.log(`✅ Processed ${Object.keys(flattenedTokens).length} tokens\n`);
  
  // Generate CSS
  console.log('📝 Generating CSS variables...');
  const css = generateCSS(flattenedTokens);
  const cssPath = path.join(OUTPUT_CSS_DIR, 'tokens.css');
  fs.writeFileSync(cssPath, css);
  console.log(`✅ CSS written to: ${cssPath}`);
  
  // Generate Typography CSS
  const typographyCSS = generateTypographyCSS(flattenedTokens);
  const typoCSSPath = path.join(OUTPUT_CSS_DIR, 'typography.css');
  fs.writeFileSync(typoCSSPath, typographyCSS);
  console.log(`✅ Typography CSS written to: ${typoCSSPath}`);
  
  // Generate JavaScript
  console.log('📝 Generating JavaScript tokens...');
  const js = generateJS(flattenedTokens);
  const jsPath = path.join(OUTPUT_JS_DIR, 'designTokens.js');
  fs.writeFileSync(jsPath, js);
  console.log(`✅ JavaScript written to: ${jsPath}`);
  
  // Generate theme-specific CSS
  // Note: Dark theme is the default for HMI systems (automotive standard)
  console.log('\n🌓 Generating theme-specific CSS...');
  
  // Dark theme (default for HMI)
  const darkTokensPath = path.join(TOKENS_DIR, '03_Semantics', 'Dark.json');
  if (fs.existsSync(darkTokensPath)) {
    const darkTokens = JSON.parse(fs.readFileSync(darkTokensPath, 'utf8'));
    const darkFlattened = flattenTokens(darkTokens, '', allTokens);
    const darkCSS = generateCSS(darkFlattened, 'dark');
    fs.writeFileSync(path.join(OUTPUT_CSS_DIR, 'theme-dark.css'), darkCSS);
    console.log('✅ Dark theme CSS generated (default)');
  }
  
  // Light theme (alternative)
  const lightTokensPath = path.join(TOKENS_DIR, '03_Semantics', 'Light.json');
  if (fs.existsSync(lightTokensPath)) {
    const lightTokens = JSON.parse(fs.readFileSync(lightTokensPath, 'utf8'));
    const lightFlattened = flattenTokens(lightTokens, '', allTokens);
    const lightCSS = generateCSS(lightFlattened, 'light');
    fs.writeFileSync(path.join(OUTPUT_CSS_DIR, 'theme-light.css'), lightCSS);
    console.log('✅ Light theme CSS generated (alternative)');
  }
  
  console.log('\n✨ Design token transformation complete!\n');
}

// Run the transformation
main();

