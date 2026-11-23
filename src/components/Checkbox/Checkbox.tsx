import { useId, type InputHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  hint?: string;
  error?: string;
}

// Same structure as Switch: a visually hidden native checkbox drives the visible box through peer variants,
// so the state stays in the DOM. The box flips on check; motion-reduce removes the flip.
export function Checkbox({ label, hint, error, id, className = '', ...rest }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = [error ? errorId : null, hint && !error ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`flex flex-col gap-1 ${className}`.trim()}>
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center justify-between gap-4 text-base text-fg has-disabled:cursor-not-allowed has-disabled:opacity-50"
      >
        <span>{label}</span>
        <span className="relative h-5 w-5 shrink-0">
          <input
            id={inputId}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="peer sr-only"
            {...rest}
          />
          <span className="absolute inset-0 rounded-md transition-transform duration-300 [transform-style:preserve-3d] peer-checked:rotate-y-180 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent motion-reduce:transition-none">
            <span
              aria-hidden="true"
              className={`absolute inset-0 rounded-md border-2 bg-surface [backface-visibility:hidden] ${error ? 'border-danger' : 'border-control'}`}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center rounded-md bg-accent text-surface [backface-visibility:hidden] rotate-y-180"
            >
              <Icon name="check" className="h-4 w-4" />
            </span>
          </span>
        </span>
      </label>
      {hint && !error && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
