import type { ReactNode } from 'react';
import { useId } from 'react';

export interface HeroProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  /** Body copy, rendered as stacked blocks under the subtitle. */
  children?: ReactNode;
  actions?: ReactNode;
  /** Optional image or illustration. Shown beside the text from the lg breakpoint up. */
  media?: ReactNode;
  /** 'start' puts the media before the text in DOM and reading order, so it also comes first on small screens. */
  mediaPosition?: 'start' | 'end';
  className?: string;
}

// The section is labelled by its heading, so it is exposed as a named region landmark.
export function Hero({ title, eyebrow, subtitle, children, actions, media, mediaPosition = 'end', className = '' }: HeroProps) {
  const titleId = useId();
  const mediaBlock = media && <div className="min-w-0">{media}</div>;

  return (
    <section
      aria-labelledby={titleId}
      className={`grid items-center gap-10 py-12 ${media ? 'lg:grid-cols-2' : ''} ${className}`.trim()}
    >
      {mediaPosition === 'start' && mediaBlock}
      <div className="flex flex-col gap-5">
        {eyebrow && <p className="font-mono text-xs font-bold tracking-wider text-accent uppercase">{eyebrow}</p>}
        <h1 id={titleId} className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="font-mono text-lg text-accent">{subtitle}</p>}
        {children && <div className="flex flex-col gap-3 text-muted">{children}</div>}
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
      {mediaPosition === 'end' && mediaBlock}
    </section>
  );
}
