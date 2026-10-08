/**
 * Demo Link Modal Component
 *
 * A modal component that displays when users click on demo/placeholder links,
 * providing clear information about the placeholder functionality and options
 * to copy the URL or close the modal.
 *
 * @module components/ui
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Check,
  Copy,
  ExternalLink,
  LayoutDashboard,
  Lock,
  Plug,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import {
  type DemoLinkCategory,
  type DemoLinkModalContent,
  demoLinkContent,
  getDemoLinkContent,
} from '../../config/demoLinks';

/**
 * Icon mapping for demo link categories
 */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lock,
  LayoutDashboard,
  Plug,
  Share2,
  ExternalLink,
  Sparkles,
};

/**
 * Props for the DemoLinkModal component
 */
export interface DemoLinkModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should be closed */
  onClose: () => void;
  /** The URL that triggered the modal */
  url: string;
  /** Optional category override */
  category?: DemoLinkCategory | undefined;
  /** Optional custom title override */
  title?: string | undefined;
  /** Optional custom message override */
  message?: string | undefined;
  /** Optional additional description */
  description?: string | undefined;
  /** Optional custom action text */
  actionText?: string | undefined;
  /** Callback when URL is copied */
  onModalCopy?: ((url: string) => void) | undefined;
}

/**
 * Custom hook to trap focus within the modal when open
 */
function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isActive: boolean,
  onEscape: () => void,
): void {
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      // Restore focus when modal closes
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
      const focusableElements = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      if (firstElement) {
        firstElement.focus();
      }
    }

    // Handle Tab key navigation
    const handleTabKey = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusableElements = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute('disabled'));

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // If Shift+Tab on first element, wrap to last
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
      // If Tab on last element, wrap to first
      else if (!event.shiftKey && document.activeElement === lastElement) {
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
 * DemoLinkModal Component
 */
export const DemoLinkModal = ({
  isOpen,
  onClose,
  url,
  category: categoryOverride,
  title: customTitle,
  message: customMessage,
  description: customDescription,
  actionText: customActionText,
  onModalCopy,
}: DemoLinkModalProps): React.ReactElement | null => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Apply focus trap
  useFocusTrap(containerRef as React.RefObject<HTMLElement | null>, isOpen, onClose);

  // Get content based on URL or category override
  const content: DemoLinkModalContent = categoryOverride
    ? demoLinkContent[categoryOverride]
    : getDemoLinkContent(url);

  // Use custom values if provided, otherwise use defaults
  const title = customTitle ?? content.title;
  const message = customMessage ?? content.message;
  const description = customDescription ?? content.description;
  const actionText = customActionText ?? content.actionText;
  const IconComponent = iconMap[content.icon] ?? ExternalLink;

  // Handle copy URL
  const handleCopy = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      onModalCopy?.(url);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      console.warn('Failed to copy to clipboard:', error);
    }
  }, [url, onModalCopy]);

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

  // Reduced motion check
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationDuration = prefersReducedMotion ? '0ms' : '200ms';

  if (!isOpen) {
    return null;
  }

  // Use createPortal to render modal outside parent containers
  // This prevents issues with parent elements that have transform/overflow creating new stacking contexts
  const modalContent = (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
        aria-hidden="true"
        data-testid="modal-overlay"
        style={{
          animation: `fadeIn ${animationDuration} ease-out`,
        }}
      />

      {/* Modal dialog container - flexbox centering to avoid transform conflicts */}
      <div
        className="fixed inset-0 flex items-center justify-center z-[100] p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-link-modal-title"
        aria-describedby="demo-link-modal-description"
        data-testid="modal-content"
        onClick={onClose}
      >
        <div
          ref={containerRef}
          className="w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: prefersReducedMotion
              ? undefined
              : `modalEnter ${animationDuration} ease-out`,
          }}
        >
          <div className="bg-bg-primary border border-border-default rounded-2xl shadow-2xl overflow-hidden">
            {/* Header with icon and close button */}
            <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 p-6">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                aria-label="Close modal"
                data-testid="modal-close"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <h2
                id="demo-link-modal-title"
                className="text-xl font-bold text-text-primary text-center"
              >
                {title}
              </h2>

              {/* Message */}
              <p
                id="demo-link-modal-description"
                className="text-text-secondary text-center"
                data-testid="demo-message"
              >
                {message}
              </p>

              {/* Additional description if provided */}
              {description && (
                <p className="text-sm text-text-tertiary text-center">{description}</p>
              )}

              {/* URL display */}
              <div className="bg-bg-secondary rounded-lg p-3 flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                <code className="flex-1 text-sm text-text-secondary truncate font-mono">{url}</code>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {/* Copy URL button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 ${
                    copied
                      ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                  aria-label={copied ? 'URL copied to clipboard' : actionText}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>{actionText}</span>
                    </>
                  )}
                </button>

                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );

  // Render modal via portal to document.body to escape parent stacking contexts
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  // SSR fallback - render inline (won't be interactive until hydrated)
  return modalContent;
};

/**
 * Hook for managing DemoLinkModal state
 * @returns Modal state and controls
 */
export function useDemoLinkModal(): {
  isOpen: boolean;
  url: string;
  openModal: (url: string) => void;
  closeModal: () => void;
} {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  const openModal = useCallback((linkUrl: string): void => {
    setUrl(linkUrl);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback((): void => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    url,
    openModal,
    closeModal,
  };
}

export default DemoLinkModal;
