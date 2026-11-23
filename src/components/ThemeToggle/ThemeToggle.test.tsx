import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ThemeToggle', () => {
  it('applies the saved theme and saves the next switch', async () => {
    const user = userEvent.setup();
    localStorage.setItem('miso-theme', 'dark');
    render(<ThemeToggle />);

    expect(document.documentElement.dataset.theme).toBe('dark');
    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }));

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('miso-theme')).toBe('light');
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  });

  it('follows the system preference when nothing is saved', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
    render(<ThemeToggle />);

    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
