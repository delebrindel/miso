export interface SpinnerProps {
  /** Shown under the spinner and announced to screen readers. */
  label?: string;
  className?: string;
}

// The status region announces the label. The ring is CSS (.miso-spinner in theme.css) and stops
// spinning under prefers-reduced-motion; the visible label still conveys the state.
export function Spinner({ label = 'Loading', className = '' }: SpinnerProps) {
  return (
    <span
      role="status"
      className={`inline-flex flex-col items-center gap-2 text-sm text-muted ${className}`.trim()}
    >
      <span aria-hidden="true" className="miso-spinner text-accent" />
      {label}
    </span>
  );
}
