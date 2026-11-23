import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('names the article by its title and lists the tags', () => {
    render(<Card title="Migration" tags={['Node.js', 'AWS']} />);

    expect(screen.getByRole('article', { name: 'Migration' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Tags' })).toHaveTextContent('Node.jsAWS');
  });

  it('makes the title the link target when href is given', () => {
    render(<Card title="Migration" href="/case-study" />);

    expect(screen.getByRole('link', { name: 'Migration' })).toHaveAttribute('href', '/case-study');
  });

  it('renders no link when href is omitted', () => {
    render(<Card title="Migration" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
