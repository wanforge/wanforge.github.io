import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../utils/reducedMotion';
import { PRESETS } from '../../config/animation';

/**
 * Select Option Interface
 */
export interface SelectOption {
  /** Label to display */
  label: string;
  /** Value of the option */
  value: string | number;
  /** Whether the option is disabled */
  disabled?: boolean;
}

/**
 * Select Props Interface
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Optional label for the select */
  label?: string | undefined;
  /** Optional helper text displayed below the select */
  helperText?: string | undefined;
  /** Error message to display (sets error state) */
  error?: string | undefined;
  /** Whether the select should take up the full width of its container */
  fullWidth?: boolean | undefined;
  /** Options for the select */
  options?: SelectOption[] | undefined;
  /** Additional CSS classes for the container */
  containerClassName?: string | undefined;
  /** Whether to use a floating label animation */
  floatingLabel?: boolean | undefined;
}

/**
 * Select Component
 *
 * A versatile, accessible select component with support for labels,
 * helper text, error states, and full light/dark mode support.
 * Enhanced with modern animations including floating labels and error feedback.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      fullWidth = false,
      options = [],
      id,
      containerClassName = '',
      children,
      onFocus,
      onBlur,
      onChange,
      value,
      defaultValue,
      floatingLabel = false,
      ...props
    },
    ref,
  ) => {
    const { prefersReducedMotion } = useReducedMotion();
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const helperId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;

    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      !!(
        value ||
        defaultValue ||
        (ref && (ref as React.RefObject<HTMLSelectElement>).current?.value)
      ),
    );

    // Sync hasValue when value prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setHasValue(!!value);
      }
    }, [value]);

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      if (onBlur) onBlur(e);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setHasValue(!!e.target.value);
      if (onChange) onChange(e);
    };

    const isFloating = floatingLabel && label;
    // Check if there's a placeholder option (first option with empty value)
    const hasPlaceholder =
      options.length > 0 && (options[0]?.value === '' || options[0]?.value === undefined);
    // Float label when focused, has value, or has placeholder (to avoid overlap with placeholder text)
    const shouldFloat = isFloating && (isFocused || hasValue || hasPlaceholder);

    // Motion variants for the floating label
    const labelVariants = {
      idle: {
        top: '50%',
        left: '0.75rem',
        scale: 1,
        y: '-50%',
        color: 'var(--color-text-muted)',
      },
      floating: {
        top: '0',
        left: '0.5rem',
        scale: 0.85,
        y: '-50%',
        color: error ? 'var(--color-error-500)' : 'var(--color-primary-500)',
        backgroundColor: 'var(--color-bg-primary)',
        padding: '0 0.25rem',
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionSelect = motion.select as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionLabel = motion.label as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionDiv = motion.div as any;

    return (
      <div
        className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : 'w-auto', containerClassName)}
      >
        {!isFloating && label && (
          <label htmlFor={selectId} className="text-sm font-medium text-text-primary select-none">
            {label}
          </label>
        )}
        <MotionDiv
          className="relative group"
          animate={error && !prefersReducedMotion && PRESETS.shake ? PRESETS.shake.animate : {}}
          transition={
            error && !prefersReducedMotion && PRESETS.shake ? PRESETS.shake.transition : {}
          }
        >
          <MotionSelect
            ref={ref}
            id={selectId}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleSelectChange}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              'flex h-10 w-full appearance-none rounded-lg border border-border-default bg-bg-primary px-3 py-2 pr-10 text-base ring-offset-bg-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border-default dark:bg-bg-primary dark:focus-visible:ring-primary-400',
              error
                ? 'border-error-500 focus-visible:ring-error-500 dark:border-error-400 dark:focus-visible:ring-error-400'
                : 'hover:border-border-primary',
              className,
            )}
            aria-describedby={cn(helperText && !error && helperId, error && errorId)}
            aria-invalid={!!error}
            whileFocus={!prefersReducedMotion ? { scale: 1.005 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            {...props}
          >
            {options.length > 0
              ? options.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))
              : children}
          </MotionSelect>

          {isFloating && (
            <MotionLabel
              htmlFor={selectId}
              className="absolute pointer-events-none select-none z-10 origin-left"
              initial={shouldFloat ? 'floating' : 'idle'}
              animate={shouldFloat ? 'floating' : 'idle'}
              variants={labelVariants}
              transition={
                !prefersReducedMotion ? { duration: 0.2, ease: 'easeOut' } : { duration: 0.01 }
              }
            >
              {label}
            </MotionLabel>
          )}

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted group-hover:text-text-primary transition-colors duration-200">
            <ChevronDown className="h-4 w-4" />
          </div>
        </MotionDiv>
        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key="error"
              id={errorId}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-medium text-error-600 dark:text-error-400"
              role="alert"
              data-testid="input-error"
            >
              {error}
            </motion.p>
          ) : helperText ? (
            <motion.p
              key="helper"
              id={helperId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-text-muted"
            >
              {helperText}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
export { Select };
