import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Subscribe to project updates' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const WithHint: Story = {
  args: { hint: 'One email per week at most.' },
};

export const WithError: Story = {
  args: { label: 'Accept the terms', error: 'You must accept the terms to continue.' },
};

export const Disabled: Story = { args: { disabled: true } };
