import type { ReactNode } from 'react';
import { useId } from 'react';

export interface CardProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  tags?: string[];
  /** Makes the whole card clickable through the title link. */
  href?: string;
  /** Controls placed at the bottom. They sit above the stretched link, so they stay clickable. */
  footer?: ReactNode;
  className?: string;
}

// When href is set, the title link is stretched over the whole card (via ::after), so the
// card is one click target without nesting interactive elements. Footer controls are
// raised with z-10 so they still receive clicks.
export function Card({ title, eyebrow, description, tags, href, footer, className = '' }: CardProps) {
  const titleId = useId();

  return (
    <article
      aria-labelledby={titleId}
      className={`relative flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent ${className}`.trim()}
    >
      {eyebrow && <p className="font-mono text-xs font-bold tracking-wider text-accent uppercase">{eyebrow}</p>}
      <h3 id={titleId} className="text-lg font-semibold text-fg">
        {href ? (
          <a
            href={href}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      {description && <div className="text-sm text-muted">{description}</div>}
      {tags && tags.length > 0 && (
        <ul aria-label="Tags" className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag} className="rounded bg-surface-alt px-2 py-0.5 font-mono text-xs text-muted">
              {tag}
            </li>
          ))}
        </ul>
      )}
      {footer && <div className="relative z-10 mt-auto pt-2">{footer}</div>}
    </article>
  );
}
