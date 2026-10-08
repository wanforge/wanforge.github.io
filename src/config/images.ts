/**
 * Image Optimization Configuration
 *
 * Centralized configuration for the image optimization pipeline.
 * Works with Astro's built-in image optimization using Sharp.
 *
 * @module config/images
 */

import type { ImageMetadata } from 'astro';

/**
 * Supported image formats for optimization
 */
export type ImageFormat = 'webp' | 'avif' | 'png' | 'jpeg' | 'jpg' | 'svg';

/**
 * Responsive breakpoint definitions
 */
export const IMAGE_BREAKPOINTS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840] as const;

/**
 * Default quality settings for different formats
 */
export const IMAGE_QUALITY = {
  /** Default quality for lossy formats (0-100) */
  default: 80,
  /** High quality for hero/large images */
  high: 90,
  /** Medium quality for thumbnails/previews */
  medium: 70,
  /** Low quality for placeholders/blur */
  low: 40,
} as const;

/**
 * Format priorities for automatic format selection
 * Earlier formats are preferred when browser support is available
 */
export const FORMAT_PRIORITY: ImageFormat[] = ['avif', 'webp', 'jpeg'];

/**
 * Default lazy loading configuration
 */
export const LAZY_LOADING = {
  /** Default loading behavior */
  default: 'lazy' as const,
  /** Eager loading for above-the-fold images */
  eager: 'eager' as const,
  /** Lazy loading for below-the-fold images */
  lazy: 'lazy' as const,
  /** Root margin for intersection observer (in pixels) */
  rootMargin: '200px',
  /** Threshold for triggering load (0-1) */
  threshold: 0.01,
};

/**
 * Placeholder options for blur-up loading
 */
export const PLACEHOLDER = {
  /** Use low-quality image placeholder (LQIP) */
  lqip: 'lqip' as const,
  /** Use dominant color as placeholder */
  color: 'color' as const,
  /** Use blurred version of the image */
  blur: 'blur' as const,
  /** No placeholder */
  none: 'none' as const,
  /** Default blur amount for placeholder (in pixels) */
  blurAmount: 20,
};

/**
 * Image size presets for common use cases
 */
export const IMAGE_PRESETS = {
  /** Avatar/profile image */
  avatar: { width: 64, height: 64 },
  /** Small thumbnail */
  thumbnail: { width: 200, height: 150 },
  /** Card image */
  card: { width: 400, height: 300 },
  /** Feature showcase image */
  feature: { width: 800, height: 600 },
  /** Hero background */
  hero: { width: 1920, height: 1080 },
  /** Full width section */
  fullWidth: { width: 3840, height: 2160 },
} as const;

/**
 * Remote image domains allowed for optimization
 */
export const REMOTE_DOMAINS = [
  'images.unsplash.com',
  '*.unsplash.com',
  'images.pexels.com',
  '*.pexels.com',
] as const;

/**
 * Check if a URL is from an allowed remote domain
 */
export function isAllowedRemoteUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return REMOTE_DOMAINS.some((domain) => {
      if (domain.startsWith('*.')) {
        const suffix = domain.slice(2);
        return hostname.endsWith(suffix);
      }
      return hostname === domain;
    });
  } catch {
    return false;
  }
}

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(src: string, widths: number[], format?: ImageFormat): string {
  return widths
    .map((width) => {
      const url = new URL(src, 'http://localhost');
      url.searchParams.set('w', width.toString());
      if (format) {
        url.searchParams.set('format', format);
      }
      return `${url.pathname}${url.search} ${width}w`;
    })
    .join(', ');
}

/**
 * Get optimal format for browser support
 * Returns the best supported format based on accept header
 */
export function getOptimalFormat(acceptHeader: string): ImageFormat {
  if (acceptHeader.includes('image/avif')) {
    return 'avif';
  }
  if (acceptHeader.includes('image/webp')) {
    return 'webp';
  }
  return 'jpeg';
}

/**
 * Calculate aspect ratio from dimensions
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Generate blur placeholder CSS
 */
export function generateBlurPlaceholder(blurAmount: number = PLACEHOLDER.blurAmount): string {
  return `blur(${blurAmount}px)`;
}

/**
 * Get image dimensions from metadata
 */
export function getImageDimensions(metadata: ImageMetadata): {
  width: number;
  height: number;
  aspectRatio: number;
} {
  const { width, height } = metadata;
  return {
    width,
    height,
    aspectRatio: calculateAspectRatio(width, height),
  };
}

/**
 * Validate image source
 */
export function validateImageSource(src: string | ImageMetadata | null | undefined): boolean {
  if (src === null || src === undefined) {
    return false;
  }
  if (typeof src === 'string') {
    // Remote URL
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return isAllowedRemoteUrl(src);
    }
    // Local path
    return src.startsWith('/') || src.startsWith('./') || src.startsWith('../');
  }
  // ImageMetadata object
  return typeof src === 'object' && 'src' in src && 'width' in src && 'height' in src;
}

/**
 * Configuration object for image optimization
 */
export const imageConfig = {
  /** Breakpoints for responsive images */
  breakpoints: IMAGE_BREAKPOINTS,
  /** Quality settings */
  quality: IMAGE_QUALITY,
  /** Format priorities */
  formatPriority: FORMAT_PRIORITY,
  /** Lazy loading configuration */
  lazyLoading: LAZY_LOADING,
  /** Placeholder options */
  placeholder: PLACEHOLDER,
  /** Size presets */
  presets: IMAGE_PRESETS,
  /** Allowed remote domains */
  remoteDomains: REMOTE_DOMAINS,
  /** Maximum input pixel dimensions */
  limitInputPixels: 268_402_689, // ~16384 x 16384
} as const;

export default imageConfig;
