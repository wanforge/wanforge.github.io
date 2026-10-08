import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Mail, Zap } from 'lucide-react';
import {
  DiscordIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@/components/icons/BrandIcons';
import { company, featureFlags, footer, siteNavigation, social } from '../../config/site';
import { ROUTES, resolveHref } from '../../config/paths';
import { Button } from '../ui/Button';

/**
 * Props for the Footer component
 */
export interface FooterProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the newsletter section */
  showNewsletter?: boolean;
}

/**
 * Props for individual footer link items
 */
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean | undefined;
  onClick?: ((e: React.MouseEvent<HTMLAnchorElement>) => void) | undefined;
}

/**
 * Props for social link items
 */
interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

import { Link } from '../ui/Link';

/**
 * Individual footer link component with hover effects
 */
function FooterLink({ href, children, external }: FooterLinkProps) {
  return (
    <Link
      href={href}
      variant="subtle"
      className="text-text-secondary hover:text-text-primary text-sm"
      showExternalIcon={false}
      openExternalInNewTab={!!external}
    >
      {children}
    </Link>
  );
}

/**
 * Social media link component with icon and hover effect
 */
function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      data-testid="social-link"
      className="w-10 h-10 rounded-full bg-bg-secondary hover:bg-primary-100 dark:hover:bg-primary-900/30 
                 flex items-center justify-center text-text-secondary hover:text-primary-600 
                 transition-all duration-200 hover:scale-110 focus:outline-none 
                 focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      showExternalIcon={false}
    >
      {icon}
    </Link>
  );
}

/**
 * Newsletter signup form component
 */
function NewsletterSignup({ onSubmit }: { onSubmit?: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsLoading(false);
    setIsSubmitted(true);
    onSubmit?.(email);
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 text-success-600 dark:text-success-400 py-3">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Thanks for subscribing!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-4 py-2.5 bg-bg-primary border border-border-default rounded-lg
                   text-text-primary placeholder:text-text-tertiary
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   transition-all duration-200"
        aria-label="Email address for newsletter"
      />
      <Button
        type="submit"
        disabled={isLoading}
        loading={isLoading}
        variant="primary"
        size="md"
        className="px-5"
        rightIcon={<ArrowRight className="w-4 h-4" />}
      >
        Subscribe
      </Button>
    </form>
  );
}

/**
 * Footer Component
 *
 * Provides the site footer with:
 * - Multi-column navigation layout
 * - Company logo and description
 * - Navigation link groups (Product, Company, Resources, Legal)
 * - Social media links with demo modal triggers
 * - Newsletter signup form (optional)
 * - Copyright and legal links
 * - Full light/dark mode support
 * - Responsive design for all breakpoints
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * @example
 * ```tsx
 * <Footer showNewsletter={false} onDemoLinkClick={(type) => console.log(type)} />
 * ```
 */
export function Footer({ className = '', showNewsletter = true }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = footer.copyright.replace('{year}', String(currentYear));

  return (
    <footer
      className={`bg-bg-secondary border-t border-border-default ${className}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Newsletter Section */}
      {showNewsletter && featureFlags.newsletter && (
        <div className="border-b border-border-default">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="lg:max-w-md">
                <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-2">
                  {footer.newsletterHeadline}
                </h3>
                <p className="text-text-secondary text-sm lg:text-base">
                  {footer.newsletterDescription}
                </p>
              </div>
              <div className="lg:max-w-md w-full lg:w-auto">
                <NewsletterSignup />
                <p className="text-text-tertiary text-xs mt-2">{footer.newsletterPrivacy}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Logo */}
            <a
              href={resolveHref(ROUTES.HOME)}
              className="inline-flex items-center gap-2 text-text-primary hover:opacity-80 transition-opacity 
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 
                         focus-visible:ring-offset-2 rounded-lg mb-4"
              aria-label={`${company.name} - Home`}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold tracking-tight">{company.name}</span>
            </a>

            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-sm">
              {company.shortDescription}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <SocialLink
                href={social.twitterUrl}
                label="Follow us on Twitter"
                icon={<TwitterIcon className="w-4 h-4" />}
              />
              <SocialLink
                href={social.githubUrl}
                label="View our GitHub"
                icon={<GithubIcon className="w-4 h-4" />}
              />
              <SocialLink
                href={social.linkedinUrl}
                label="Connect on LinkedIn"
                icon={<LinkedinIcon className="w-4 h-4" />}
              />
              <SocialLink
                href={social.discordUrl}
                label="Join our Discord"
                icon={<DiscordIcon className="w-4 h-4" />}
              />
              <SocialLink
                href={social.youtubeUrl}
                label="Subscribe on YouTube"
                icon={<YoutubeIcon className="w-4 h-4" />}
              />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm">
              {siteNavigation.footer.product.title}
            </h4>
            <ul className="space-y-3">
              {siteNavigation.footer.product.links.map((link) => {
                const linkWithExternal = link as typeof link & { external?: boolean };
                return (
                  <li key={link.label}>
                    <FooterLink href={link.href} external={linkWithExternal.external}>
                      {link.label}
                    </FooterLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm">
              {siteNavigation.footer.company.title}
            </h4>
            <ul className="space-y-3">
              {siteNavigation.footer.company.links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm">
              {siteNavigation.footer.resources.title}
            </h4>
            <ul className="space-y-3">
              {siteNavigation.footer.resources.links.map((link) => {
                const linkWithExternal = link as typeof link & { external?: boolean };
                return (
                  <li key={link.label}>
                    <FooterLink href={link.href} external={linkWithExternal.external}>
                      {link.label}
                    </FooterLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm">
              {siteNavigation.footer.legal.title}
            </h4>
            <ul className="space-y-3">
              {siteNavigation.footer.legal.links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-text-tertiary">
              <span>{copyrightText}</span>
              <span className="hidden sm:inline">·</span>
              <span>{footer.registrationNumber}</span>
              <span className="hidden sm:inline">·</span>
              <a
                href={footer.attributionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded"
              >
                {footer.attributionText}
              </a>
            </div>

            {/* Contact Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`mailto:${siteNavigation.contact[0].value}`}
                className="text-text-secondary hover:text-text-primary transition-colors 
                           flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 
                           focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded"
                showExternalIcon={false}
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">{siteNavigation.contact[0].value}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Minimal Footer variant for auth pages and special pages
 * Shows only copyright and essential links
 */
export interface MinimalFooterProps {
  /** Additional CSS classes */
  className?: string;
}

export function MinimalFooter({ className = '' }: MinimalFooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = footer.copyright.replace('{year}', String(currentYear));

  return (
    <footer
      className={`bg-bg-secondary border-t border-border-default py-6 ${className}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-text-tertiary">
          <span>{copyrightText}</span>
          <div className="flex items-center gap-4">
            <FooterLink href={ROUTES.PRIVACY}>Privacy</FooterLink>
            <FooterLink href={ROUTES.TERMS}>Terms</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
