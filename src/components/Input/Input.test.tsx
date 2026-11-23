import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the field', () => {
    render(<Input label="Email address" />);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
  });

  it('marks the field invalid and links the error message', () => {
    render(<Input label="Email address" error="Enter a valid email." />);

    const field = screen.getByLabelText('Email address');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Enter a valid email.');
  });

  it('links the hint text when there is no error', () => {
    render(<Input label="Email address" hint="Used for receipts." />);

    expect(screen.getByLabelText('Email address')).toHaveAccessibleDescription('Used for receipts.');
    expect(screen.getByLabelText('Email address')).not.toHaveAttribute('aria-invalid');
  });
});
