// Example test to verify vitest configuration works
import { describe, expect, it, vi } from 'vitest';
import { mockFactories, mockTheme, responsiveTesting } from './utils';

describe('Test Setup Verification', () => {
  it('should run basic assertions', () => {
    expect(true).toBe(true);
    expect(1 + 1).toBe(2);
  });

  it('should have access to vi utilities', () => {
    const mockFn = vi.fn();
    mockFn('test');
    expect(mockFn).toHaveBeenCalledWith('test');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should support async tests', async () => {
    const promise = Promise.resolve(42);
    const result = await promise;
    expect(result).toBe(42);
  });

  describe('Mock Factories', () => {
    it('should create mock feature data', () => {
      const feature = mockFactories.createFeature({ title: 'Custom Feature' });
      expect(feature).toHaveProperty('id');
      expect(feature).toHaveProperty('title', 'Custom Feature');
      expect(feature).toHaveProperty('description');
    });

    it('should create mock pricing tier data', () => {
      const tier = mockFactories.createPricingTier({ popular: true });
      expect(tier).toHaveProperty('price');
      expect(tier.popular).toBe(true);
    });

    it('should create mock testimonial data', () => {
      const testimonial = mockFactories.createTestimonial();
      expect(testimonial).toHaveProperty('quote');
      expect(testimonial).toHaveProperty('author');
      expect(testimonial.author).toHaveProperty('name');
    });

    it('should create mock team member data', () => {
      const member = mockFactories.createTeamMember();
      expect(member).toHaveProperty('name');
      expect(member).toHaveProperty('role');
    });
  });

  describe('Theme Testing Utilities', () => {
    it('should setup localStorage mock', () => {
      const storage = mockTheme.setupLocalStorage('dark');
      expect(storage.getItem('theme')).toBe('dark');
    });

    it('should setup system preference mock without errors', () => {
      // Should not throw when setting up system preference
      expect(() => mockTheme.setupSystemPreference(true)).not.toThrow();
    });
  });

  describe('Responsive Testing Utilities', () => {
    it('should have defined viewport sizes', () => {
      expect(responsiveTesting.viewports.mobileSmall).toEqual({
        width: 320,
        height: 568,
      });
      expect(responsiveTesting.viewports.desktop).toEqual({
        width: 1280,
        height: 720,
      });
    });

    it('should set viewport size without errors', () => {
      // Should not throw when setting viewport
      expect(() => responsiveTesting.setViewport(768, 1024)).not.toThrow();
    });
  });
});
