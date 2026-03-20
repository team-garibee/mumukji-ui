import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconArrowRight } from './IconArrowRight';

const meta: Meta<typeof IconArrowRight> = {
  title: 'Iconography',
  component: IconArrowRight,
};

export default meta;

export const Default: StoryObj<typeof IconArrowRight> = {
  args: {
    size: 24,
    color: 'gray',
  },
};
