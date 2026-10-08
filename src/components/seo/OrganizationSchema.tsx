import React from 'react';
import site from '../../config/site';
import { getAssetPath, getPathConfig } from '../../config/paths';

/**
 * OrganizationSchema
 *
 * Renders JSON-LD Organization schema for search engines.
 * This helps with branding in search results and knowledge graphs.
 *
 * @see https://schema.org/Organization
 */
export const OrganizationSchema: React.FC = () => {
  const { company, social, contact } = site;
  const { siteUrl } = getPathConfig();

  const schema = {
    '@context': 'https://schema.org' as const,
    '@type': 'Organization' as const,
    name: company.name,
    alternateName: 'ModernSaaS Inc.',
    description: company.shortDescription,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject' as const,
      url: `${siteUrl}${getAssetPath('logo.png')}`,
    },
    sameAs: [
      social.twitterUrl,
      social.githubUrl,
      social.linkedinUrl,
      social.youtubeUrl,
      social.discordUrl,
    ].filter(Boolean),
    contactPoint: [
      {
        '@type': 'ContactPoint' as const,
        telephone: contact.phone,
        contactType: 'customer service',
        email: contact.supportEmail,
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint' as const,
        telephone: contact.phone,
        contactType: 'sales',
        email: contact.salesEmail,
        availableLanguage: ['English'],
      },
    ],
    address: {
      '@type': 'PostalAddress' as const,
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
      addressCountry: contact.address.country,
    },
    founder: {
      '@type': 'Person' as const,
      name: company.name, // Using company name as founder placeholder for template
    },
    foundingDate: String(company.foundedYear),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
