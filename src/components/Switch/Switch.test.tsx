import { fireEvent, render, screen } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('exposes a labelled switch role', () => {
    render(<Switch label="Email notifications" />);

    expect(screen.getByRole('switch', { name: 'Email notifications' })).toBeInTheDocument();
  });

  it('toggles on click and reports the change through onChange', () => {
    const onChange = vi.fn();
    render(<Switch label="Email notifications" onChange={onChange} />);
    const toggle = screen.getByRole('switch', { name: 'Email notifications' });

    fireEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(toggle).toBeChecked();
  });

  it('starts on when defaultChecked is set', () => {
    render(<Switch label="Email notifications" defaultChecked />);

    expect(screen.getByRole('switch', { name: 'Email notifications' })).toBeChecked();
  });
});
