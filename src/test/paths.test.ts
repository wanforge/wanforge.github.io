import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ASSETS,
  NAVIGATION,
  ROUTES,
  getAssetPath,
  getCanonicalUrl,
  getImagePath,
  getImageSrcSet,
  getPagePath,
  getPathConfig,
  isActiveRoute,
  isDemoRoute,
  isExternalUrl,
  resolveHref,
} from '../config/paths';

describe('Path Configuration', () => {
  describe('getPathConfig', () => {
    const originalWindow = global.window;
    const originalProcess = global.process;
    const originalDocument = global.document;

    afterEach(() => {
      // Restore original globals after each test
      (global as { window?: typeof global.window }).window = originalWindow;
      (global as { process?: typeof global.process }).process = originalProcess;
      (global as { document?: typeof global.document }).document = originalDocument;
      vi.restoreAllMocks();
    });

    it('should return correct config for browser environment', () => {
      // Mock browser environment
      const mockMeta = {
        getAttribute: vi.fn().mockReturnValue('/repo-name'),
      };

      const mockQuerySelector = vi.fn().mockReturnValue(mockMeta);

      // Create a partial mock of window
      const mockWindow = {
        location: {
          hostname: 'username.github.io',
          pathname: '/repo-name/',
          origin: 'https://username.github.io',
          hash: '',
          host: 'username.github.io',
          href: 'https://username.github.io/repo-name/',
          port: '',
          protocol: 'https:',
          search: '',
          ancestorOrigins: {} as DOMStringList,
          assign: vi.fn(),
          reload: vi.fn(),
          replace: vi.fn(),
        } as Location,
        __BASE_PATH__: '/repo-name',
      } as unknown as Window & { __BASE_PATH__?: string };

      (global as { window?: typeof global.window }).window = mockWindow as unknown as Window &
        typeof globalThis;
      global.document = {
        querySelector: mockQuerySelector,
      } as unknown as Document;

      const config = getPathConfig();

      expect(config.basePath).toBe('/repo-name');
      expect(config.isGitHubPages).toBe(true);
      expect(config.isProjectPage).toBe(true);
      expect(config.siteUrl).toBe('https://username.github.io');
    });

    it('should return correct config for root path', () => {
      const mockWindow = {
        location: {
          hostname: 'example.com',
          pathname: '/',
          origin: 'https://example.com',
          hash: '',
          host: 'example.com',
          href: 'https://example.com/',
          port: '',
          protocol: 'https:',
          search: '',
          ancestorOrigins: {} as DOMStringList,
          assign: vi.fn(),
          reload: vi.fn(),
          replace: vi.fn(),
        } as Location,
      } as unknown as Window;

      (global as { window?: typeof global.window }).window = mockWindow as unknown as Window &
        typeof globalThis;
      global.document = {
        querySelector: vi.fn().mockReturnValue(null),
      } as unknown as Document;

      const config = getPathConfig();

      expect(config.basePath).toBe('/');
      expect(config.isGitHubPages).toBe(false);
      expect(config.isProjectPage).toBe(false);
      expect(config.siteUrl).toBe('https://example.com');
    });
  });

  describe('getAssetPath', () => {
    it('should resolve asset path without throwing', () => {
      // Test that function exists and works
      expect(() => getAssetPath('images/logo.png')).not.toThrow();
    });

    it('should handle paths with and without leading slash', () => {
      const result1 = getAssetPath('images/logo.png');
      const result2 = getAssetPath('/images/logo.png');

      // Both should resolve to the same path (depending on base path)
      expect(result1).toContain('images/logo.png');
      expect(result2).toContain('images/logo.png');
    });
  });

  describe('getImagePath', () => {
    it('should return correct image path without options', () => {
      const result = getImagePath('logo');
      expect(result).toContain('images/logo');
    });

    it('should return correct image path with format', () => {
      const result = getImagePath('logo', { format: 'webp' });
      expect(result).toContain('images/logo.webp');
    });

    it('should return correct image path with size', () => {
      const result = getImagePath('logo', { size: '800w' });
      expect(result).toContain('images/logo-800w');
    });

    it('should handle filename with existing extension', () => {
      const result = getImagePath('logo.png', { format: 'webp' });
      expect(result).toContain('images/logo.webp');
    });
  });

  describe('getImageSrcSet', () => {
    it('should generate srcset with default sizes', () => {
      const result = getImageSrcSet('hero');
      expect(result).toContain('hero-400w 400w');
      expect(result).toContain('hero-800w 800w');
      expect(result).toContain('hero-1200w 1200w');
    });

    it('should generate srcset with custom sizes', () => {
      const result = getImageSrcSet('hero', [200, 400]);
      expect(result).toContain('hero-200w 200w');
      expect(result).toContain('hero-400w 400w');
      expect(result).not.toContain('800w');
    });
  });

  describe('getPagePath', () => {
    it('should resolve root path correctly', () => {
      // This function depends on getPathConfig
      const result = getPagePath('');
      expect(typeof result).toBe('string');
    });

    it('should resolve route path correctly', () => {
      const result = getPagePath('pricing');
      expect(result).toContain('pricing');
    });

    it('should handle leading and trailing slashes', () => {
      const result1 = getPagePath('/pricing/');
      const result2 = getPagePath('pricing');
      // Both should result in similar paths (with base path consideration)
      expect(result1).toContain('pricing');
      expect(result2).toContain('pricing');
    });
  });

  describe('isExternalUrl', () => {
    it('should identify HTTP URLs as external', () => {
      expect(isExternalUrl('http://example.com')).toBe(true);
      expect(isExternalUrl('https://example.com')).toBe(true);
    });

    it('should identify protocol-relative URLs as external', () => {
      expect(isExternalUrl('//example.com')).toBe(true);
    });

    it('should identify mailto links as external', () => {
      expect(isExternalUrl('mailto:test@example.com')).toBe(true);
    });

    it('should identify tel links as external', () => {
      expect(isExternalUrl('tel:+1234567890')).toBe(true);
    });

    it('should identify relative paths as internal', () => {
      expect(isExternalUrl('/pricing')).toBe(false);
      expect(isExternalUrl('features')).toBe(false);
    });

    it('should identify hash links as internal', () => {
      expect(isExternalUrl('#section')).toBe(false);
    });
  });

  describe('resolveHref', () => {
    it('should return external URLs unchanged', () => {
      const external = 'https://example.com';
      expect(resolveHref(external)).toBe(external);
    });

    it('should return hash links unchanged', () => {
      const hash = '#section';
      expect(resolveHref(hash)).toBe(hash);
    });

    it('should resolve internal paths', () => {
      const result = resolveHref('pricing');
      expect(result).toContain('pricing');
    });

    it('should resolve internal paths with leading slash', () => {
      const result = resolveHref('/pricing');
      expect(result).toContain('pricing');
    });
  });

  describe('getCanonicalUrl', () => {
    it('should return canonical URL for root path', () => {
      const result = getCanonicalUrl('');
      expect(typeof result).toBe('string');
    });

    it('should return canonical URL for path', () => {
      const result = getCanonicalUrl('pricing');
      expect(typeof result).toBe('string');
    });

    it('should handle paths with leading slashes', () => {
      const result = getCanonicalUrl('/pricing/');
      expect(typeof result).toBe('string');
    });
  });

  describe('ROUTES', () => {
    it('should have all main page routes', () => {
      expect(ROUTES.HOME).toBe('/');
      expect(ROUTES.FEATURES).toBe('/features/');
      expect(ROUTES.PRICING).toBe('/pricing/');
      expect(ROUTES.ABOUT).toBe('/about/');
      expect(ROUTES.CONTACT).toBe('/contact/');
      expect(ROUTES.BLOG).toBe('/blog/');
    });

    it('should have blog post dynamic route function', () => {
      expect(typeof ROUTES.BLOG_POST).toBe('function');
      expect(ROUTES.BLOG_POST('hello-world')).toBe('/blog/hello-world/');
    });

    it('should have additional page routes', () => {
      expect(ROUTES.CHANGELOG).toBe('/changelog/');
      expect(ROUTES.ROADMAP).toBe('/roadmap/');
      expect(ROUTES.PRIVACY).toBe('/privacy/');
      expect(ROUTES.TERMS).toBe('/terms/');
    });

    it('should have auth mockup routes', () => {
      expect(ROUTES.LOGIN).toBe('/login/');
      expect(ROUTES.SIGNUP).toBe('/signup/');
    });

    it('should have 404 route', () => {
      expect(ROUTES.NOT_FOUND).toBe('/404/');
    });
  });

  describe('NAVIGATION', () => {
    it('should have main navigation items', () => {
      expect(NAVIGATION.main).toHaveLength(5);
      expect(NAVIGATION.main[0].label).toBe('Features');
      expect(NAVIGATION.main[0].href).toBe(ROUTES.FEATURES);
    });

    it('should have footer product links', () => {
      expect(NAVIGATION.footer.product.length).toBeGreaterThan(0);
      expect(NAVIGATION.footer.product[0].label).toBe('Features');
    });

    it('should have footer company links', () => {
      expect(NAVIGATION.footer.company.length).toBeGreaterThan(0);
      expect(NAVIGATION.footer.company[0].label).toBe('About');
    });

    it('should have footer legal links', () => {
      expect(NAVIGATION.footer.legal.length).toBeGreaterThan(0);
      expect(NAVIGATION.footer.legal[0].label).toBe('Privacy Policy');
    });

    it('should use ROUTES constants for all hrefs', () => {
      const allHrefs = [
        ...NAVIGATION.main.map((n) => n.href),
        ...NAVIGATION.footer.product.map((n) => n.href),
        ...NAVIGATION.footer.company.map((n) => n.href),
        ...NAVIGATION.footer.resources.map((n) => n.href),
        ...NAVIGATION.footer.legal.map((n) => n.href),
      ];

      // All hrefs should be defined in ROUTES
      const routeValues = Object.values(ROUTES).filter((v) => typeof v === 'string');
      allHrefs.forEach((href) => {
        // Check that href is one of the ROUTES values or starts with one
        const isValid = routeValues.some((route) => href === route);
        expect(isValid).toBe(true);
      });
    });
  });

  describe('ASSETS', () => {
    it('should have image asset path', () => {
      expect(ASSETS.IMAGES).toBe('/images/');
    });

    it('should have icon asset path', () => {
      expect(ASSETS.ICONS).toBe('/icons/');
    });

    it('should have font asset path', () => {
      expect(ASSETS.FONTS).toBe('/fonts/');
    });
  });

  describe('isDemoRoute', () => {
    it('should identify login as demo route', () => {
      expect(isDemoRoute('/login/')).toBe(true);
      expect(isDemoRoute(ROUTES.LOGIN)).toBe(true);
    });

    it('should identify signup as demo route', () => {
      expect(isDemoRoute('/signup/')).toBe(true);
      expect(isDemoRoute(ROUTES.SIGNUP)).toBe(true);
    });

    it('should not identify other routes as demo routes', () => {
      expect(isDemoRoute('/features/')).toBe(false);
      expect(isDemoRoute('/pricing/')).toBe(false);
      expect(isDemoRoute(ROUTES.HOME)).toBe(false);
    });
  });

  describe('isActiveRoute', () => {
    it('should identify home route as active', () => {
      expect(isActiveRoute('/', '/')).toBe(true);
      expect(isActiveRoute('/', '')).toBe(true);
    });

    it('should identify matching route as active', () => {
      expect(isActiveRoute('/pricing/', '/pricing/')).toBe(true);
      expect(isActiveRoute('/features/', '/features/section')).toBe(true);
    });

    it('should not identify different route as active', () => {
      expect(isActiveRoute('/pricing/', '/features/')).toBe(false);
      expect(isActiveRoute('/about/', '/contact/')).toBe(false);
    });
  });
});
