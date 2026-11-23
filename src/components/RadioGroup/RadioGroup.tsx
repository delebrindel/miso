import { useId, useState } from 'react';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  legend: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  hint?: string;
  error?: string;
  className?: string;
}

// The fieldset and legend name the group for screen readers. All options share one name,
// so arrow keys move between them natively. Pass `value` for controlled use; otherwise state is internal.
export function RadioGroup({
  legend,
  options,
  value,
  defaultValue,
  onValueChange,
  hint,
  error,
  className = '',
}: RadioGroupProps) {
  const groupId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = value ?? internalValue;
  const hintId = `${groupId}-hint`;
  const errorId = `${groupId}-error`;
  const describedBy = [error ? errorId : null, hint && !error ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset aria-describedby={describedBy} className={`flex flex-col gap-2 ${className}`.trim()}>
      <legend className="mb-2 text-sm font-medium text-fg">{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className="flex cursor-pointer items-center gap-3 text-base text-fg">
          <input
            type="radio"
            name={groupId}
            value={option.value}
            checked={selected === option.value}
            disabled={option.disabled}
            aria-invalid={error ? true : undefined}
            onChange={() => {
              if (value === undefined) setInternalValue(option.value);
              onValueChange?.(option.value);
            }}
            className="h-4 w-4 shrink-0 accent-accent disabled:cursor-not-allowed disabled:opacity-50"
          />
          {option.label}
        </label>
      ))}
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
    </fieldset>
  );
}
