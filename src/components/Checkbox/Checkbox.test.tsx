import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('associates the label with the checkbox', () => {
    render(<Checkbox label="Subscribe to updates" />);

    expect(screen.getByRole('checkbox', { name: 'Subscribe to updates' })).toBeInTheDocument();
  });

  it('marks the checkbox invalid and links the error message', () => {
    render(<Checkbox label="Accept terms" error="You must accept the terms." />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAccessibleDescription('You must accept the terms.');
  });

  it('reports changes through onChange', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Subscribe to updates" onChange={onChange} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Subscribe to updates' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('checkbox', { name: 'Subscribe to updates' })).toBeChecked();
  });
});
