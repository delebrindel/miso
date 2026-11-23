import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';

export type ThemeName = 'light' | 'dark';

export interface ThemeToggleProps {
  /** localStorage key that remembers the choice. Match it in any pre-paint script. */
  storageKey?: string;
  className?: string;
}

/** Activates a token set. theme.css reads the data-theme attribute on <html>. */
export function applyTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
}

// A saved choice wins; otherwise follow the operating system preference.
function readInitialTheme(storageKey: string): ThemeName {
  const stored = localStorage.getItem(storageKey);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle({ storageKey = 'miso-theme', className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeName>('light');

  useEffect(() => {
    const initial = readInitialTheme(storageKey);
    applyTheme(initial);
    setTheme(initial);
  }, [storageKey]);

  const next: ThemeName = theme === 'dark' ? 'light' : 'dark';

  const switchTheme = () => {
    applyTheme(next);
    localStorage.setItem(storageKey, next);
    setTheme(next);
  };

  return (
    <Button variant="secondary" size="sm" className={className} onClick={switchTheme}>
      Switch to {next} theme
    </Button>
  );
}
