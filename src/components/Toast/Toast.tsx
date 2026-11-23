import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';

export type ToastTone = 'info' | 'success' | 'error';

export interface ToastProps {
  tone?: ToastTone;
  title: string;
  children?: ReactNode;
  onDismiss?: () => void;
  /** Shows a countdown bar that runs down over this many milliseconds. ToastProvider sets it. */
  duration?: number;
  /** Freezes the countdown bar while the toast is held open by hover or focus. ToastProvider sets it. */
  paused?: boolean;
}

const tones: Record<ToastTone, string> = {
  info: 'border-control bg-surface',
  success: 'border-success bg-success-surface',
  error: 'border-danger bg-danger-surface',
};

// Errors use role="alert" so screen readers interrupt; everything else is a polite status.
// Placement and auto-dismiss come from ToastProvider; this component renders one message.
export function Toast({ tone = 'info', title, children, onDismiss, duration = 0, paused = false }: ToastProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-md border-l-4 p-4 text-fg shadow-md ${tones[tone]}`}
    >
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-semibold">{title}</p>
        {children && <div className="text-sm text-muted">{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="rounded-md p-1 text-muted hover:bg-fg/10 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>
      )}
      {duration > 0 && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left bg-accent"
          style={{
            animationName: 'toast-countdown',
            animationDuration: `${duration}ms`,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        />
      )}
    </div>
  );
}
