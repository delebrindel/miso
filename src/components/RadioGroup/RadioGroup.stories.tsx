import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    legend: 'Engagement type',
    options: [
      { value: 'audit', label: 'Architecture audit' },
      { value: 'build', label: 'Build a feature' },
      { value: 'retainer', label: 'Ongoing retainer' },
    ],
    defaultValue: 'audit',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'You can change this later.' },
};

export const WithError: Story = {
  args: { defaultValue: undefined, error: 'Choose an engagement type.' },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'audit', label: 'Architecture audit' },
      { value: 'build', label: 'Build a feature', disabled: true },
    ],
  },
};
