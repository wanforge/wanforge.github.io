import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../utils/reducedMotion';
import { PRESETS } from '../../config/animation';

/**
 * Input Props Interface
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label for the input */
  label?: string | undefined;
  /** Optional helper text displayed below the input */
  helperText?: string | undefined;
  /** Error message to display (sets error state) */
  error?: string | undefined;
  /** Whether the input should take up the full width of its container */
  fullWidth?: boolean | undefined;
  /** Additional CSS classes for the container */
  containerClassName?: string | undefined;
  /** Icon to display on the left side of the input */
  leftIcon?: React.ReactNode | undefined;
  /** Icon to display on the right side of the input */
  rightIcon?: React.ReactNode | undefined;
  /** Whether to use a floating label animation */
  floatingLabel?: boolean | undefined;
}

/**
 * Input Component
 *
 * A versatile, accessible input component with support for labels,
 * helper text, error states, and full light/dark mode support.
 * Enhanced with modern animations including floating labels and error feedback.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      helperText,
      error,
      fullWidth = false,
      id,
      containerClassName = '',
      leftIcon,
      rightIcon,
      floatingLabel = false,
      onFocus,
      onBlur,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const { prefersReducedMotion } = useReducedMotion();
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      !!(
        value ||
        defaultValue ||
        (ref && (ref as React.RefObject<HTMLInputElement>).current?.value)
      ),
    );

    // Sync hasValue when value prop changes (controlled)
    React.useEffect(() => {
      if (value !== undefined) {
        setHasValue(!!value);
      }
    }, [value]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (onChange) onChange(e);
    };

    const isFloating = floatingLabel && label;
    const shouldFloat =
      isFloating &&
      (isFocused ||
        hasValue ||
        type === 'date' ||
        type === 'datetime-local' ||
        type === 'time' ||
        type === 'month' ||
        type === 'week');

    // Motion variants for the floating label
    const labelVariants = {
      idle: {
        top: '50%',
        left: leftIcon ? '2.5rem' : '0.75rem',
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
    const MotionInput = motion.input as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionLabel = motion.label as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionDiv = motion.div as any;

    return (
      <div
        className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : 'w-auto', containerClassName)}
      >
        {!isFloating && label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-primary select-none">
            {label}
          </label>
        )}
        <MotionDiv
          className="relative flex items-center"
          animate={error && !prefersReducedMotion && PRESETS.shake ? PRESETS.shake.animate : {}}
          transition={
            error && !prefersReducedMotion && PRESETS.shake ? PRESETS.shake.transition : {}
          }
        >
          {leftIcon && (
            <div className="absolute left-3 flex items-center justify-center text-text-muted z-20 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <MotionInput
            ref={ref}
            type={type}
            id={inputId}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              'flex h-10 w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-base ring-offset-bg-primary transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border-default dark:bg-bg-primary dark:focus-visible:ring-primary-400',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              isFloating && 'placeholder:opacity-0 focus:placeholder:opacity-100',
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
          />

          {isFloating && (
            <MotionLabel
              htmlFor={inputId}
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

          {rightIcon && (
            <div className="absolute right-3 flex items-center justify-center text-text-muted z-20">
              {rightIcon}
            </div>
          )}
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

Input.displayName = 'Input';

export default Input;
export { Input };
