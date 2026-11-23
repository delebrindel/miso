import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Country',
    options: [
      { value: 'mx', label: 'Mexico' },
      { value: 'us', label: 'United States' },
      { value: 'es', label: 'Spain', disabled: true },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Used to choose your tax region.' },
};

export const WithError: Story = {
  args: { error: 'Select a country to continue.' },
};
