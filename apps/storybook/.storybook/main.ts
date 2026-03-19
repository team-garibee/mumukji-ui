/* eslint-disable @typescript-eslint/naming-convention */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  stories: [
    '../docs/*.mdx',
    '../../../packages/**/src/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/**/src/**/*.mdx',
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@mumukji/icons': join(__dirname, '../../../packages/icons/src'),
          '@mumukji/tokens': join(__dirname, '../../../packages/tokens/src'),
          '@mumukji/ui': join(__dirname, '../../../packages/ui/src'),
        },
      },
    });
  },
};
export default config;
