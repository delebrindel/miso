import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: { title: 'Delete project?', open: false, onClose: () => {}, children: null },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Delete project?">
        <p className="text-sm text-muted">This removes the project and its history. This cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Delete</Button>
        </div>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

function NestedModalDemo() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit project">
        <p className="text-sm text-muted">Changes apply to the whole project.</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={() => setConfirmOpen(true)}>Delete project</Button>
        </div>
        <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Are you sure?">
          <p className="text-sm text-muted">This removes the project and its history. This cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => { setConfirmOpen(false); setOpen(false); }}>Delete</Button>
          </div>
        </Modal>
      </Modal>
    </>
  );
}

export const NestedModal: Story = {
  render: () => <NestedModalDemo />,
};
