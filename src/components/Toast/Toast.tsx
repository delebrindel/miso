import type { ReactNode } from 'react';

export type ToastTone = 'info' | 'success' | 'error';

export interface ToastProps {
  tone?: ToastTone;
  title: string;
  children?: ReactNode;
  onDismiss?: () => void;
}

const tones: Record<ToastTone, string> = {
  info: 'border-slate-300 bg-white',
  success: 'border-emerald-600 bg-emerald-50',
  error: 'border-red-600 bg-red-50',
};

// Errors use role="alert" so screen readers interrupt; everything else is a polite status.
// Timing and placement belong to the caller: this renders one message.
export function Toast({ tone = 'info', title, children, onDismiss }: ToastProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex w-full max-w-sm items-start gap-3 rounded-md border-l-4 p-4 text-slate-900 shadow-md ${tones[tone]}`}
    >
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-semibold">{title}</p>
        {children && <div className="text-sm text-slate-700">{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="rounded-md px-2 text-slate-600 hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          ×
        </button>
      )}
    </div>
  );
}
