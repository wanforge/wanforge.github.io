import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeatureDetail } from './FeatureDetail';
import { featureDetails } from '@/data/features';

describe('FeatureDetail', () => {
  it('renders all feature details correctly', () => {
    render(<FeatureDetail />);

    featureDetails.forEach((feature) => {
      // Check for titles
      expect(screen.getByRole('heading', { name: feature.title })).toBeDefined();

      // Check for descriptions
      expect(screen.getByText(feature.description)).toBeDefined();

      // Check for sub-features
      feature.subFeatures?.forEach((sub) => {
        expect(screen.getByText(sub)).toBeDefined();
      });

      // Check for images or placeholders
      if (feature.image) {
        const image = screen.getByAltText(feature.imageAlt || feature.title);
        expect(image).toBeDefined();
        expect(image.getAttribute('src')).toContain(feature.image);
      } else {
        expect(screen.getByLabelText(`Placeholder for ${feature.title}`)).toBeDefined();
      }
    });
  });

  it('applies custom className to the wrapper', () => {
    const customClass = 'custom-test-class';
    const { container } = render(<FeatureDetail className={customClass} />);

    // The component wraps sections in a div
    expect(container.firstChild).toBeDefined();
    expect((container.firstChild as HTMLElement).classList.contains(customClass)).toBe(true);
  });

  it('renders sections with alternating layouts', () => {
    const { container } = render(<FeatureDetail />);
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBe(featureDetails.length);

    // Check alternating flex-row vs flex-row-reverse
    sections.forEach((section, index) => {
      const isEven = index % 2 === 0;

      // Find the inner div that has the flex layout
      // It's the first child of the Container div
      const containerDiv = section.querySelector('.w-full.px-4'); // Basic Container classes
      const flexContainer = containerDiv?.firstElementChild;

      expect(flexContainer).toBeDefined();

      if (!isEven) {
        expect(flexContainer?.className).toContain('lg:flex-row-reverse');
      } else {
        expect(flexContainer?.className).not.toContain('lg:flex-row-reverse');
      }
    });
  });
});
