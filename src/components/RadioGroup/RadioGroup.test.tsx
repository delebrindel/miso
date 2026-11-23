import { fireEvent, render, screen } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'starter', label: 'Starter' },
  { value: 'team', label: 'Team' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

describe('RadioGroup', () => {
  it('names the group with its legend', () => {
    render(<RadioGroup legend="Plan" options={options} />);

    expect(screen.getByRole('group', { name: 'Plan' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('selects the default option and moves selection on click', () => {
    render(<RadioGroup legend="Plan" options={options} defaultValue="starter" />);

    fireEvent.click(screen.getByRole('radio', { name: 'Team' }));

    expect(screen.getByRole('radio', { name: 'Team' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Starter' })).not.toBeChecked();
  });

  it('reports the chosen value and leaves a controlled value alone until the parent updates it', () => {
    const onValueChange = vi.fn();
    render(<RadioGroup legend="Plan" options={options} value="starter" onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('radio', { name: 'Team' }));

    expect(onValueChange).toHaveBeenCalledWith('team');
    expect(screen.getByRole('radio', { name: 'Starter' })).toBeChecked();
  });

  it('links the error message to the group', () => {
    render(<RadioGroup legend="Plan" options={options} error="Choose a plan." />);

    expect(screen.getByRole('group', { name: 'Plan' })).toHaveAccessibleDescription('Choose a plan.');
  });
});
