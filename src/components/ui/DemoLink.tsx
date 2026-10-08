/**
 * Demo Link Component
 *
 * A wrapper component that automatically triggers the demo link modal
 * when a link matching demo patterns is clicked. For non-demo links,
 * it behaves like a normal anchor tag.
 *
 * @module components/ui
 */

import * as React from 'react';
import { useCallback, useState } from 'react';
import { DemoLinkModal } from './DemoLinkModal';
import { type DemoLinkCategory, isDemoLink } from '../../config/demoLinks';
import { featureFlags } from '../../config/site';
import { resolveHref } from '../../config/paths';

/**
 * Props for the DemoLink component
 */
export interface DemoLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The href URL for the link */
  href: string;
  /** Link content (text or elements) */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string | undefined;
  /** Link title attribute */
  title?: string | undefined;
  /** Whether to force demo mode regardless of feature flag */
  forceDemo?: boolean | undefined;
  /** Custom category override for the modal content (for future use) */
  _category?: DemoLinkCategory | undefined;
  /** Custom modal title override */
  modalTitle?: string | undefined;
  /** Custom modal message override */
  modalMessage?: string | undefined;
  /** Custom modal description override */
  modalDescription?: string | undefined;
  /** Callback when the modal is opened */
  onModalOpen?: ((url: string) => void) | undefined;
  /** Callback when the modal is closed */
  onModalClose?: (() => void) | undefined;
  /** Callback when URL is copied from modal */
  onModalCopy?: ((url: string) => void) | undefined;
  /** Whether to resolve the href using path configuration */
  resolvePath?: boolean | undefined;
}

/**
 * DemoLink Component
 */
export const DemoLink = React.forwardRef<HTMLAnchorElement, DemoLinkProps>(
  (
    {
      href,
      children,
      className = '',
      title,
      forceDemo = false,
      _category,
      modalTitle,
      modalMessage,
      modalDescription,
      onModalOpen,
      onModalClose,
      onModalCopy,
      onClick,
      resolvePath = true,
      ...anchorProps
    },
    ref,
  ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Resolve the href using path configuration
    const resolvedHref = React.useMemo(() => {
      if (!resolvePath) return href;
      return resolveHref(href);
    }, [href, resolvePath]);

    // Check if this link should trigger the demo modal
    const shouldTriggerDemo = forceDemo || (featureFlags.demoMode && isDemoLink(resolvedHref));

    // Handle click event
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>): void => {
        if (shouldTriggerDemo) {
          event.preventDefault();
          setIsModalOpen(true);
          onModalOpen?.(resolvedHref);
        }
        // Call the original onClick if provided
        onClick?.(event);
      },
      [shouldTriggerDemo, resolvedHref, onModalOpen, onClick],
    );

    // Handle modal close
    const handleClose = useCallback((): void => {
      setIsModalOpen(false);
      onModalClose?.();
    }, [onModalClose]);

    return (
      <>
        <a
          ref={ref}
          href={resolvedHref}
          onClick={handleClick}
          className={className}
          title={title}
          {...(shouldTriggerDemo
            ? {
                role: 'button',
                'aria-haspopup': 'dialog',
                'aria-expanded': isModalOpen,
              }
            : {})}
          {...anchorProps}
        >
          {children}
        </a>

        {/* Demo Link Modal */}
        {shouldTriggerDemo && (
          <DemoLinkModal
            isOpen={isModalOpen}
            onClose={handleClose}
            url={resolvedHref}
            category={_category}
            title={modalTitle}
            message={modalMessage}
            description={modalDescription}
            onModalCopy={onModalCopy}
          />
        )}
      </>
    );
  },
);

DemoLink.displayName = 'DemoLink';

/**
 * Props for the DemoLinkButton component
 */
export interface DemoLinkButtonProps extends Omit<DemoLinkProps, 'className' | 'variant' | 'size'> {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Full width button */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * DemoLinkButton Component
 */
export const DemoLinkButton = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...demoLinkProps
}: DemoLinkButtonProps): React.ReactElement => {
  // Base button styles
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2';

  // Variant styles
  const variantStyles = {
    primary:
      'bg-primary-700 text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-500',
    secondary:
      'bg-secondary-700 text-white hover:bg-secondary-800 dark:bg-secondary-600 dark:hover:bg-secondary-500',
    outline:
      'border-2 border-primary-700 text-primary-700 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-950/30',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Full width style
  const widthStyle = fullWidth ? 'w-full' : '';

  // Combine all styles
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

  return <DemoLink {...demoLinkProps} className={combinedClassName} />;
};

/**
 * Hook to check if a URL is a demo link
 */
export function useIsDemoLink(url: string): boolean {
  return featureFlags.demoMode && isDemoLink(url);
}

/**
 * Utility to conditionally render content based on demo link status
 */
export function renderDemoLinkContent(
  url: string,
  demoContent: React.ReactNode,
  normalContent: React.ReactNode,
): React.ReactNode {
  return useIsDemoLink(url) ? demoContent : normalContent;
}

export default DemoLink;
