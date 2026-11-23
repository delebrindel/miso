import { Children, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';

export interface SliderProps {
  /** Accessible name for the carousel, e.g. "Featured projects". */
  label: string;
  /** Each child is one slide. */
  children: ReactNode;
  defaultIndex?: number;
  className?: string;
}

const controlClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-md border border-control text-fg ' +
  'transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

// Manual only: no autoplay, so nothing moves while someone is reading. Only the active slide
// is rendered visibly; the others use the hidden attribute, which also removes them from the
// accessibility tree. Navigation wraps at both ends.
export function Slider({ label, children, defaultIndex = 0, className = '' }: SliderProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [current, setCurrent] = useState(defaultIndex);

  if (count === 0) return null;

  const active = ((current % count) + count) % count;
  const go = (index: number) => setCurrent(((index % count) + count) % count);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(active - 1);
    }
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`flex flex-col gap-4 ${className}`.trim()}
    >
      <div className="rounded-lg border border-border bg-surface p-6">
        {slides.map((slide, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            hidden={index !== active}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        <button type="button" className={controlClass} aria-label="Previous slide" onClick={() => go(active - 1)}>
          <Icon name="arrow-left" />
        </button>
        <div role="group" aria-label="Choose slide" className="flex items-center">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => go(index)}
              className="h-6 w-6 rounded-full bg-clip-content bg-control p-[7px] transition-colors hover:bg-muted aria-[current=true]:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          ))}
        </div>
        <button type="button" className={controlClass} aria-label="Next slide" onClick={() => go(active + 1)}>
          <Icon name="arrow-right" />
        </button>
      </div>
    </section>
  );
}
