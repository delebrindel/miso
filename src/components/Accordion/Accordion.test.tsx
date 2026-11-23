import { render, screen } from '@testing-library/react';
import { Accordion } from './Accordion';

const items = [
  { id: 'scope', title: 'What is included?', content: 'A written scope and timeline.' },
  { id: 'team', title: 'Who does the work?', content: 'The people who scoped it.', defaultOpen: true },
];

describe('Accordion', () => {
  it('renders every item title as a disclosure control', () => {
    render(<Accordion items={items} />);

    expect(screen.getByText('What is included?').closest('summary')).toBeInTheDocument();
    expect(screen.getByText('Who does the work?').closest('summary')).toBeInTheDocument();
  });

  it('hides closed item content and shows the default-open item', () => {
    render(<Accordion items={items} />);

    expect(screen.getByText('A written scope and timeline.')).not.toBeVisible();
    expect(screen.getByText('The people who scoped it.')).toBeVisible();
  });

  it('groups items with a shared name by default', () => {
    const { container } = render(<Accordion items={items} />);
    const names = [...container.querySelectorAll('details')].map((details) => details.getAttribute('name'));
    expect(names[0]).toBeTruthy();
    expect(new Set(names).size).toBe(1);
  });

  it('leaves items ungrouped when exclusive is false', () => {
    const { container } = render(<Accordion items={items} exclusive={false} />);
    expect(container.querySelectorAll('details[name]')).toHaveLength(0);
  });

  it('renders each item title as a heading at the requested level', () => {
    render(<Accordion items={[{ id: 'scope', title: 'What is included?', content: 'Details' }]} headingLevel={2} />);

    expect(screen.getByRole('heading', { level: 2, name: 'What is included?' })).toBeInTheDocument();
  });
});
