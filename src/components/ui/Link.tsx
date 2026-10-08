/**
 * Link Component
 *
 * A versatile link component that integrates with centralized path configuration
 * and demo link modal system. Supports both internal and external links with
 * consistent styling and accessibility features.
 *
 * @module components/ui
 */

import * as React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { isExternalUrl, resolveHref } from '../../config/paths';
import { DemoLink } from './DemoLink';

/**
 * Link Variants
 *
 * - default: Standard text link with underline on hover
 * - subtle: Less prominent link without underline by default
 * - underline: Always underlined link
 * - button: Styled as a button for prominent CTAs
 */
export type LinkVariant = 'default' | 'subtle' | 'underline' | 'button';

/**
 * Link Sizes
 *
 * - sm: Small text size for compact layouts
 * - md: Default text size
 * - lg: Larger text size for prominent links
 */
export type LinkSize = 'sm' | 'md' | 'lg';

/**
 * Link Props Interface
 */
export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** The href URL or route path */
  href: string;
  /** Visual style variant */
  variant?: LinkVariant;
  /** Size of the link */
  size?: LinkSize;
  /** Whether to show external link icon */
  showExternalIcon?: boolean;
  /** Whether to open external links in new tab */
  openExternalInNewTab?: boolean;
  /** Whether to use demo link modal for demo URLs */
  useDemoModal?: boolean;
  /** Whether to force demo mode regardless of feature flag */
  forceDemo?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
  /** Whether to resolve the href using path configuration */
  resolvePath?: boolean;
  /** Custom underline offset */
  underlineOffset?: number;
  /** Custom modal title override */
  modalTitle?: string;
  /** Custom modal message override */
  modalMessage?: string;
  /** Custom modal description override */
  modalDescription?: string;
  /** Callback when the modal is opened */
  onModalOpen?: (url: string) => void;
  /** Callback when the modal is closed */
  onModalClose?: () => void;
  /** Callback when URL is copied from modal */
  onModalCopy?: (url: string) => void;
}

/**
 * Link Component
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      variant = 'default',
      size = 'md',
      showExternalIcon = true,
      openExternalInNewTab = true,
      useDemoModal = true,
      forceDemo = false,
      className = '',
      children,
      resolvePath = true,
      underlineOffset = 2,
      rel,
      target,
      onClick,
      modalTitle,
      modalMessage,
      modalDescription,
      onModalOpen,
      onModalClose,
      onModalCopy,
      ...props
    },
    ref,
  ) => {
    // Resolve the href using path configuration
    const resolvedHref = React.useMemo(() => {
      if (!resolvePath) return href;
      if (isExternalUrl(href)) return href;
      return resolveHref(href);
    }, [href, resolvePath]);

    // Check if this is an external link
    const isExternal = isExternalUrl(resolvedHref);

    // Determine if we should use the DemoLink wrapper
    const shouldUseDemoLink = useDemoModal;

    // Build the CSS class string
    const classes = React.useMemo(() => {
      const baseClasses = [
        'inline-flex items-center gap-1 transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
      ];

      // Variant styles
      switch (variant) {
        case 'default':
          baseClasses.push(
            'text-primary-600 dark:text-primary-400',
            'hover:text-primary-700 dark:hover:text-primary-300',
            `underline underline-offset-${underlineOffset}`,
            'decoration-primary-400 dark:decoration-primary-600',
            'hover:decoration-primary-600 dark:hover:decoration-primary-400',
          );
          break;
        case 'subtle':
          baseClasses.push(
            'text-text-secondary hover:text-text-primary',
            'hover:underline hover:underline-offset-2',
          );
          break;
        case 'underline':
          baseClasses.push(
            'text-primary-600 dark:text-primary-400',
            'hover:text-primary-700 dark:hover:text-primary-300',
            'underline underline-offset-4',
            'decoration-primary-500 dark:decoration-primary-500',
          );
          break;
        case 'button':
          baseClasses.push(
            'inline-flex items-center justify-center',
            'px-4 py-2 rounded-lg',
            'bg-primary-700 text-white',
            'hover:bg-primary-800',
            'dark:bg-primary-600 dark:text-white dark:hover:bg-primary-500',
            'font-medium',
            'shadow-sm hover:shadow',
            'active:scale-[0.98]',
            'transition-all duration-200',
          );
          break;
      }

      // Size styles (only for non-button variants)
      if (variant !== 'button') {
        switch (size) {
          case 'sm':
            baseClasses.push('text-sm');
            break;
          case 'md':
            baseClasses.push('text-base');
            break;
          case 'lg':
            baseClasses.push('text-lg font-medium');
            break;
        }
      }

      // Add custom classes
      if (className) {
        baseClasses.push(className);
      }

      return baseClasses.join(' ');
    }, [variant, size, className, underlineOffset]);

    // Handle external link props
    const externalProps = isExternal
      ? {
          target: target ?? (openExternalInNewTab ? '_blank' : undefined),
          rel: rel ?? (openExternalInNewTab ? 'noopener noreferrer' : undefined),
        }
      : {};

    // Render the link content
    const linkContent = (
      <>
        {children}
        {isExternal && showExternalIcon && (
          <ExternalLink className="w-4 h-4 opacity-70" aria-hidden="true" />
        )}
      </>
    );

    // Render with DemoLink wrapper if applicable
    if (shouldUseDemoLink) {
      return (
        <DemoLink
          ref={ref}
          href={resolvedHref}
          className={classes}
          forceDemo={forceDemo}
          onClick={onClick}
          modalTitle={modalTitle}
          modalMessage={modalMessage}
          modalDescription={modalDescription}
          onModalOpen={onModalOpen}
          onModalClose={onModalClose}
          onModalCopy={onModalCopy}
          resolvePath={false}
          {...externalProps}
          {...props}
        >
          {linkContent}
        </DemoLink>
      );
    }

    // Render standard anchor element
    return (
      <a
        ref={ref}
        href={resolvedHref}
        className={classes}
        onClick={onClick}
        {...externalProps}
        {...props}
      >
        {linkContent}
      </a>
    );
  },
);

Link.displayName = 'Link';

/**
 * ExternalLink Component
 *
 * A convenience component for external links with automatic external icon.
 * Always opens in a new tab by default.
 */
export interface ExternalLinkProps extends Omit<LinkProps, 'showExternalIcon'> {
  /** The external URL */
  href: string;
}

export const ExternalLinkComponent = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <Link ref={ref} showExternalIcon openExternalInNewTab {...props}>
        {children}
      </Link>
    );
  },
);

ExternalLinkComponent.displayName = 'ExternalLink';

/**
 * NavLink Component
 *
 * A link component specifically for navigation with active state support.
 */
export interface NavLinkProps extends LinkProps {
  /** Whether this link represents the current page */
  isActive?: boolean;
  /** Whether to show an active indicator */
  showActiveIndicator?: boolean;
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ isActive = false, showActiveIndicator = true, className = '', children, ...props }, ref) => {
    const activeClasses = isActive
      ? 'text-primary-600 dark:text-primary-400 font-medium'
      : 'text-text-secondary hover:text-text-primary';

    const indicatorClasses =
      isActive && showActiveIndicator
        ? 'relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-500 after:rounded-full'
        : '';

    return (
      <Link
        ref={ref}
        variant="subtle"
        className={`${activeClasses} ${indicatorClasses} ${className}`}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = 'NavLink';

/**
 * ArrowLink Component
 *
 * A link with an animated arrow that moves on hover.
 */
export type ArrowLinkProps = Omit<LinkProps, 'showExternalIcon'>;

export const ArrowLink = React.forwardRef<HTMLAnchorElement, ArrowLinkProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <Link
        ref={ref}
        variant="default"
        className={`group inline-flex items-center gap-1 ${className}`}
        {...props}
      >
        {children}
        <ArrowUpRight
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>
    );
  },
);

ArrowLink.displayName = 'ArrowLink';

/**
 * SkipLink Component
 *
 * A skip link for accessibility that allows keyboard users to
 * skip to the main content. Hidden by default, visible on focus.
 */
export interface SkipLinkProps extends Omit<LinkProps, 'href'> {
  /** The ID of the element to skip to */
  targetId: string;
}

export const SkipLink = React.forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ targetId, className = '', ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={`#${targetId}`}
        className={`
          sr-only focus:not-sr-only
          fixed top-4 left-4 z-50
          px-4 py-2
          bg-bg-primary text-text-primary
          border border-border-default
          rounded-lg shadow-lg
          focus:outline-none focus:ring-2 focus:ring-primary-500
          ${className}
        `}
        {...props}
      />
    );
  },
);

SkipLink.displayName = 'SkipLink';

export default Link;
