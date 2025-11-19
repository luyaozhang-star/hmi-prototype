/**
 * useDesignTokens Hook
 * 
 * Provides programmatic access to design tokens in React components
 * 
 * Usage:
 * const tokens = useDesignTokens();
 * const color = tokens.get('color-functional-warning');
 * 
 * Or use CSS variables directly:
 * style={{ color: 'var(--color-functional-warning)' }}
 */

import { useMemo } from 'react';
import { designTokens } from '../tokens/designTokens.js';

/**
 * Hook to access design tokens
 */
export function useDesignTokens() {
  const tokens = useMemo(() => {
    return {
      /**
       * Get a token value by name
       * @param {string} tokenName - The token name (e.g., 'color-functional-warning')
       * @returns {any} The token value
       */
      get: (tokenName) => {
        const token = designTokens[tokenName];
        return token ? token.value : undefined;
      },
      
      /**
       * Get a CSS variable reference
       * @param {string} tokenName - The token name
       * @returns {string} CSS variable reference (e.g., 'var(--color-functional-warning)')
       */
      getCSSVar: (tokenName) => {
        const cssVarName = tokenName.replace(/_/g, '-');
        return `var(--${cssVarName})`;
      },
      
      /**
       * Get all tokens of a specific type
       * @param {string} type - The token type (e.g., 'color', 'dimension')
       * @returns {Object} Object containing all tokens of that type
       */
      getByType: (type) => {
        return Object.entries(designTokens)
          .filter(([_, token]) => token.type === type)
          .reduce((acc, [name, token]) => {
            acc[name] = token.value;
            return acc;
          }, {});
      },
      
      /**
       * Get all color tokens
       * @returns {Object} Object containing all color tokens
       */
      getColors: () => {
        return tokens.getByType('color');
      },
      
      /**
       * Get all spacing tokens
       * @returns {Object} Object containing all spacing tokens
       */
      getSpacing: () => {
        return tokens.getByType('dimension');
      },
      
      /**
       * Get all typography tokens
       * @returns {Object} Object containing all typography tokens
       */
      getTypography: () => {
        return tokens.getByType('typography');
      },
      
      /**
       * Get raw token object
       * @param {string} tokenName - The token name
       * @returns {Object} The complete token object with value, type, and original
       */
      getRaw: (tokenName) => {
        return designTokens[tokenName];
      },
      
      /**
       * Check if a token exists
       * @param {string} tokenName - The token name
       * @returns {boolean} True if token exists
       */
      has: (tokenName) => {
        return tokenName in designTokens;
      },
      
      /**
       * Get all token names
       * @returns {string[]} Array of all token names
       */
      getAllNames: () => {
        return Object.keys(designTokens);
      },
      
      /**
       * Direct access to all tokens
       */
      all: designTokens
    };
  }, []);
  
  return tokens;
}

/**
 * Helper function to create a style object using design tokens
 * @param {Object} styles - Style object with token references
 * @returns {Object} Resolved style object
 */
export function useTokenStyles(styles) {
  const tokens = useDesignTokens();
  
  return useMemo(() => {
    const resolved = {};
    
    for (const [key, value] of Object.entries(styles)) {
      // If value starts with '$', treat it as a token reference
      if (typeof value === 'string' && value.startsWith('$')) {
        const tokenName = value.substring(1);
        resolved[key] = tokens.getCSSVar(tokenName);
      } else {
        resolved[key] = value;
      }
    }
    
    return resolved;
  }, [styles, tokens]);
}

export default useDesignTokens;

