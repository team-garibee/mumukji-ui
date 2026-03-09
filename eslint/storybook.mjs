import { configs as storybookConfigs } from 'eslint-plugin-storybook';

export const storybookConfig = [
  ...storybookConfigs['flat/recommended'],
  {
    files: ['**/*.stories.{ts,tsx,js,jsx}'],
    rules: {
      'import/no-anonymous-default-export': 'off',
      'import/no-default-export': 'off',
      'no-console': 'off',
    },
  },
];
