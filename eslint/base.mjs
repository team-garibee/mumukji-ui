import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export const baseConfig = [
  js.configs.recommended,
  ...tseslint.configs.strict,
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },

    settings: {
      'import/resolver': {
        typescript: true,
      },
    },

    rules: {
      /* TypeScript */
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      /*  import */
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'never',
        },
      ],
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'warn',

      /* style */
      curly: ['error', 'all'],
      'prefer-destructuring': [
        'warn',
        {
          VariableDeclarator: {
            object: true,
            array: false,
          },
        },
      ],
      eqeqeq: 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
];
