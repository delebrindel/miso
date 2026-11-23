import { useEffect, useId, useRef, type MouseEvent, type ReactNode, type SyntheticEvent } from 'react';
import { popModal, pushModal } from './modalStack';
import { Icon } from '../Icon/Icon';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

// Built on the native <dialog>: showModal() gives focus trapping, inert background,
// and Escape handling without a custom focus-trap implementation.
export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Toasts render inside the topmost open dialog, so each open modal registers itself.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    pushModal(dialog);
    return () => popModal(dialog);
  }, [open]);

  // Escape fires the dialog's "cancel" event and would close it natively;
  // prevent that so the parent stays the single source of truth for `open`.
  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    // React bubbles cancel through the component tree, so a nested Modal's Escape reaches this
    // handler too. Only the dialog that owns the event should close.
    if (event.target !== event.currentTarget) return;
    event.preventDefault();
    onClose();
  };

  // Clicks on the backdrop land on the <dialog> itself, not on its content.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className="m-auto w-full max-w-md rounded-lg bg-surface p-0 text-fg shadow-xl backdrop:bg-slate-900/50"
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-muted hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
