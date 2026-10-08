import React from 'react';
import site from '../../config/site';
import { getPagePath, getPathConfig } from '../../config/paths';

/**
 * WebSiteSchema
 *
 * Renders JSON-LD WebSite schema for search engines.
 * This helps with site-wide indexing and enables Sitelinks Searchbox.
 *
 * @see https://schema.org/WebSite
 */
export const WebSiteSchema: React.FC = () => {
  const { company } = site;
  const { siteUrl } = getPathConfig();
  const searchUrl = `${siteUrl}${getPagePath('search')}?q={search_term_string}`;

  const schema = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebSite' as const,
    name: company.name,
    url: siteUrl,
    description: company.shortDescription,
    potentialAction: {
      '@type': 'SearchAction' as const,
      target: {
        '@type': 'EntryPoint' as const,
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
