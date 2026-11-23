import { createContext, useCallback, useContext, useMemo, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { getTopModal, subscribeModals } from '../Modal/modalStack';
import { Toast, type ToastTone } from './Toast';

export type ToastPosition = 'top' | 'bottom' | 'center';

export interface ToastOptions {
  tone?: ToastTone;
  title: string;
  children?: ReactNode;
  /** Milliseconds until auto-dismiss. Overrides the provider's duration. Omit or use 0 to keep the toast until dismissed. */
  duration?: number;
}

export interface ToastApi {
  /** Shows a toast and returns its id. */
  show: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

export interface ToastProviderProps {
  position?: ToastPosition;
  /** Auto-dismiss time in milliseconds for every toast. Toasts stay until dismissed unless this is set. */
  duration?: number;
  children: ReactNode;
}

const positionClass: Record<ToastPosition, string> = {
  top: 'top-4 left-1/2 -translate-x-1/2',
  bottom: 'bottom-4 left-1/2 -translate-x-1/2',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

interface ActiveToast extends ToastOptions {
  id: number;
  timeout: number;
  paused: boolean;
}

// Hover and focus each hold a toast open. The timer resumes only when no holds remain.
type Hold = 'pointer' | 'focus';

interface Timer {
  handle?: ReturnType<typeof setTimeout>;
  remaining: number;
  startedAt: number;
  holds: Set<Hold>;
}

const ToastContext = createContext<ToastApi | null>(null);

// The region is portaled after mount, so nothing touches the DOM during server render. It is
// mounted only while toasts exist, so Toast's live regions are never removed mid-message.
// With a modal open, the region portals into that modal's <dialog>: browsers make everything
// outside an open modal inert, so a toast in document.body could be seen but not clicked.
export function ToastProvider({ position = 'top', duration = 0, children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);
  const [mounted, setMounted] = useState(false);
  const modal = useSyncExternalStore(subscribeModals, getTopModal, getTopModal);
  const timers = useRef(new Map<number, Timer>());
  const nextId = useRef(0);

  useEffect(() => {
    setMounted(true);
    const pending = timers.current;
    return () => {
      pending.forEach((timer) => clearTimeout(timer.handle));
      pending.clear();
    };
  }, []);

  const dismiss = useCallback((id: number) => {
    clearTimeout(timers.current.get(id)?.handle);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const start = useCallback(
    (id: number, timer: Timer) => {
      timer.startedAt = Date.now();
      timer.handle = setTimeout(() => dismiss(id), timer.remaining);
    },
    [dismiss],
  );

  const setPaused = useCallback((id: number, paused: boolean) => {
    setToasts((current) => current.map((toast) => (toast.id === id ? { ...toast, paused } : toast)));
  }, []);

  const hold = useCallback(
    (id: number, reason: Hold) => {
      const timer = timers.current.get(id);
      if (!timer || timer.holds.has(reason)) return;
      timer.holds.add(reason);
      if (timer.holds.size > 1) return;
      clearTimeout(timer.handle);
      timer.remaining -= Date.now() - timer.startedAt;
      setPaused(id, true);
    },
    [setPaused],
  );

  const release = useCallback(
    (id: number, reason: Hold) => {
      const timer = timers.current.get(id);
      if (!timer || !timer.holds.has(reason)) return;
      timer.holds.delete(reason);
      if (timer.holds.size > 0) return;
      start(id, timer);
      setPaused(id, false);
    },
    [setPaused, start],
  );

  const show = useCallback(
    (options: ToastOptions) => {
      nextId.current += 1;
      const id = nextId.current;
      const timeout = options.duration ?? duration;
      setToasts((current) => [...current, { ...options, id, timeout, paused: false }]);
      if (timeout > 0) {
        const timer: Timer = { remaining: timeout, startedAt: 0, holds: new Set() };
        timers.current.set(id, timer);
        start(id, timer);
      }
      return id;
    },
    [duration, start],
  );

  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {mounted &&
        toasts.length > 0 &&
        createPortal(
          <div className={`fixed z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 ${positionClass[position]}`}>
            {toasts.map((toast) => (
              <div
                key={toast.id}
                onPointerEnter={() => hold(toast.id, 'pointer')}
                onPointerLeave={() => release(toast.id, 'pointer')}
                onFocus={() => hold(toast.id, 'focus')}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) release(toast.id, 'focus');
                }}
              >
                <Toast
                  tone={toast.tone}
                  title={toast.title}
                  duration={toast.timeout}
                  paused={toast.paused}
                  onDismiss={() => dismiss(toast.id)}
                >
                  {toast.children}
                </Toast>
              </div>
            ))}
          </div>,
          modal ?? document.body,
        )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast must be used inside <ToastProvider>.');
  return api;
}
