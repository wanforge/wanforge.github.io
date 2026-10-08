import { type ReactNode } from 'react';
import { type Theme, ThemeProvider } from '../ThemeProvider';
import { Toaster } from '../ui/Toast';

/**
 * Props for the SkipToContent component
 */
export interface SkipToContentProps {
  /** Target element ID to skip to */
  targetId: string;
}

/**
 * SkipToContent Component
 *
 * Provides a keyboard-accessible link that allows users to skip
 * repetitive navigation and jump directly to the main content.
 * This is essential for accessibility compliance (WCAG 2.1).
 *
 * The link is visually hidden by default but becomes visible when
 * focused via keyboard navigation (Tab key).
 *
 * @example
 * ```tsx
 * <SkipToContent targetId="main-content" />
 * ```
 */
function SkipToContent({ targetId }: SkipToContentProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white 
                 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-primary-600 transition-all"
      aria-label="Skip to main content"
    >
      Skip to content
    </a>
  );
}

/**
 * Props for the RootLayout component
 */
export interface RootLayoutProps {
  /** Child components to render inside the layout */
  children: ReactNode;
  /** Default theme to use (light, dark, or system) */
  defaultTheme?: Theme;
  /** Storage key for persisting theme preference */
  storageKey?: string;
  /** Disable transitions when switching themes */
  disableTransitionOnChange?: boolean;
  /** ID of the main content element for skip-to-content link */
  mainContentId?: string;
  /** Language attribute for the document (set on html element in Astro layout) */
  lang?: string;
}

/**
 * RootLayout Component
 *
 * Provides the foundational layout structure for the application including:
 * - ThemeProvider integration for light/dark mode support
 * - Skip-to-content accessibility link
 * - Global style application
 * - Language attribute configuration
 *
 * This component should wrap the entire application content to ensure
 * consistent theming and accessibility features across all pages.
 *
 * @example
 * ```tsx
 * <RootLayout defaultTheme="system">
 *   <Header />
 *   <main id="main-content">
 *     <YourPageContent />
 *   </main>
 *   <Footer />
 * </RootLayout>
 * ```
 */
export function RootLayout({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  disableTransitionOnChange = false,
  mainContentId = 'main-content',
}: RootLayoutProps) {
  return (
    <ThemeProvider
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {/* Skip to content link for accessibility */}
      <SkipToContent targetId={mainContentId} />

      {/* Main layout wrapper */}
      <div className="relative min-h-screen bg-bg-primary text-text-primary antialiased">
        {children}
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

/**
 * Props for the MainContent component
 */
export interface MainContentProps {
  /** Child components to render inside main content */
  children: ReactNode;
  /** HTML id attribute for skip-to-content targeting */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to apply default container styling */
  container?: boolean;
}

/**
 * MainContent Component
 *
 * Wrapper for the main content area with proper ARIA landmarks.
 * This should be used for the primary content of each page.
 *
 * @example
 * ```tsx
 * <MainContent>
 *   <h1>Page Title</h1>
 *   <p>Page content...</p>
 * </MainContent>
 * ```
 */
export function MainContent({
  children,
  id = 'main-content',
  className = '',
  container = false,
}: MainContentProps) {
  const baseClasses = 'outline-none focus:outline-none';
  const containerClasses = container ? 'container-default' : '';

  return (
    <main
      id={id}
      className={`${baseClasses} ${containerClasses} ${className}`.trim()}
      tabIndex={-1}
      role="main"
      aria-label="Main content"
    >
      {children}
    </main>
  );
}

/**
 * Props for the VisuallyHidden component
 */
export interface VisuallyHiddenProps {
  /** Content to hide visually but keep accessible to screen readers */
  children: ReactNode;
}

/**
 * VisuallyHidden Component
 *
 * Hides content visually while keeping it accessible to screen readers.
 * Useful for providing additional context to assistive technologies
 * without affecting the visual design.
 *
 * @example
 * ```tsx
 * <button>
 *   <Icon />
 *   <VisuallyHidden>Close dialog</VisuallyHidden>
 * </button>
 * ```
 */
export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return (
    <span
      className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
      style={{
        clip: 'rect(0, 0, 0, 0)',
        clipPath: 'inset(50%)',
      }}
    >
      {children}
    </span>
  );
}

export default RootLayout;
