import React, { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { siteNavigation } from '../../config/site';
import { ROUTES, isActiveRoute, resolveHref } from '../../config/paths';
import { useReducedMotion } from '../../utils/reducedMotion';

/**
 * Props for the MobileNavigation component
 */
export interface MobileNavigationProps {
  /** Whether the mobile menu is open */
  isOpen: boolean;
  /** Callback when the menu should be closed */
  onClose: () => void;
  /** Whether to show the CTA button */
  showCta?: boolean;
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Callback when CTA is clicked */
  onCtaClick?: () => void;
  /** The current page path */
  currentPath?: string;
}

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors)).filter(
    (el): el is HTMLElement => {
      // Filter out hidden elements
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    },
  );
}

/**
 * Custom hook to trap focus within the mobile navigation when open
 */
function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isActive: boolean,
  onEscape: () => void,
): void {
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      // Restore focus when menu closes
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
      return;
    }

    // Store the currently focused element
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    // Focus the first focusable element in the container
    const container = containerRef.current;
    if (container) {
      const focusableElements = getFocusableElements(container);
      const firstElement = focusableElements[0];
      if (firstElement) {
        firstElement.focus();
      }
    }

    // Handle Tab key navigation
    const handleTabKey = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusableElements = getFocusableElements(containerRef.current);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // If Shift+Tab on first element, wrap to last
      if (event.shiftKey && firstElement && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
      // If Tab on last element, wrap to first
      else if (!event.shiftKey && lastElement && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    // Handle Escape key
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);

    return (): void => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActive, containerRef, onEscape]);
}

/**
 * MobileNavigation Component
 *
 * A full-featured mobile navigation drawer with:
 * - Focus trap when open (accessibility requirement)
 * - Smooth open/close animations using framer-motion
 * - Navigation links from site config with active state highlighting
 * - Theme toggle
 * - Primary CTA button
 * - Backdrop overlay with click-to-close
 * - Escape key handling
 * - Reduced motion support
 */
export function MobileNavigation({
  isOpen,
  onClose,
  showCta = true,
  ctaText = 'Get Started',
  ctaHref = ROUTES.SIGNUP,
  onCtaClick,
  currentPath = '',
}: MobileNavigationProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { prefersReducedMotion } = useReducedMotion();

  // Apply focus trap
  useFocusTrap(containerRef as React.RefObject<HTMLElement | null>, isOpen, onClose);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return (): void => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return undefined;
  }, [isOpen]);

  // Handle CTA click
  const handleCtaClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>): void => {
      onClose();
      if (onCtaClick) {
        e.preventDefault();
        onCtaClick();
      }
    },
    [onClose, onCtaClick],
  );

  // Handle navigation link click
  const handleNavClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-bg-primary/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Mobile navigation drawer */}
          <motion.div
            ref={containerRef}
            id="mobile-navigation"
            data-testid="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: 'spring', damping: 25, stiffness: 200 }
            }
            className="fixed top-0 right-0 bottom-0 w-full max-w-[min(24rem,calc(100vw-2rem))] bg-bg-primary border-l border-border-default shadow-2xl z-50 md:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 pt-[calc(1.25rem+env(safe-area-inset-top))] border-b border-border-default/50">
              <span className="text-xl font-bold text-text-primary tracking-tight">Menu</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation links */}
            <nav
              className="flex-1 overflow-y-auto py-6 px-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <ul className="space-y-2">
                {siteNavigation.main.map((item, index) => {
                  const active = isActiveRoute(item.href, currentPath);
                  return (
                    <motion.li
                      key={item.href}
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <a
                        href={resolveHref(item.href)}
                        onClick={handleNavClick}
                        className={`block px-5 py-4 text-lg font-semibold rounded-2xl transition-all ${
                          active
                            ? 'text-primary-600 bg-primary-500/10 dark:text-primary-400 dark:bg-primary-500/20'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                        } focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2`}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer with theme toggle and CTA */}
            <div className="border-t border-border-default/50 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] space-y-6 bg-bg-secondary/30">
              {/* Theme toggle */}
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                  Appearance
                </span>
                <ThemeToggle aria-label="Toggle theme" />
              </div>

              {/* CTA Button */}
              {showCta && (
                <a
                  href={resolveHref(ctaHref)}
                  onClick={handleCtaClick}
                  className="block w-full px-6 py-4 text-center text-lg font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-2xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                >
                  {ctaText}
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Props for the MobileMenuButton component
 */
export interface MobileMenuButtonProps {
  /** Whether the menu is currently open */
  isOpen: boolean;
  /** Callback when the button is clicked */
  onClick: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * MobileMenuButton Component
 *
 * The hamburger menu button that triggers the mobile navigation.
 * Changes icon between hamburger and close based on open state.
 */
export function MobileMenuButton({
  isOpen,
  onClick,
  className = '',
}: MobileMenuButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="mobile-menu-button"
      className={`p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 ${className}`}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {isOpen ? (
        <X className="w-6 h-6" aria-hidden="true" />
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
}

export default MobileNavigation;
