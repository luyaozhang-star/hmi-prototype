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
    const newPrefix = prefix ? `${prefix}-${key}` : key;
    
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
 * Load all token files
 */
function loadTokens(dir, tokenMap = {}) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      loadTokens(filePath, tokenMap);
    } else if (file.endsWith('.json') && !file.startsWith('.') && !file.startsWith('$')) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const tokens = JSON.parse(content);
        Object.assign(tokenMap, tokens);
      } catch (error) {
        console.error(`Error loading ${filePath}:`, error.message);
      }
    }
  }
  
  return tokenMap;
}

/**
 * Main transformation process
 */
function main() {
  console.log('🎨 Starting Design Token Transformation...\n');
  
  // Load all tokens
  console.log('📖 Loading tokens from:', TOKENS_DIR);
  const allTokens = loadTokens(TOKENS_DIR);
  
  // Flatten tokens
  console.log('🔄 Flattening token structure...');
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
  
  // Generate theme-specific CSS (Dark/Light)
  console.log('\n🌓 Generating theme-specific CSS...');
  
  // Dark theme
  const darkTokensPath = path.join(TOKENS_DIR, '03_Semantics', 'Dark.json');
  if (fs.existsSync(darkTokensPath)) {
    const darkTokens = JSON.parse(fs.readFileSync(darkTokensPath, 'utf8'));
    const darkFlattened = flattenTokens(darkTokens, '', allTokens);
    const darkCSS = generateCSS(darkFlattened, 'dark');
    fs.writeFileSync(path.join(OUTPUT_CSS_DIR, 'theme-dark.css'), darkCSS);
    console.log('✅ Dark theme CSS generated');
  }
  
  // Light theme
  const lightTokensPath = path.join(TOKENS_DIR, '03_Semantics', 'Light.json');
  if (fs.existsSync(lightTokensPath)) {
    const lightTokens = JSON.parse(fs.readFileSync(lightTokensPath, 'utf8'));
    const lightFlattened = flattenTokens(lightTokens, '', allTokens);
    const lightCSS = generateCSS(lightFlattened, 'light');
    fs.writeFileSync(path.join(OUTPUT_CSS_DIR, 'theme-light.css'), lightCSS);
    console.log('✅ Light theme CSS generated');
  }
  
  console.log('\n✨ Design token transformation complete!\n');
}

// Run the transformation
main();

