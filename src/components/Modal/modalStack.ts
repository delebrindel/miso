// Open modal dialogs in the order they opened. The last entry is the topmost one.
// Browsers make everything outside a modal dialog inert, so overlays that must stay clickable
// (toasts) render inside the topmost dialog instead of beside it.
const openModals: HTMLDialogElement[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function pushModal(dialog: HTMLDialogElement) {
  openModals.push(dialog);
  notify();
}

export function popModal(dialog: HTMLDialogElement) {
  const index = openModals.indexOf(dialog);
  if (index === -1) return;
  openModals.splice(index, 1);
  notify();
}

export function getTopModal(): HTMLDialogElement | null {
  return openModals.at(-1) ?? null;
}

export function subscribeModals(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
