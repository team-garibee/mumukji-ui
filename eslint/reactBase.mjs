import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export const reactBaseConfig = {
  files: ['**/*.{tsx,jsx}'],

  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },

  plugins: {
    react,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11y,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    /* React */
    'react/jsx-pascal-case': 'error',
    'react/self-closing-comp': 'warn',
    'react/no-unknown-property': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'error',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-no-constructed-context-values': 'warn',
    'react/jsx-boolean-value': ['warn', 'never'],
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
      },
    ],

    /* Hooks */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    /* Accessibility */
    'jsx-a11y/alt-text': ['warn', { elements: ['img'] }],
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
  },
};
