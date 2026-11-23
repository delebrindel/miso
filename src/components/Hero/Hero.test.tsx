import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('is a named region whose name comes from the single h1', () => {
    render(<Hero title="Senior engineering" eyebrow="Consultancy" />);

    expect(screen.getByRole('region', { name: 'Senior engineering' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Senior engineering');
    expect(screen.getByText('Consultancy')).toBeInTheDocument();
  });

  it('renders action controls inside the hero', () => {
    render(<Hero title="Hello" actions={<a href="/contact">Contact</a>} />);

    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });
});
