import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Spinner } from './Spinner';
import { useReducedMotion } from '@/utils/reducedMotion';
import { cn } from '@/utils/cn';

export interface PageLoaderProps {
  /** Whether the loader is visible */
  isVisible?: boolean;
  /** Optional message to display */
  message?: string;
  /** Whether to show a full-page overlay */
  fullPage?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A page-level loading indicator that can be used for initial loads
 * or significant data fetching operations.
 */
export const PageLoader: React.FC<PageLoaderProps> = ({
  isVisible = true,
  message,
  fullPage = true,
  className,
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'flex flex-col items-center justify-center bg-bg-primary/80 backdrop-blur-sm z-50',
            fullPage ? 'fixed inset-0 w-screen h-screen' : 'absolute inset-0 w-full h-full',
            className,
          )}
        >
          <motion.div
            initial={!prefersReducedMotion ? { scale: 0.8, opacity: 0 } : { opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-4"
          >
            <Spinner size="xl" />
            {message && <p className="text-text-secondary font-medium animate-pulse">{message}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
