export interface SkeletonProps {
  /** Sizes and shapes the block, for example `h-4 w-3/4` or `h-12 w-12 rounded-full`. */
  className?: string;
}

// Decorative placeholder, hidden from assistive technology. Mark the loading container with aria-busy instead.
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-surface-alt motion-reduce:animate-none ${className}`.trim()}
    />
  );
}
