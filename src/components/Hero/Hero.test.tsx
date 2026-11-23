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

  it('places media after the text by default', () => {
    render(<Hero title="Hello" media={<img alt="Diagram" />} />);

    expect(screen.getByRole('region', { name: 'Hello' }).lastElementChild).toContainElement(
      screen.getByRole('img', { name: 'Diagram' }),
    );
  });

  it('places media before the text when mediaPosition is start', () => {
    render(<Hero title="Hello" media={<img alt="Diagram" />} mediaPosition="start" />);

    expect(screen.getByRole('region', { name: 'Hello' }).firstElementChild).toContainElement(
      screen.getByRole('img', { name: 'Diagram' }),
    );
  });
});
