'use client';

import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      'object-curly-spacing': ['warn', 'always'],
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'padded-blocks': ['warn', 'never'],
      'no-trailing-spaces': 'warn',
      'no-tabs': 'warn',
      'comma-dangle': ['warn', 'never'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/self-closing-comp': ['warn', {
        component: true,
        html: false
      }],
      'react/jsx-props-no-multi-spaces': 'warn'
    }
  },

  // TypeScript-specific rules
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      'indent': ['warn', 'tab', { SwitchCase: 1 }],
      'no-tabs': 'off',
      'no-trailing-spaces': 'warn',
      'padded-blocks': ['warn', 'never'],
      'no-multiple-empty-lines': ['warn', { max: 1 }]
    }
  }
]);