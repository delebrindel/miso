import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('shows and announces Loading by default', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading');
  });

  it('shows and announces a custom label', () => {
    render(<Spinner label="Saving" />);

    expect(screen.getByRole('status')).toHaveTextContent('Saving');
  });
});
