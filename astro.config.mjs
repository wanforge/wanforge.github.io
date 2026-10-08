// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

/**
 * Determines the base path for deployment
 * - GitHub Project Pages: /repository-name/
 * - GitHub User/Org Pages: /
 * - Custom Domain: /
 */
const getBasePath = () => {
  // GitHub Actions sets this for project pages
  if (process.env.GITHUB_PAGES === 'true') {
    const repo = process.env.GITHUB_REPOSITORY;
    if (repo) {
      const [, repoName] = repo.split('/');
      return repoName ? `/${repoName}` : '/';
    }
  }
  // Local development or user/org pages
  const basePath = process.env.BASE_PATH || '/';
  // Fix Windows path expansion
  return basePath.includes(':\\') || basePath.includes(':/')
    ? '/' + basePath.split(/[\\/]/).pop()
    : basePath;
};

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        // Automatically add lastmod date for all pages
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  site: process.env.SITE_URL || 'https://example.com',
  base: getBasePath(),
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,

  // Image optimization configuration
  image: {
    // Service for image optimization using Sharp
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Limit concurrent image processing
        limitInputPixels: 268402689, // ~16384 x 16384
        // Default image quality for lossy formats
        quality: 80,
      },
    },
    // Default breakpoints for responsive images
    breakpoints: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Enable remote image optimization (for placeholder images)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
    ],
  },

  // Vite configuration for additional optimizations
  vite: {
    build: {
      // Optimize asset handling
      assetsInlineLimit: 4096, // 4KB
      // Ensure proper image handling
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';
            const info = name.split('.');
            const ext = info[info.length - 1] || '';
            if (/webp|avif|png|jpe?g|gif|svg/i.test(ext)) {
              return `images/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      },
    },
  },
});
