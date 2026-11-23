import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

// jsdom does not implement the native <dialog> modal methods, so provide minimal stand-ins.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open');
  };
});

describe('Modal', () => {
  it('labels the dialog with its title', () => {
    render(
      <Modal open onClose={() => {}} title="Delete project?">
        body
      </Modal>,
    );

    expect(screen.getByRole('dialog', { name: 'Delete project?' })).toBeInTheDocument();
  });

  // jsdom does not turn an Escape keypress into a native "cancel" event, so the test
  // dispatches it directly. Real Escape behavior is checked in a browser.
  it('routes the native cancel event to onClose and prevents native close', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Delete project?">
        body
      </Modal>,
    );

    const cancel = new Event('cancel', { cancelable: true });
    fireEvent(screen.getByRole('dialog'), cancel);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(cancel.defaultPrevented).toBe(true);
  });

  it('closes when the backdrop is clicked but not when the content is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Delete project?">
        <p>body text</p>
      </Modal>,
    );

    await user.click(screen.getByText('body text'));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
