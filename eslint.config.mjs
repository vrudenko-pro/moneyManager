import js from '@eslint/js';
import globals from 'globals';
import eslintReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js,
      '@typescript-eslint': tseslint.plugin,
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      prettier: prettierPlugin,
    },
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json'],
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'prefer-const': 'error',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function' },
      ],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'max-lines': ['warn', { max: 500 }],
      'max-params': ['error', 3],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
