import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { ToastProvider, useToast } from './ToastProvider';

function Demo() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() => toast.show({ title: 'Changes saved', duration: 5000, children: 'Closes after 5 seconds.' })}
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.show({ tone: 'success', title: 'Published', children: 'Your page is live.' })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.show({ tone: 'error', title: 'Could not save', children: 'Stays until dismissed.' })}
      >
        Error
      </Button>
    </div>
  );
}

function ModalDemo() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit project">
        <p className="text-sm text-muted">Saving from here shows a toast above this dialog.</p>
        <div className="flex justify-end">
          <Button
            onClick={() => toast.show({ tone: 'success', title: 'Saved', children: 'Project updated.' })}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
}

const meta = {
  title: 'Components/Toast Provider',
  component: ToastProvider,
  args: { children: <Demo /> },
  argTypes: {
    position: { control: 'inline-radio', options: ['top', 'bottom', 'center'] },
    duration: {
      control: { type: 'number', min: 0, step: 500 },
      description: 'Auto-dismiss time in ms for every toast. Leave unset or 0 to keep toasts until dismissed.',
    },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { position: 'top', duration: 0 } };

export const WithModal: Story = { args: { children: <ModalDemo /> } };
