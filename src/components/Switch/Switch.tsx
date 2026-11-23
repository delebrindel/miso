import { useId, type InputHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  hint?: string;
}

// A native checkbox with role="switch" keeps the on/off state in the DOM and announces as a switch.
// The visible track and thumb are siblings after the input, so Tailwind peer variants can style them.
export function Switch({ label, hint, id, className = '', ...rest }: SwitchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;

  return (
    <div className={`flex flex-col gap-1 ${className}`.trim()}>
      <label htmlFor={inputId} className="flex cursor-pointer items-center justify-between gap-4 text-base text-fg">
        <span>{label}</span>
        <span className="relative h-6 w-11 shrink-0">
          <input
            id={inputId}
            type="checkbox"
            role="switch"
            aria-describedby={hint ? hintId : undefined}
            className="peer sr-only"
            {...rest}
          />
          <span
            aria-hidden="true"
            className="block h-full w-full rounded-full bg-control transition-colors peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-disabled:opacity-50"
          />
          <span
            aria-hidden="true"
            className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-surface shadow transition-transform motion-reduce:transition-none peer-checked:translate-x-5 peer-disabled:opacity-50"
          />
        </span>
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
