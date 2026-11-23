import { useId, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

// The label is always rendered and wired with htmlFor, so the field is never unlabeled.
export function Input({ label, hint, error, id, className = '', ...rest }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`flex flex-col gap-1 ${className}`.trim()}>
      <label htmlFor={inputId} className="text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`h-10 border-b px-0 text-base text-fg placeholder:text-muted focus:border-b-2 focus:outline-none disabled:opacity-50 ${
          error ? 'border-red-600' : 'border-border focus:border-accent'
        }`}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
