import { Button } from '../Button/Button';
import { useTheme, type ThemeName } from '../../theme';

export interface ThemeToggleProps {
  /** localStorage key that remembers the choice. Match it in any pre-paint script. */
  storageKey?: string;
  className?: string;
}

export function ThemeToggle({ storageKey, className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme({ storageKey });
  const next: ThemeName = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button variant="secondary" size="sm" className={className} onClick={() => setTheme(next)}>
      Switch to {next} theme
    </Button>
  );
}
