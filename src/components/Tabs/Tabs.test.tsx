import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const tabs = [
  { id: 'a', label: 'Alpha', content: 'Alpha panel' },
  { id: 'b', label: 'Beta', content: 'Beta panel', disabled: true },
  { id: 'c', label: 'Gamma', content: 'Gamma panel' },
];

describe('Tabs', () => {
  it('selects the first enabled tab by default and shows only its panel', () => {
    render(<Tabs label="Sections" tabs={tabs} />);

    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Alpha' })).toBeVisible();
    expect(screen.getByText('Gamma panel')).not.toBeVisible();
  });

  it('moves between enabled tabs with arrow keys, skipping disabled ones', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Sections" tabs={tabs} />);

    screen.getByRole('tab', { name: 'Alpha' }).focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true');
  });

  it('jumps to the first and last enabled tabs with Home and End', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Sections" tabs={tabs} />);

    screen.getByRole('tab', { name: 'Alpha' }).focus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true');
  });
});
