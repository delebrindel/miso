import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
  { value: 'mx', label: 'Mexico' },
  { value: 'pe', label: 'Peru', disabled: true },
  { value: 'cl', label: 'Chile' },
];

describe('Select', () => {
  it('associates the label with the field', () => {
    render(<Select label="Country" options={options} />);

    expect(screen.getByLabelText('Country')).toBeInTheDocument();
  });

  it('links the hint text when there is no error', () => {
    render(<Select label="Country" options={options} hint="Used for tax region." />);

    expect(screen.getByLabelText('Country')).toHaveAccessibleDescription('Used for tax region.');
    expect(screen.getByLabelText('Country')).not.toHaveAttribute('aria-invalid');
  });

  it('marks the field invalid and links the error message', () => {
    render(<Select label="Country" options={options} error="Select a country." />);

    const field = screen.getByLabelText('Country');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Select a country.');
  });

  it('disables options marked disabled', () => {
    render(<Select label="Country" options={options} />);

    expect(screen.getByRole('option', { name: 'Peru' })).toBeDisabled();
    expect(screen.getByRole('option', { name: 'Mexico' })).toBeEnabled();
  });

  it('reports the chosen option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Country" options={options} onChange={onChange} />);

    await user.selectOptions(screen.getByLabelText('Country'), 'cl');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('Country')).toHaveValue('cl');
  });
});
