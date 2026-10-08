import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../utils/reducedMotion';
import { PRESETS } from '../../config/animation';

/**
 * Textarea Props Interface
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Optional label for the textarea */
  label?: string | undefined;
  /** Optional helper text displayed below the textarea */
  helperText?: string | undefined;
  /** Error message to display (sets error state) */
  error?: string | undefined;
  /** Whether the textarea should take up the full width of its container */
  fullWidth?: boolean | undefined;
  /** Whether to show a character count */
  showCharacterCount?: boolean | undefined;
  /** Maximum number of characters allowed */
  maxLength?: number | undefined;
  /** Additional CSS classes for the container */
  containerClassName?: string | undefined;
  /** Whether to use a floating label animation */
  floatingLabel?: boolean | undefined;
}

/**
 * Textarea Component
 *
 * A versatile, accessible multi-line input component with support for labels,
 * helper text, error states, character counts, and full light/dark mode support.
 * Enhanced with modern animations including floating labels and error feedback.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      fullWidth = false,
      showCharacterCount = false,
      maxLength,
      id,
      containerClassName = '',
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      floatingLabel = false,
      ...props
    },
    ref,
  ) => {
    const { prefersReducedMotion } = useReducedMotion();
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    const [isFocused, setIsFocused] = React.useState(false);
    const [charCount, setCharCount] = React.useState(String(value || defaultValue || '').length);
    const [hasValue, setHasValue] = React.useState(charCount > 0);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setCharCount(val.length);
      setHasValue(val.length > 0);
      if (onChange) {
        onChange(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      if (onBlur) onBlur(e);
    };

    // Update character count when value changes (for controlled component)
    React.useEffect(() => {
      if (value !== undefined) {
        const val = String(value);
        setCharCount(val.length);
        setHasValue(val.length > 0);
      }
    }, [value]);

    const isFloating = floatingLabel && label;
    const shouldFloat = isFloating && (isFocused || hasValue);

    // Motion variants for the floating label
    const labelVariants = {
      idle: {
        top: '1.25rem',
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
    const MotionTextarea = motion.textarea as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionLabel = motion.label as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionDiv = motion.div as any;

    return (
      <div
        className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : 'w-auto', containerClassName)}
      >
        <div className="flex items-center justify-between">
          {!isFloating && label && (
            <label
              htmlFor={textareaId}
              className="text-sm font-medium text-text-primary select-none"
            >
              {label}
            </label>
          )}
          {showCharacterCount && maxLength && (
            <span
              className={cn(
                'text-xs text-text-muted select-none ml-auto',
                charCount > maxLength ? 'text-error-600 dark:text-error-400' : '',
              )}
            >
              {charCount} / {maxLength}
            </span>
          )}
        </div>
        <MotionDiv
          className="relative"
          animate={error && !prefersReducedMotion && PRESETS.shake ? PRESETS.shake.animate : {}}
          transition={
            error && !prefersReducedMotion && PRESETS.shake ? PRESETS.shake.transition : {}
          }
        >
          <MotionTextarea
            ref={ref}
            id={textareaId}
            maxLength={maxLength}
            onChange={handleTextareaChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              'flex min-h-[80px] w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-base ring-offset-bg-primary transition-all duration-200 placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border-default dark:bg-bg-primary dark:focus-visible:ring-primary-400',
              isFloating && 'placeholder:opacity-0 focus:placeholder:opacity-100',
              error
                ? 'border-error-500 focus-visible:ring-error-500 dark:border-error-400 dark:focus-visible:ring-error-400'
                : 'hover:border-border-primary',
              className,
            )}
            aria-describedby={cn(helperText && !error && helperId, error && errorId)}
            aria-invalid={!!error}
            whileFocus={!prefersReducedMotion ? { scale: 1.002 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            {...props}
          />

          {isFloating && (
            <MotionLabel
              htmlFor={textareaId}
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

Textarea.displayName = 'Textarea';

export default Textarea;
export { Textarea };
