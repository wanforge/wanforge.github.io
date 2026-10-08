'use client';

import * as React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/utils/reducedMotion';

/**
 * Toast Variants
 */
export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

/**
 * Toast Props
 */
export interface ToastProps {
  /** Unique identifier for the toast */
  id: string;
  /** Optional title for the toast */
  title?: string;
  /** Message to display in the toast */
  message: string;
  /** Variant of the toast */
  variant?: ToastVariant;
  /** Duration in milliseconds before auto-dismissing (0 to disable) */
  duration?: number;
  /** Callback fired when the toast is closed */
  onClose: (id: string) => void;
}

const variantStyles: Record<ToastVariant, string> = {
  success:
    'bg-success-50 text-success-900 border-success-200 dark:bg-success-950/30 dark:text-success-400 dark:border-success-800',
  error:
    'bg-error-50 text-error-900 border-error-200 dark:bg-error-950/30 dark:text-error-400 dark:border-error-800',
  info: 'bg-info-50 text-info-900 border-info-200 dark:bg-info-950/30 dark:text-info-400 dark:border-info-800',
  warning:
    'bg-warning-50 text-warning-900 border-warning-200 dark:bg-warning-950/30 dark:text-warning-400 dark:border-warning-800',
};

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const iconStyles: Record<ToastVariant, string> = {
  success: 'text-success-600 dark:text-success-400',
  error: 'text-error-600 dark:text-error-400',
  info: 'text-info-600 dark:text-info-400',
  warning: 'text-warning-600 dark:text-warning-400',
};

/**
 * Toast Component
 *
 * A single notification message with support for different variants,
 * auto-dismissal, and entrance/exit animations.
 */
export const Toast = ({
  id,
  title,
  message,
  variant = 'info',
  duration = 5000,
  onClose,
}: ToastProps) => {
  const { prefersReducedMotion } = useReducedMotion();

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [id, duration, onClose]);

  const Icon = iconMap[variant];

  return (
    <motion.div
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
      }
      className={cn(
        'pointer-events-auto flex w-full max-w-md items-start gap-4 rounded-xl border p-4 shadow-lg backdrop-blur-sm',
        variantStyles[variant],
      )}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <div className={cn('mt-0.5 shrink-0', iconStyles[variant])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 space-y-1">
        {title && <h4 className="text-sm font-semibold leading-none">{title}</h4>}
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 rounded-lg p-1 opacity-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

// --- Toast Manager Logic ---

/**
 * Options for triggering a toast
 */
export type ToastOptions = Omit<ToastProps, 'id' | 'onClose'>;

type Observer = (toasts: ToastProps[]) => void;
let observers: Observer[] = [];
let toastItems: ToastProps[] = [];
let toastCounter = 0;

const notify = () => {
  observers.forEach((observer) => observer([...toastItems]));
};

/**
 * Trigger a toast notification
 *
 * @example
 * ```tsx
 * toast({ message: "Hello world" });
 * toast.success("Settings saved");
 * ```
 */
export const toast = (options: ToastOptions | string) => {
  const id = `toast-${toastCounter++}`;
  const normalizedOptions = typeof options === 'string' ? { message: options } : options;

  const newToast: ToastProps = {
    id,
    variant: 'info',
    duration: 5000,
    ...normalizedOptions,
    onClose: (toastId) => {
      toastItems = toastItems.filter((t) => t.id !== toastId);
      notify();
    },
  };

  toastItems.push(newToast);
  notify();
  return id;
};

toast.success = (message: string, options?: Omit<ToastOptions, 'message' | 'variant'>) =>
  toast({ ...options, message, variant: 'success' });

toast.error = (message: string, options?: Omit<ToastOptions, 'message' | 'variant'>) =>
  toast({ ...options, message, variant: 'error' });

toast.info = (message: string, options?: Omit<ToastOptions, 'message' | 'variant'>) =>
  toast({ ...options, message, variant: 'info' });

toast.warning = (message: string, options?: Omit<ToastOptions, 'message' | 'variant'>) =>
  toast({ ...options, message, variant: 'warning' });

toast.dismiss = (id: string) => {
  toastItems = toastItems.filter((t) => t.id !== id);
  notify();
};

/**
 * Reset all toasts (useful for testing)
 * @private
 */
toast._reset = () => {
  toastItems = [];
  toastCounter = 0;
  notify();
};

/**
 * Toaster Component
 *
 * Place this once at the root of your application (usually in RootLayout)
 * to render toasts triggered via the toast() function.
 */
export const Toaster = () => {
  const [currentToasts, setCurrentToasts] = React.useState<ToastProps[]>([]);

  React.useEffect(() => {
    const handleUpdate = (updatedToasts: ToastProps[]) => {
      setCurrentToasts(updatedToasts);
    };
    // Sync with initial state
    handleUpdate(toastItems);
    observers.push(handleUpdate);
    return () => {
      observers = observers.filter((o) => o !== handleUpdate);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex w-full max-w-md flex-col gap-3 p-4 pt-[calc(1rem+env(safe-area-inset-top))] sm:top-auto sm:bottom-0 sm:left-auto sm:right-0 sm:translate-x-0 sm:pt-4 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {currentToasts.map((t) => (
          <Toast key={t.id} {...t} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default toast;
