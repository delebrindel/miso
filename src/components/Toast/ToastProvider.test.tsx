import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { Modal } from '../Modal/Modal';
import { ToastProvider, useToast, type ToastOptions, type ToastProviderProps } from './ToastProvider';

// jsdom has no showModal(), so stub it the same way Modal.test.tsx does.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close() {
    this.open = false;
  };
});

function Trigger({ label, options }: { label: string; options: ToastOptions }) {
  const toast = useToast();
  return (
    <button type="button" onClick={() => toast.show(options)}>
      {label}
    </button>
  );
}

function renderWithTrigger(options: ToastOptions, provider: Partial<ToastProviderProps> = {}) {
  render(
    <ToastProvider {...provider}>
      <Trigger label="Show" options={options} />
    </ToastProvider>,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Show' }));
}

describe('ToastProvider', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows a toast when show() is called', () => {
    renderWithTrigger({ title: 'Saved', children: 'Your changes are live.' });

    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    expect(screen.getByRole('status')).toHaveTextContent('Your changes are live.');
  });

  it('announces error toasts as alerts', () => {
    renderWithTrigger({ tone: 'error', title: 'Payment failed' });

    expect(screen.getByRole('alert')).toHaveTextContent('Payment failed');
  });

  it('keeps toasts until dismissed by default', () => {
    vi.useFakeTimers();
    renderWithTrigger({ title: 'Saved' });

    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });

  it('uses the provider duration for every toast', () => {
    vi.useFakeTimers();
    renderWithTrigger({ title: 'Saved' }, { duration: 1000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('lets a toast override the provider duration', () => {
    vi.useFakeTimers();
    renderWithTrigger({ title: 'Saved', duration: 3000 }, { duration: 1000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('keeps the toast until dismissed when duration is 0', () => {
    vi.useFakeTimers();
    renderWithTrigger({ title: 'Saved', duration: 0 });

    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByRole('status')).toHaveTextContent('Saved');

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('pauses while hovered and resumes the remaining time on leave', () => {
    vi.useFakeTimers();
    renderWithTrigger({ title: 'Saved', duration: 5000 });
    const toast = screen.getByRole('status');

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    fireEvent.pointerEnter(toast);
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(screen.getByRole('status')).toBeInTheDocument();

    fireEvent.pointerLeave(toast);
    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('stays open while focus is inside the toast', () => {
    vi.useFakeTimers();
    renderWithTrigger({ title: 'Saved', duration: 5000 });
    const dismissButton = screen.getByRole('button', { name: 'Dismiss notification' });

    act(() => {
      dismissButton.focus();
    });
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      dismissButton.blur();
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('stacks several toasts', () => {
    render(
      <ToastProvider>
        <Trigger label="First" options={{ title: 'First saved' }} />
        <Trigger label="Second" options={{ title: 'Second saved' }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));

    expect(screen.getAllByRole('status')).toHaveLength(2);
  });

  it('renders toasts inside an open modal so they stay clickable', () => {
    render(
      <ToastProvider>
        <Modal open onClose={() => {}} title="Edit project">
          <Trigger label="Save" options={{ title: 'Saved' }} />
        </Modal>
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(within(screen.getByRole('dialog')).getByRole('status')).toHaveTextContent('Saved');
  });

  it('moves a toast raised before the modal opened into the modal', () => {
    const { rerender } = render(
      <ToastProvider>
        <Trigger label="Show" options={{ title: 'Saved' }} />
        <Modal open={false} onClose={() => {}} title="Edit project">
          <p>Body</p>
        </Modal>
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Show' }));

    rerender(
      <ToastProvider>
        <Trigger label="Show" options={{ title: 'Saved' }} />
        <Modal open onClose={() => {}} title="Edit project">
          <p>Body</p>
        </Modal>
      </ToastProvider>,
    );

    expect(within(screen.getByRole('dialog')).getByRole('status')).toHaveTextContent('Saved');
  });

  it('throws when useToast is used outside the provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const Orphan = () => {
      useToast();
      return null;
    };

    expect(() => render(<Orphan />)).toThrow('useToast must be used inside <ToastProvider>.');
    consoleError.mockRestore();
  });
});
