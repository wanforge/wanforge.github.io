import React from 'react';
import site from '../../config/site';
import { getCanonicalUrl } from '../../config/paths';

export interface MetaTagsProps {
  /** Page-specific title override */
  title?: string | undefined;
  /** Page-specific description override */
  description?: string | undefined;
  /** Page-specific canonical URL override */
  canonical?: string | undefined;
  /** Robots directive override (default: 'index, follow') */
  robots?: string | undefined;
  /** Current page pathname for auto-canonical generation */
  pathname?: string | undefined;
  /** Open Graph type (default: 'website') */
  ogType?: 'website' | 'article' | 'profile' | undefined;
  /** Page-specific OG image override */
  ogImage?: string | undefined;
  /** Page-specific Twitter card override (default: from config) */
  twitterCard?: 'summary' | 'summary_large_image' | undefined;
}

/**
 * MetaTags Component
 *
 * Renders standard SEO meta tags including title, description,
 * canonical URL, and robots directives.
 * Also includes Open Graph and Twitter tags for social sharing.
 * Uses centralized configuration and path resolution.
 */
export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  canonical,
  robots,
  pathname = '',
  ogType = 'website',
  ogImage,
  twitterCard,
}) => {
  const { seo: defaultSeo, getPageTitle } = site;

  // Use utility from site config for consistent title formatting
  const finalTitle = getPageTitle(title);

  // Description fallback
  const finalDescription = description || defaultSeo.defaultDescription;

  // Canonical URL resolution using centralized paths
  const finalCanonical = canonical || getCanonicalUrl(pathname);

  // Robots directive
  const finalRobots = robots || 'index, follow';

  // OG Image resolution
  const finalOgImage = ogImage
    ? getCanonicalUrl(ogImage)
    : getCanonicalUrl(defaultSeo.defaultOgImage);

  // Twitter card resolution
  const finalTwitterCard = twitterCard || defaultSeo.twitterCardType;

  return (
    <>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalCanonical} />
      <meta name="robots" content={finalRobots} />

      {/* Standard Meta Tags */}
      <meta name="author" content={defaultSeo.author} />
      <meta name="theme-color" content={defaultSeo.themeColor} />

      {defaultSeo.defaultKeywords.length > 0 && (
        <meta name="keywords" content={defaultSeo.defaultKeywords.join(', ')} />
      )}

      {/* Open Graph Tags */}
      <meta property="og:site_name" content={site.company.name} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:locale" content={defaultSeo.locale} />

      {/* Twitter Tags */}
      <meta name="twitter:card" content={finalTwitterCard} />
      <meta name="twitter:site" content={defaultSeo.twitterSite} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
    </>
  );
};
