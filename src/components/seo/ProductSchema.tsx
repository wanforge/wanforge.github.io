import React from 'react';
import site from '../../config/site';
import { pricingTiers } from '../../data/pricing';
import { socialProofStats, testimonials } from '../../data/testimonials';
import { getPathConfig } from '../../config/paths';

/**
 * ProductSchema
 *
 * Renders JSON-LD Product schema for search engines.
 * This helps the SaaS offering appear with pricing and availability in search results.
 *
 * @see https://schema.org/Product
 */
export const ProductSchema: React.FC = () => {
  const { company } = site;
  const { siteUrl } = getPathConfig();

  const schema = {
    '@context': 'https://schema.org' as const,
    '@type': 'Product' as const,
    name: company.name,
    image: `${siteUrl}/images/og-default.jpg`,
    description: company.shortDescription,
    brand: {
      '@type': 'Brand' as const,
      name: company.name,
    },
    offers: pricingTiers
      .filter((tier) => tier.monthlyPrice !== null)
      .map((tier) => ({
        '@type': 'Offer' as const,
        name: tier.name,
        price: tier.monthlyPrice,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${siteUrl}/pricing`,
      })),
    aggregateRating: {
      '@type': 'AggregateRating' as const,
      ratingValue: String(socialProofStats.rating),
      reviewCount: String(socialProofStats.reviews),
    },
    review: testimonials.slice(0, 3).map((t) => ({
      '@type': 'Review' as const,
      author: {
        '@type': 'Person' as const,
        name: t.author.name,
      },
      datePublished: '2024-01-01', // Placeholder date
      reviewBody: t.quote,
      reviewRating: {
        '@type': 'Rating' as const,
        ratingValue: String(t.rating),
        bestRating: '5',
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
