#!/usr/bin/env bun
/* eslint-disable no-console */
/**
 * Automated Image Fetching Script
 *
 * Fetches diverse, high-quality placeholder images from Unsplash API
 * for use in the ModernSaaS landing page template.
 *
 * Categories:
 * - tech: Technology, software, code, digital interfaces
 * - abstract: Abstract backgrounds, gradients, patterns
 * - team: Team photos, people, collaboration
 * - office: Workspace, office environments, professional settings
 * - devices: Laptops, phones, tablets, hardware
 *
 * Usage:
 *   bun scripts/fetch-images.ts
 *   bun scripts/fetch-images.ts --category=tech --count=5
 *   bun scripts/fetch-images.ts --force (re-download existing)
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  outputDir: join(__dirname, '..', 'public', 'images'),
  unsplashApiUrl: 'https://api.unsplash.com',
  imagesPerCategory: 4,
  targetWidth: 1200,
  targetHeight: 800,
  quality: 80,
  format: 'webp' as const,
};

// Image categories with search queries
const CATEGORIES: Record<string, { queries: string[]; description: string }> = {
  tech: {
    queries: [
      'technology abstract',
      'software development',
      'digital interface',
      'code programming',
      'data visualization',
    ],
    description: 'Technology and software-related imagery',
  },
  abstract: {
    queries: [
      'abstract gradient',
      'geometric pattern',
      'minimal background',
      'fluid art',
      'modern texture',
    ],
    description: 'Abstract backgrounds and artistic patterns',
  },
  team: {
    queries: [
      'diverse team collaboration',
      'professional team meeting',
      'startup team working',
      'creative professionals',
      'remote team video call',
    ],
    description: 'Team and people-focused imagery',
  },
  office: {
    queries: [
      'modern office workspace',
      'coworking space',
      'minimalist desk setup',
      'creative office interior',
      'professional environment',
    ],
    description: 'Office and workspace environments',
  },
  devices: {
    queries: [
      'laptop mockup',
      'smartphone device',
      'tech gadgets',
      'computer hardware',
      'mobile app display',
    ],
    description: 'Devices and hardware mockups',
  },
};

// Types
interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  color: string | null;
  width: number;
  height: number;
}

interface DownloadedImage {
  id: string;
  filename: string;
  category: string;
  url: string;
  localPath: string;
  attribution: string;
  width: number;
  height: number;
  color: string | null;
}

// Parse command line arguments
function parseArgs(): { category?: string; count?: number; force?: boolean } {
  const args = process.argv.slice(2);
  const result: { category?: string; count?: number; force?: boolean } = {};

  for (const arg of args) {
    if (arg.startsWith('--category=')) {
      const value = arg.split('=')[1];
      if (value) result.category = value;
    } else if (arg.startsWith('--count=')) {
      const value = arg.split('=')[1];
      if (value) result.count = parseInt(value, 10);
    } else if (arg === '--force') {
      result.force = true;
    }
  }

  return result;
}

// Ensure output directory exists
function ensureOutputDir(): void {
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`✓ Created output directory: ${CONFIG.outputDir}`);
  }
}

// Fetch images from Unsplash API (using public API without auth for demo purposes)
async function fetchFromUnsplash(query: string, count: number): Promise<UnsplashImage[]> {
  // Using Unsplash Source (deprecated) fallback to direct search
  // For production, use proper API with access key
  const searchUrl = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(
    query,
  )}&per_page=${count}&orientation=landscape`;

  try {
    const response = await fetch(searchUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'ModernSaaS-Image-Fetcher/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as { results: UnsplashImage[] };
    return data.results || [];
  } catch (error) {
    console.warn(`⚠ Failed to fetch from Unsplash: ${error}`);
    return [];
  }
}

// Fallback: Generate placeholder images using CSS/data URI
function generatePlaceholder(
  width: number,
  height: number,
  category: string,
  index: number,
): { dataUrl: string; color: string } {
  // Generate a deterministic color based on category and index
  const hueMap: Record<string, number> = {
    tech: 210,
    abstract: 280,
    team: 30,
    office: 180,
    devices: 150,
  };

  const hue = hueMap[category] ?? 200;
  const saturation = 60 + ((index * 10) % 40);
  const lightness = 40 + ((index * 15) % 40);
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  // Create a simple SVG placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)" 
            text-anchor="middle" dominant-baseline="middle">
        ${category.toUpperCase()} ${index + 1}
      </text>
    </svg>
  `;

  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  return { dataUrl, color };
}

// Calculate color distance between two hex colors (0-1)
function calculateColorDistance(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;

  return Math.sqrt(dr * dr + dg * dg + db * db) / 441.67; // Normalize by max distance
}

// Convert hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result || !result[1] || !result[2] || !result[3]) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

// Validate image diversity
function validateDiversity(
  images: DownloadedImage[],
  newImage: DownloadedImage,
  threshold: number = 0.3,
): boolean {
  // 1. Author diversity check
  const authorOccurrences = images.filter((img) => img.attribution === newImage.attribution).length;
  if (authorOccurrences >= 2 && newImage.attribution !== 'Placeholder (Generated)') {
    return false;
  }

  // 2. Color diversity check (within category)
  const sameCategory = images.filter((img) => img.category === newImage.category);

  for (const existing of sameCategory) {
    // Simple filename-based diversity check (in production, compare actual image data)
    // Two images are considered similar if they share the same dominant color
    if (existing.color && newImage.color) {
      const colorDistance = calculateColorDistance(existing.color, newImage.color);
      if (colorDistance < threshold) {
        return false;
      }
    }
  }

  return true;
}

// Download image from URL
async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'ModernSaaS-Image-Fetcher/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download: HTTP ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Process and save image
async function processAndSaveImage(
  image: UnsplashImage,
  category: string,
  index: number,
): Promise<DownloadedImage | null> {
  const filename = `${category}-${String(index + 1).padStart(2, '0')}.jpg`;
  const localPath = join(CONFIG.outputDir, filename);

  try {
    // Download the image (use regular size for faster download)
    const imageUrl = image.urls.regular;
    const imageData = await downloadImage(imageUrl);

    // Save the image
    writeFileSync(localPath, imageData);

    return {
      id: image.id,
      filename,
      category,
      url: imageUrl,
      localPath,
      attribution: `${image.user.name} (@${image.user.username})`,
      width: image.width,
      height: image.height,
      color: image.color,
    };
  } catch (error) {
    console.warn(`⚠ Failed to process image ${image.id}: ${error}`);
    return null;
  }
}

// Save placeholder image
async function savePlaceholder(category: string, index: number): Promise<DownloadedImage> {
  const filename = `${category}-${String(index + 1).padStart(2, '0')}.svg`;
  const localPath = join(CONFIG.outputDir, filename);

  const { dataUrl, color } = generatePlaceholder(
    CONFIG.targetWidth,
    CONFIG.targetHeight,
    category,
    index,
  );

  // Convert data URL to buffer and save
  const base64Data = dataUrl.replace(/^data:image\/svg\+xml;base64,/, '');
  const svgBuffer = Buffer.from(base64Data, 'base64');
  writeFileSync(localPath, svgBuffer);

  return {
    id: `placeholder-${category}-${index}`,
    filename,
    category,
    url: dataUrl,
    localPath,
    attribution: 'Placeholder (Generated)',
    width: CONFIG.targetWidth,
    height: CONFIG.targetHeight,
    color,
  };
}

// Fetch images for a category
async function fetchImagesForCategory(
  category: string,
  count: number,
  existingImages: DownloadedImage[],
  usePlaceholders: boolean = false,
): Promise<DownloadedImage[]> {
  const categoryInfo = CATEGORIES[category];
  if (!categoryInfo) {
    throw new Error(`Unknown category: ${category}`);
  }

  console.log(`\n📁 Fetching ${count} images for category: ${category}`);
  console.log(`   ${categoryInfo.description}`);

  const downloaded: DownloadedImage[] = [];

  if (usePlaceholders) {
    console.log('   Using placeholder images (API unavailable)');
    for (let i = 0; i < count; i++) {
      const placeholder = await savePlaceholder(category, i);
      downloaded.push(placeholder);
      console.log(`   ✓ ${placeholder.filename} (placeholder)`);
    }
    return downloaded;
  }

  // Try each query until we get enough images
  const queries = categoryInfo.queries;
  let queryIndex = 0;

  while (downloaded.length < count && queryIndex < queries.length) {
    const query = queries[queryIndex];
    if (!query) {
      queryIndex++;
      continue;
    }
    console.log(`   Trying query: "${query}"`);

    const images = await fetchFromUnsplash(query, count * 2);

    if (images.length === 0) {
      console.warn(`   ⚠ No results for query: ${query}`);
      queryIndex++;
      continue;
    }

    for (const image of images) {
      if (downloaded.length >= count) break;

      const processed = await processAndSaveImage(image, category, downloaded.length);

      if (processed) {
        // Validate diversity
        const isDiverse = validateDiversity([...existingImages, ...downloaded], processed);

        if (isDiverse) {
          downloaded.push(processed);
          console.log(`   ✓ ${processed.filename} by ${processed.attribution}`);
        } else {
          console.log(`   ⚠ Skipped ${processed.filename} (too similar)`);
        }
      }
    }

    queryIndex++;
  }

  // Fill remaining slots with placeholders if needed
  while (downloaded.length < count) {
    console.log(`   Using placeholder for slot ${downloaded.length + 1}`);
    const placeholder = await savePlaceholder(category, downloaded.length);
    downloaded.push(placeholder);
  }

  return downloaded;
}

// Generate manifest file
function generateManifest(images: DownloadedImage[]): void {
  const manifest = {
    generated: new Date().toISOString(),
    totalImages: images.length,
    categories: Object.keys(CATEGORIES).reduce<Record<string, number>>((acc, category) => {
      acc[category] = images.filter((img) => img.category === category).length;
      return acc;
    }, {}),
    images: images.map((img) => ({
      filename: img.filename,
      category: img.category,
      attribution: img.attribution,
      dimensions: { width: img.width, height: img.height },
    })),
  };

  const manifestPath = join(CONFIG.outputDir, 'manifest.json');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📝 Generated manifest: ${manifestPath}`);
}

// Generate TypeScript types file
function generateTypesFile(): void {
  const typesContent = `/**
 * Image manifest types for ModernSaaS landing page
 * Auto-generated by scripts/fetch-images.ts
 */

export type ImageCategory = 'tech' | 'abstract' | 'team' | 'office' | 'devices';

export interface ImageManifest {
  filename: string;
  category: ImageCategory;
  attribution: string;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface ImageManifestFile {
  generated: string;
  totalImages: number;
  categories: Record<ImageCategory, number>;
  images: ImageManifest[];
}

export const IMAGE_CATEGORIES: ImageCategory[] = [
  'tech',
  'abstract',
  'team',
  'office',
  'devices',
];

export function getImagesByCategory(
  manifest: ImageManifestFile,
  category: ImageCategory
): ImageManifest[] {
  return manifest.images.filter((img) => img.category === category);
}
`;

  const typesPath = join(CONFIG.outputDir, 'types.ts');
  writeFileSync(typesPath, typesContent);
  console.log(`📝 Generated types: ${typesPath}`);
}

// Main function
async function main(): Promise<void> {
  console.log('🎨 ModernSaaS Image Fetcher\n');
  console.log('Fetching high-quality placeholder images...\n');

  const args = parseArgs();
  const categoriesToFetch = args.category ? [args.category] : Object.keys(CATEGORIES);

  ensureOutputDir();

  const allImages: DownloadedImage[] = [];
  let usePlaceholders = false;

  // Test API availability first
  console.log('Testing Unsplash API availability...');
  const testImages = await fetchFromUnsplash('test', 1);
  if (testImages.length === 0) {
    console.log('⚠ Unsplash API unavailable, using placeholder images\n');
    usePlaceholders = true;
  } else {
    console.log('✓ Unsplash API available\n');
  }

  // Fetch images for each category
  for (const category of categoriesToFetch) {
    if (!CATEGORIES[category]) {
      console.error(`❌ Unknown category: ${category}`);
      console.log(`Available categories: ${Object.keys(CATEGORIES).join(', ')}`);
      process.exit(1);
    }

    const count = args.count || CONFIG.imagesPerCategory;
    const images = await fetchImagesForCategory(category, count, allImages, usePlaceholders);
    allImages.push(...images);
  }

  // Generate manifest and types
  generateManifest(allImages);
  generateTypesFile();

  // Summary
  console.log('\n✅ Image fetching complete!');
  console.log(`\n📊 Summary:`);
  console.log(`   Total images: ${allImages.length}`);
  console.log(`   Output directory: ${CONFIG.outputDir}`);
  console.log(`\n📁 Files created:`);
  console.log(`   - manifest.json`);
  console.log(`   - types.ts`);
  allImages.forEach((img) => {
    console.log(`   - ${img.filename}`);
  });

  console.log('\n📝 Attribution:');
  console.log('   Please include attribution for Unsplash images:');
  const unsplashImages = allImages.filter((img) => img.attribution.includes('@'));
  unsplashImages.slice(0, 3).forEach((img) => {
    console.log(`   - Photo by ${img.attribution} on Unsplash`);
  });
  if (unsplashImages.length > 3) {
    console.log(`   ... and ${unsplashImages.length - 3} more`);
  }

  console.log('\n✨ Done! Images are ready in public/images/\n');
}

// Run main function
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
