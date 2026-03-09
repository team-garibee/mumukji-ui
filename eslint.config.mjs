import { defineConfig } from 'eslint/config';
import { baseConfig } from './eslint/base.mjs';
import { reactBaseConfig } from './eslint/reactBase.mjs';
import { storybookConfig } from './eslint/storybook.mjs';

export default defineConfig([
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/.storybook-static/**',
      '**/node_modules/**',
    ],
  },
  ...baseConfig,
  {
    ...reactBaseConfig,
    files: ['packages/ui/**/*.{tsx,jsx}', 'packages/icons/**/*.{tsx,jsx}'],
    rules: {
      ...reactBaseConfig.rules,
      'import/no-default-export': 'error',
    },
  },
  ...storybookConfig,
]);
