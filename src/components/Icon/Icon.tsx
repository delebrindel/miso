export type IconName = 'close' | 'chevron-down' | 'check' | 'arrow-left' | 'arrow-right';

// Stroke glyphs on a 24-unit grid, drawn in currentColor so they take their parent's text color.
// Internal to the library: decorative only, so the owning control carries the accessible name.
const paths: Record<IconName, string> = {
  close: 'M6 6 18 18M18 6 6 18',
  'chevron-down': 'M6 9l6 6 6-6',
  check: 'M5 12.5l5 5L19 7.5',
  'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
};

export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d={paths[name]} />
    </svg>
  );
}
