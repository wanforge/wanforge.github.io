import React from 'react';

/**
 * FAQEntry interface for individual question and answer pairs
 */
export interface FAQEntry {
  question: string;
  answer: string;
}

/**
 * Props for the FAQSchema component
 */
export interface FAQSchemaProps {
  /** Array of question and answer pairs */
  faqs: FAQEntry[];
}

/**
 * FAQSchema Component
 *
 * Renders JSON-LD FAQPage schema for search engines.
 * This helps search engines understand that the page contains frequently asked questions
 * and can lead to enhanced search results (rich snippets).
 *
 * @see https://schema.org/FAQPage
 */
export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  // Don't render if no FAQs are provided
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org' as const,
    '@type': 'FAQPage' as const,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default FAQSchema;
