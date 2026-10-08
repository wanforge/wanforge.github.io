import { describe, expect, it } from 'vitest';
import { featureDetails, featuresOverview, useCases } from '@/data/features';
import { pricingTiers } from '@/data/pricing';
import { socialProofStats, testimonials } from '@/data/testimonials';
import { companyValues, teamMembers } from '@/data/team';
import { integrations } from '@/data/integrations';
import { generalFAQs, pricingFAQs, roadmapFAQs, supportFAQs } from '@/data/faq';
import { blogAuthors, blogCategories, blogPosts } from '@/data/blog';

describe('Data Validation', () => {
  describe('Features Data', () => {
    it('should have a valid featuresOverview structure', () => {
      expect(featuresOverview.length).toBeGreaterThan(0);
      featuresOverview.forEach((feature) => {
        expect(feature).toHaveProperty('id');
        expect(feature).toHaveProperty('icon');
        expect(feature).toHaveProperty('title');
        expect(feature).toHaveProperty('description');
      });
    });

    it('should have unique IDs in featuresOverview', () => {
      const ids = featuresOverview.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have a valid featureDetails structure', () => {
      expect(featureDetails.length).toBeGreaterThan(0);
      featureDetails.forEach((feature) => {
        expect(feature).toHaveProperty('id');
        expect(feature).toHaveProperty('icon');
        expect(feature).toHaveProperty('title');
        expect(feature).toHaveProperty('description');
        if (feature.image) {
          expect(feature.image.startsWith('/')).toBe(true);
        }
      });
    });

    it('should have a valid useCases structure', () => {
      expect(useCases.length).toBeGreaterThan(0);
      useCases.forEach((useCase) => {
        expect(useCase).toHaveProperty('id');
        expect(useCase).toHaveProperty('persona');
        expect(useCase).toHaveProperty('title');
        expect(useCase).toHaveProperty('description');
        expect(Array.isArray(useCase.benefits)).toBe(true);
      });
    });
  });

  describe('Pricing Data', () => {
    it('should have a valid pricingTiers structure', () => {
      expect(pricingTiers.length).toBe(3);
      pricingTiers.forEach((tier) => {
        expect(tier).toHaveProperty('id');
        expect(tier).toHaveProperty('name');
        expect(tier).toHaveProperty('description');
        expect(tier.cta).toHaveProperty('text');
        expect(tier.cta).toHaveProperty('href');
        expect(Array.isArray(tier.features)).toBe(true);
        expect(tier.limits).toBeDefined();
      });
    });

    it('should have valid prices or null for enterprise', () => {
      pricingTiers.forEach((tier) => {
        if (tier.type !== 'enterprise') {
          expect(typeof tier.monthlyPrice).toBe('number');
          expect(typeof tier.annualPrice).toBe('number');
        } else {
          expect(tier.monthlyPrice).toBeNull();
          expect(tier.annualPrice).toBeNull();
        }
      });
    });
  });

  describe('Testimonials Data', () => {
    it('should have a valid testimonials structure', () => {
      expect(testimonials.length).toBeGreaterThan(0);
      testimonials.forEach((t) => {
        expect(t).toHaveProperty('id');
        expect(t).toHaveProperty('quote');
        expect(t.author).toHaveProperty('name');
        expect(t.author).toHaveProperty('role');
        expect(t.author).toHaveProperty('company');
        expect(t.rating).toBeGreaterThanOrEqual(1);
        expect(t.rating).toBeLessThanOrEqual(5);
        if (t.author.avatar) {
          expect(t.author.avatar.startsWith('/')).toBe(true);
        }
      });
    });

    it('should have valid socialProofStats', () => {
      expect(socialProofStats.companies).toBeGreaterThan(0);
      expect(typeof socialProofStats.users).toBe('string');
      expect(socialProofStats.rating).toBeGreaterThan(0);
    });
  });

  describe('Team Data', () => {
    it('should have a valid teamMembers structure', () => {
      expect(teamMembers.length).toBeGreaterThan(0);
      teamMembers.forEach((m) => {
        expect(m).toHaveProperty('id');
        expect(m).toHaveProperty('name');
        expect(m).toHaveProperty('role');
        expect(m).toHaveProperty('bio');
        expect(m.avatar.startsWith('/')).toBe(true);
        expect(Array.isArray(m.social)).toBe(true);
      });
    });

    it('should have a valid companyValues structure', () => {
      expect(companyValues.length).toBeGreaterThan(0);
      companyValues.forEach((v) => {
        expect(v).toHaveProperty('id');
        expect(v).toHaveProperty('title');
        expect(v).toHaveProperty('description');
        expect(v).toHaveProperty('icon');
      });
    });
  });

  describe('Integrations Data', () => {
    it('should have a valid integrations structure', () => {
      expect(integrations.length).toBeGreaterThan(0);
      integrations.forEach((i) => {
        expect(i).toHaveProperty('id');
        expect(i).toHaveProperty('name');
        expect(i).toHaveProperty('description');
        expect(i.logo.startsWith('/')).toBe(true);
        expect(i.website.startsWith('http')).toBe(true);
      });
    });

    it('should have unique IDs in integrations', () => {
      const ids = integrations.map((i) => i.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('FAQ Data', () => {
    const allFAQs = [...generalFAQs, ...pricingFAQs, ...supportFAQs, ...roadmapFAQs];
    it('should have valid FAQ structures', () => {
      expect(allFAQs.length).toBeGreaterThan(0);
      allFAQs.forEach((faq) => {
        expect(faq).toHaveProperty('question');
        expect(faq).toHaveProperty('answer');
        expect(faq).toHaveProperty('category');
      });
    });
  });

  describe('Blog Data', () => {
    it('should have a valid blogPosts structure', () => {
      expect(blogPosts.length).toBeGreaterThan(0);
      blogPosts.forEach((post) => {
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('content');
        expect(post).toHaveProperty('author');
        expect(post).toHaveProperty('category');
        expect(post.coverImage.startsWith('/')).toBe(true);
      });
    });

    it('should have unique IDs in blogPosts', () => {
      const ids = blogPosts.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have unique slugs in blogPosts', () => {
      const slugs = blogPosts.map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it('should have valid authors for all posts', () => {
      const authorIds = blogAuthors.map((a) => a.id);
      blogPosts.forEach((post) => {
        expect(authorIds).toContain(post.author.id);
      });
    });

    it('should have valid categories for all posts', () => {
      const categoryIds = blogCategories.map((c) => c.id);
      blogPosts.forEach((post) => {
        expect(categoryIds).toContain(post.category);
      });
    });
  });
});
