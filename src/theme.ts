import { useEffect, useState } from 'react';

export type ThemeName = 'light' | 'dark';

export interface ThemeOptions {
  /** localStorage key that remembers the choice. Match it in any pre-paint script. */
  storageKey?: string;
}

const DEFAULT_STORAGE_KEY = 'miso-theme';
const CHANGE_EVENT = 'miso-theme-change';

/** Activates a token set. theme.css reads the data-theme attribute on <html>. */
export function applyTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
}

/** Returns the saved theme; without a saved choice, follows the operating system preference. */
export function getTheme({ storageKey = DEFAULT_STORAGE_KEY }: ThemeOptions = {}): ThemeName {
  const stored = localStorage.getItem(storageKey);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Applies, saves, and broadcasts a theme. Every mounted useTheme hook updates. */
export function setTheme(theme: ThemeName, { storageKey = DEFAULT_STORAGE_KEY }: ThemeOptions = {}) {
  applyTheme(theme);
  localStorage.setItem(storageKey, theme);
  window.dispatchEvent(new CustomEvent<ThemeName>(CHANGE_EVENT, { detail: theme }));
}

/** Reads the current theme and keeps it in sync with setTheme calls from anywhere. */
export function useTheme({ storageKey }: ThemeOptions = {}) {
  const [theme, setCurrent] = useState<ThemeName>('light');

  useEffect(() => {
    const initial = getTheme({ storageKey });
    applyTheme(initial);
    setCurrent(initial);

    const onChange = (event: Event) => setCurrent((event as CustomEvent<ThemeName>).detail);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, [storageKey]);

  return { theme, setTheme: (next: ThemeName) => setTheme(next, { storageKey }) };
}
