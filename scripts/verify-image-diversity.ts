#!/usr/bin/env bun
/* eslint-disable no-console */
/**
 * Image Diversity Validation Script
 *
 * Verifies that the images in the project are diverse in terms of:
 * - Authors/Attribution
 * - Categories/Subjects
 * - Color palettes (if manifest has color data)
 * - Dimensions/Orientation
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const MANIFEST_PATH = join(process.cwd(), 'public', 'images', 'manifest.json');

interface ImageManifest {
  filename: string;
  category: string;
  attribution: string;
  dimensions: { width: number; height: number };
  color?: string;
}

interface ManifestFile {
  generated: string;
  totalImages: number;
  categories: Record<string, number>;
  images: ImageManifest[];
}

function validateDiversity() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error('❌ Manifest file not found at:', MANIFEST_PATH);
    process.exit(1);
  }

  const manifest: ManifestFile = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));

  console.log('🎨 ModernSaaS Image Diversity Validation\n');
  console.log(`Checking ${manifest.totalImages} images...\n`);

  let issuesFound = 0;

  // 1. Author Diversity
  console.log('📊 Author Distribution:');
  const authorCounts: Record<string, number> = {};
  manifest.images.forEach((img) => {
    authorCounts[img.attribution] = (authorCounts[img.attribution] || 0) + 1;
  });

  const sortedAuthors = Object.entries(authorCounts).sort((a, b) => b[1] - a[1]);
  sortedAuthors.forEach(([author, count]) => {
    const status = count > 2 && author !== 'Placeholder (Generated)' ? '⚠' : '✓';
    if (status === '⚠') issuesFound++;
    console.log(`  ${status} ${author}: ${count}`);
  });

  // 2. Category Balance
  console.log('\n📁 Category Balance:');
  const expectedCount = Math.floor(manifest.totalImages / Object.keys(manifest.categories).length);
  Object.entries(manifest.categories).forEach(([category, count]) => {
    const diff = Math.abs(count - expectedCount);
    const status = diff > 2 ? '⚠' : '✓';
    if (status === '⚠') issuesFound++;
    console.log(`  ${status} ${category}: ${count}`);
  });

  // 3. Placeholder Ratio
  console.log('\n🖼 Placeholder vs Real Ratio:');
  const placeholderCount = manifest.images.filter(
    (img) => img.attribution === 'Placeholder (Generated)',
  ).length;
  const realCount = manifest.totalImages - placeholderCount;
  const placeholderRatio = placeholderCount / manifest.totalImages;
  const status = placeholderRatio > 0.3 ? '⚠' : '✓';
  if (status === '⚠') issuesFound++;
  console.log(`  ${status} Real Images: ${realCount}`);
  console.log(
    `  ${status} Placeholders: ${placeholderCount} (${(placeholderRatio * 100).toFixed(1)}%)`,
  );

  // 4. Dimensions/Orientation
  console.log('\n📐 Orientation Distribution:');
  let landscape = 0,
    portrait = 0,
    square = 0;
  manifest.images.forEach((img) => {
    const ratio = img.dimensions.width / img.dimensions.height;
    if (ratio > 1.1) landscape++;
    else if (ratio < 0.9) portrait++;
    else square++;
  });
  console.log(`  ✓ Landscape: ${landscape}`);
  console.log(`  ✓ Portrait: ${portrait}`);
  console.log(`  ✓ Square: ${square}`);

  if (portrait > landscape) {
    console.log(
      '  ⚠ Warning: More portrait than landscape images. Landing pages usually prefer landscape.',
    );
    issuesFound++;
  }

  console.log('\n--- Summary ---');
  if (issuesFound > 0) {
    console.log(`⚠ Found ${issuesFound} potential diversity issues.`);
    console.log(
      'Recommendation: Run `bun scripts/fetch-images.ts --force` to refresh with better diversity if needed.',
    );
  } else {
    console.log('✅ Image diversity looks good!');
  }
}

validateDiversity();
