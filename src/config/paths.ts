/**
 * Centralized Path Configuration
 *
 * Provides environment-aware path resolution for GitHub Pages deployment.
 * Handles subdirectory paths for project pages and root paths for user/org pages.
 */

/**
 * Path configuration interface
 */
export interface PathConfig {
  /** The base path for the application */
  basePath: string;
  /** Whether running on GitHub Pages */
  isGitHubPages: boolean;
  /** Whether this is a project page (subdirectory) */
  isProjectPage: boolean;
  /** The site URL */
  siteUrl: string;
}

/**
 * Gets the current path configuration based on environment
 * Works in both browser and server/build contexts
 */
export const getPathConfig = (): PathConfig => {
  // In browser, read from global or meta tag
  if (typeof window !== 'undefined') {
    const metaBase = document.querySelector('meta[name="base-path"]')?.getAttribute('content');
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    return {
      basePath: metaBase || (window as { __BASE_PATH__?: string }).__BASE_PATH__ || '/',
      isGitHubPages: hostname.includes('github.io'),
      isProjectPage:
        pathname.split('/').filter(Boolean).length >= 1 && hostname.includes('github.io'),
      siteUrl: window.location.origin,
    };
  }

  // Server/build time
  const baseUrl =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.BASE_URL as string | undefined)
      : undefined;

  const githubRepo = typeof process !== 'undefined' ? process.env.GITHUB_REPOSITORY : undefined;

  const siteUrl =
    typeof process !== 'undefined' && process.env.SITE_URL
      ? process.env.SITE_URL
      : typeof import.meta !== 'undefined' && import.meta.env?.SITE
        ? String(import.meta.env.SITE)
        : 'https://localhost:4321';

  const envBasePath = process?.env?.BASE_PATH || '/';
  // Fix Windows path expansion where /repo-name becomes C:/Program Files/Git/repo-name
  const cleanEnvBasePath =
    envBasePath.includes(':\\') || envBasePath.includes(':/')
      ? '/' + envBasePath.split(/[\\/]/).pop()
      : envBasePath;

  return {
    basePath: baseUrl || cleanEnvBasePath || '/',
    isGitHubPages: typeof process !== 'undefined' && process.env.GITHUB_PAGES === 'true',
    isProjectPage: !!githubRepo,
    siteUrl,
  };
};

/**
 * Resolves an asset path relative to the base path
 * @param path - The asset path (e.g., '/images/logo.png' or 'images/logo.png')
 * @returns Resolved path with base prefix
 */
export const getAssetPath = (path: string): string => {
  const { basePath } = getPathConfig();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

  if (cleanBase === '' || cleanBase === '/') {
    return `/${cleanPath}`;
  }

  // If path already starts with cleanBase, don't prepend it again
  if (path.startsWith(cleanBase)) {
    return path;
  }

  return `${cleanBase}/${cleanPath}`;
};

/**
 * Resolves an image path with optional format and size support
 * @param filename - Image filename without extension
 * @param options - Image options (format, sizes, etc.)
 * @returns Resolved image path
 */
export interface ImagePathOptions {
  format?: 'webp' | 'avif' | 'png' | 'jpg' | 'jpeg';
  size?: string;
  ext?: string;
}

export const getImagePath = (filename: string, options?: ImagePathOptions): string => {
  const originalExt = filename.match(/\.[^/.]+$/)?.[0] || '';
  const ext = options?.format ? `.${options.format}` : options?.ext || originalExt;
  const size = options?.size ? `-${options.size}` : '';

  // Remove existing extension from filename if it has one
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

  // If the filename already contains 'images/', don't prepend it again
  if (nameWithoutExt.includes('images/')) {
    const relativeName = nameWithoutExt.startsWith('/') ? nameWithoutExt.slice(1) : nameWithoutExt;
    return getAssetPath(`${relativeName}${size}${ext}`);
  }

  return getAssetPath(`images/${nameWithoutExt}${size}${ext}`);
};

/**
 * Generates responsive srcset for images
 * @param baseName - Base image name without size suffix
 * @param sizes - Array of sizes to generate
 * @returns srcset string
 */
export const getImageSrcSet = (baseName: string, sizes: number[] = [400, 800, 1200]): string => {
  return sizes.map((size) => `${getImagePath(baseName, { size: `${size}w` })} ${size}w`).join(', ');
};

/**
 * Resolves a page route path
 * @param route - Route path (e.g., 'pricing', 'about/team')
 * @returns Resolved route with base prefix and trailing slash
 */
export const getPagePath = (route: string = ''): string => {
  const { basePath } = getPathConfig();
  const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
  const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

  if (cleanBase === '' || cleanBase === '/') {
    return cleanRoute ? `/${cleanRoute}/` : '/';
  }

  // If route already starts with cleanBase, don't prepend it again
  if (route.startsWith(cleanBase)) {
    return route.endsWith('/') ? route : `${route}/`;
  }

  return cleanRoute ? `${cleanBase}/${cleanRoute}/` : `${cleanBase}/`;
};

/**
 * Checks if a URL is external
 * @param url - URL to check
 * @returns True if external
 */
export const isExternalUrl = (url: string): boolean => {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('//') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  );
};

/**
 * Resolves any href, handling both internal and external URLs
 * @param href - Original href
 * @returns Resolved href
 */
export const resolveHref = (href: string): string => {
  if (isExternalUrl(href) || href.startsWith('#')) {
    return href;
  }
  return getPagePath(href.replace(/^\//, '').replace(/\/$/, ''));
};

/**
 * Gets the canonical URL for a page
 * @param path - Page path
 * @returns Full canonical URL
 */
export const getCanonicalUrl = (path: string = ''): string => {
  const { siteUrl, basePath } = getPathConfig();

  const cleanSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const cleanBase =
    basePath === '/' ? '' : basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

  let normalizedPath = path;
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }

  // If normalizedPath already starts with cleanBase, don't prepend it
  if (cleanBase && normalizedPath.startsWith(cleanBase)) {
    return `${cleanSiteUrl}${normalizedPath}`;
  }

  return `${cleanSiteUrl}${cleanBase}${normalizedPath}`;
};

/**
 * Centralized route definitions
 * All internal links should reference these constants
 */
export const ROUTES = {
  // Main pages
  HOME: '/',
  FEATURES: '/features/',
  PRICING: '/pricing/',
  ABOUT: '/about/',
  CAREERS: '/careers/',
  CONTACT: '/contact/',
  SUPPORT: '/support/',
  BLOG: '/blog/',
  INTEGRATIONS: '/integrations/',

  // Blog
  BLOG_POST: (slug: string): string => `/blog/${slug}/`,

  // Additional pages
  CHANGELOG: '/changelog/',
  ROADMAP: '/roadmap/',
  PRIVACY: '/privacy/',
  TERMS: '/terms/',
  DOCS: '/docs/',
  DOCS_API: '/docs/api/',
  STATUS: '/status/',

  // Auth mockups (demo modal triggered)
  LOGIN: '/login/',
  SIGNUP: '/signup/',
  FORGOT_PASSWORD: '/forgot-password/',

  // App mockups
  DASHBOARD: '/dashboard/',
  SETTINGS: '/settings/',

  // 404
  NOT_FOUND: '/404/',
} as const;

/**
 * Navigation structure for header/footer
 */
export const NAVIGATION = {
  main: [
    { label: 'Features', href: ROUTES.FEATURES },
    { label: 'Pricing', href: ROUTES.PRICING },
    { label: 'About', href: ROUTES.ABOUT },
    { label: 'Blog', href: ROUTES.BLOG },
    { label: 'Contact', href: ROUTES.CONTACT },
  ],
  footer: {
    product: [
      { label: 'Features', href: ROUTES.FEATURES },
      { label: 'Pricing', href: ROUTES.PRICING },
      { label: 'Changelog', href: ROUTES.CHANGELOG },
      { label: 'Roadmap', href: ROUTES.ROADMAP },
    ],
    company: [
      { label: 'About', href: ROUTES.ABOUT },
      { label: 'Blog', href: ROUTES.BLOG },
      { label: 'Contact', href: ROUTES.CONTACT },
      { label: 'Careers', href: ROUTES.CAREERS },
    ],
    resources: [
      { label: 'Documentation', href: ROUTES.DOCS },
      { label: 'Help Center', href: ROUTES.SUPPORT },
      { label: 'API Reference', href: ROUTES.DOCS_API },
    ],
    legal: [
      { label: 'Privacy Policy', href: ROUTES.PRIVACY },
      { label: 'Terms of Service', href: ROUTES.TERMS },
    ],
  },
} as const;

/**
 * Asset path constants
 */
export const ASSETS = {
  IMAGES: '/images/',
  ICONS: '/icons/',
  FONTS: '/fonts/',
} as const;

/**
 * Check if a route is a demo route (triggers modal)
 * @param path - Path to check
 * @returns True if it's a demo route
 */
export const isDemoRoute = (path: string): boolean => {
  const demoRoutes = [
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.DASHBOARD,
    ROUTES.SETTINGS,
    ROUTES.INTEGRATIONS,
  ];
  return demoRoutes.some((route) => path === route || path.startsWith(route));
};

/**
 * Check if a path is the current active route
 * @param path - Path to check
 * @param currentPath - Current pathname
 * @returns True if active
 */
export const isActiveRoute = (path: string, currentPath: string): boolean => {
  if (path === ROUTES.HOME) {
    return currentPath === '/' || currentPath === '';
  }
  return currentPath.startsWith(path);
};
