import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';

describe('Toast', () => {
  it('announces errors as alerts', () => {
    render(<Toast tone="error" title="Payment failed" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Payment failed');
  });

  it('announces the default tone as a polite status', () => {
    render(<Toast title="Saved" />);

    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });

  it('shows the details under the title', () => {
    render(<Toast title="Saved">Your changes are live.</Toast>);

    expect(screen.getByRole('status')).toHaveTextContent('Your changes are live.');
  });

  it('calls onDismiss from the dismiss button', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Toast title="Saved" onDismiss={onDismiss} />);

    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders no dismiss button without onDismiss', () => {
    render(<Toast title="Saved" />);

    expect(screen.queryByRole('button', { name: 'Dismiss notification' })).not.toBeInTheDocument();
  });
});
