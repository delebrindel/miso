import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Toast, type ToastProps } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  args: { title: 'Changes saved', children: 'Your profile was updated.' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'success', 'error'] },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function DismissibleToast(props: ToastProps) {
  const [open, setOpen] = useState(true);
  if (!open) return <Button variant="secondary" onClick={() => setOpen(true)}>Show toast again</Button>;
  return <Toast {...props} onDismiss={() => setOpen(false)} />;
}

export const Info: Story = { args: { tone: 'info' } };

export const Success: Story = { args: { tone: 'success' } };

export const Failure: Story = {
  args: { tone: 'error', title: 'Could not save', children: 'Check your connection and try again.' },
};

export const Dismissible: Story = { render: (args) => <DismissibleToast {...args} /> };
