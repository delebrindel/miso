import { useId, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** When true (the default), opening one item closes the others. Pass false to allow several open. */
  exclusive?: boolean;
  /** Heading level for each item title. Pick the level that fits the page outline. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

// Native details/summary supplies the disclosure semantics and keyboard handling. A shared `name`
// on the details elements makes them exclusive, which browsers implement natively.
export function Accordion({ items, exclusive = true, headingLevel = 3, className = '' }: AccordionProps) {
  const groupName = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={`divide-y divide-border border-y border-border ${className}`.trim()}>
      {items.map((item) => (
        <details
          key={item.id}
          name={exclusive ? groupName : undefined}
          open={item.defaultOpen}
          className="group"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
            <Heading className="font-medium">{item.title}</Heading>
            <Icon name="chevron-down" className="h-5 w-5 text-muted transition-transform motion-reduce:transition-none group-open:rotate-180" />
          </summary>
          <div className="pb-4 text-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
