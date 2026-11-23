import { useEffect, useId, useRef, type MouseEvent, type ReactNode, type SyntheticEvent } from 'react';

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

  // Escape fires the dialog's "cancel" event and would close it natively;
  // prevent that so the parent stays the single source of truth for `open`.
  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
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
      className="m-auto w-full max-w-md rounded-lg bg-white p-0 text-slate-900 shadow-xl backdrop:bg-slate-900/50"
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
            className="rounded-md px-2 text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
