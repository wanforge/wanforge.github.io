import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Link } from '../ui/Link';
import { MobileMenuButton, MobileNavigation } from '../ui/MobileNavigation';
import { company, siteNavigation } from '../../config/site';
import { ROUTES, isActiveRoute, resolveHref } from '../../config/paths';
import { useReducedMotion } from '../../utils/reducedMotion';

/**
 * Props for the Header component
 */
export interface HeaderProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the CTA button */
  showCta?: boolean;
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Callback when CTA is clicked */
  onCtaClick?: () => void;
}

/**
 * Header Component
 *
 * Provides the main site navigation with:
 * - Sticky header with scroll-based background transition
 * - Logo with link to homepage
 * - Navigation links from site configuration
 * - Theme toggle button
 * - Primary CTA button
 * - Mobile hamburger menu with slide-out drawer
 * - Full accessibility support
 *
 * The header transitions from transparent to solid background on scroll
 * for a modern, immersive experience while maintaining readability.
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 *
 * @example
 * ```tsx
 * <Header
 *   showCta={true}
 *   ctaText="Get Started"
 *   onCtaClick={() => console.log('CTA clicked')}
 * />
 * ```
 */
export function Header({
  className = '',
  showCta = true,
  ctaText = 'Get Started',
  ctaHref = ROUTES.SIGNUP,
  onCtaClick,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const { prefersReducedMotion } = useReducedMotion();

  // Handle scroll effect for background transition
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20);
  }, []);

  useEffect(() => {
    // Check initial scroll position and path
    handleScroll();
    setCurrentPath(window.location.pathname);

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Astro View Transitions
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
      setIsMobileMenuOpen(false);
    };

    document.addEventListener('astro:after-swap', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('astro:after-swap', handleNavigation);
    };
  }, [handleScroll]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Header background styles based on scroll state
  const headerBackground = isScrolled
    ? 'bg-bg-primary/80 backdrop-blur-xl shadow-md border-b border-border-default/50'
    : 'bg-transparent py-2';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out pt-[env(safe-area-inset-top)] ${headerBackground} ${className}`}
        role="banner"
        aria-label="Site header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20 lg:h-24'}`}
          >
            {/* Logo */}
            <a
              href={resolveHref(ROUTES.HOME)}
              className="flex items-center gap-2 text-text-primary hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-lg"
              aria-label={`${company.name} - Home`}
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-lg lg:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-primary/70">
                {company.name}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-2"
              role="navigation"
              aria-label="Main navigation"
            >
              {siteNavigation.main.map((item) => {
                const active = isActiveRoute(item.href, currentPath);
                return (
                  <a
                    key={item.href}
                    href={resolveHref(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-lg ${
                      active
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-bg-secondary rounded-lg -z-10"
                        initial={false}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 30 }
                        }
                      />
                    )}
                    {active && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary-500 rounded-full"
                        initial={false}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 30 }
                        }
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Theme Toggle - Desktop */}
              <ThemeToggle aria-label="Toggle theme" className="hidden sm:flex" />

              {/* CTA Button - Desktop */}
              {showCta && (
                <Link
                  href={ctaHref}
                  variant="button"
                  size="md"
                  className="hidden md:inline-flex"
                  useDemoModal={false}
                  onClick={(e) => {
                    if (onCtaClick) {
                      e.preventDefault();
                      onCtaClick();
                    }
                  }}
                >
                  {ctaText}
                </Link>
              )}

              {/* Mobile Menu Button */}
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
                className="md:hidden"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        showCta={showCta}
        ctaText={ctaText}
        ctaHref={ctaHref}
        currentPath={currentPath}
        {...(onCtaClick ? { onCtaClick } : {})}
      />
    </>
  );
}

/**
 * Props for the MinimalHeader variant
 */
export interface MinimalHeaderProps {
  /** Additional CSS classes */
  className?: string;
  /** Logo href */
  logoHref?: string;
}

/**
 * MinimalHeader Component
 *
 * A simplified header variant for auth pages, 404 pages, and other
 * secondary pages that don't need full navigation.
 *
 * @example
 * ```tsx
 * <MinimalHeader />
 * ```
 */
export function MinimalHeader({ className = '', logoHref = ROUTES.HOME }: MinimalHeaderProps) {
  return (
    <header
      className={`w-full py-4 px-4 sm:px-6 lg:px-8 ${className}`}
      role="banner"
      aria-label="Site header"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href={resolveHref(logoHref)}
          className="inline-flex items-center gap-2 text-text-primary hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-lg"
          aria-label={`${company.name} - Home`}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <span className="text-lg font-bold tracking-tight">{company.name}</span>
        </a>

        {/* Theme Toggle - Minimal variant */}
        <ThemeToggle aria-label="Toggle theme" />
      </div>
    </header>
  );
}

export default Header;
