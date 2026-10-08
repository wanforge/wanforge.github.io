import React from 'react';
import { getCanonicalUrl } from '../../config/paths';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSchemaProps {
  crumbs: BreadcrumbItem[];
}

/**
 * BreadcrumbSchema
 *
 * Renders JSON-LD BreadcrumbList schema for search engines.
 * This helps search engines understand the site hierarchy and displays breadcrumbs in SERPs.
 *
 * @see https://schema.org/BreadcrumbList
 */
export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ crumbs }) => {
  if (!crumbs || crumbs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org' as const,
    '@type': 'BreadcrumbList' as const,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http') ? crumb.item : getCanonicalUrl(crumb.item),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
