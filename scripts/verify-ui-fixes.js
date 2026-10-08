/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = process.cwd();

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

function success(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function error(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function section(title) {
  console.log(`\n${colors.bold}${colors.blue}${title}${colors.reset}`);
  console.log('='.repeat(title.length));
}

/**
 * Verify investor logos exist and are valid SVGs
 */
function verifyInvestorLogos() {
  section('1. Investor Logos');
  const logosDir = path.join(PROJECT_ROOT, 'public', 'images', 'integrations');
  const requiredLogos = [
    'sequoia.svg',
    'a16z.svg',
    'yc.svg',
    'accel.svg',
    'greylock.svg',
    'angels.svg',
  ];

  let allValid = true;

  for (const logo of requiredLogos) {
    const logoPath = path.join(logosDir, logo);

    if (!fs.existsSync(logoPath)) {
      error(`Missing logo: ${logo}`);
      allValid = false;
      continue;
    }

    const content = fs.readFileSync(logoPath, 'utf-8');

    // Check if it's a valid SVG
    if (!content.includes('<svg') || !content.includes('</svg>')) {
      error(`Invalid SVG format: ${logo}`);
      allValid = false;
      continue;
    }

    // Check for viewBox attribute
    if (!content.includes('viewBox')) {
      error(`Missing viewBox attribute: ${logo}`);
      allValid = false;
      continue;
    }

    // Check for currentColor for theme support
    if (!content.includes('currentColor')) {
      error(`Missing currentColor for theme support: ${logo}`);
      allValid = false;
      continue;
    }

    success(`${logo} - Valid SVG with viewBox and currentColor`);
  }

  return allValid;
}

/**
 * Verify ChangelogHero uses theme-aware text colors
 */
function verifyChangelogColors() {
  section('2. Changelog Text Colors');
  const changelogHeroPath = path.join(
    PROJECT_ROOT,
    'src',
    'components',
    'sections',
    'ChangelogHero.tsx',
  );

  if (!fs.existsSync(changelogHeroPath)) {
    error('ChangelogHero.tsx not found');
    return false;
  }

  const content = fs.readFileSync(changelogHeroPath, 'utf-8');
  let allValid = true;

  // Check for theme-aware colors (should NOT have hardcoded text-white)
  if (content.includes('text-white') || content.includes('text-white/90')) {
    error('ChangelogHero still uses hardcoded text-white colors');
    allValid = false;
  } else {
    success('No hardcoded text-white colors found');
  }

  // Check for theme-aware colors
  if (content.includes('text-text-primary')) {
    success('Uses text-text-primary for heading');
  } else {
    error('Missing text-text-primary for heading');
    allValid = false;
  }

  if (content.includes('text-text-secondary')) {
    success('Uses text-text-secondary for subtitle');
  } else {
    error('Missing text-text-secondary for subtitle');
    allValid = false;
  }

  return allValid;
}

/**
 * Verify blog image uses full-width container
 */
function verifyBlogImageMargins() {
  section('3. Blog Image Margins');
  const blogSlugPath = path.join(PROJECT_ROOT, 'src', 'pages', 'blog', '[slug].astro');

  if (!fs.existsSync(blogSlugPath)) {
    error('blog/[slug].astro not found');
    return false;
  }

  const content = fs.readFileSync(blogSlugPath, 'utf-8');
  let allValid = true;

  // Check Container size is 'full' not 'default'
  if (content.includes('size="full"')) {
    success('Container uses size="full" for edge-to-edge display');
  } else if (content.includes('size="default"')) {
    error('Container still uses size="default" - will have white margins at wide resolutions');
    allValid = false;
  } else {
    // Check if Container exists but size prop is different
    const containerMatch = content.match(/Container[^>]*size="([^"]+)"/);
    if (containerMatch) {
      if (containerMatch[1] === 'full') {
        success('Container uses size="full" for edge-to-edge display');
      } else {
        error(`Container uses size="${containerMatch[1]}" - should be "full"`);
        allValid = false;
      }
    } else {
      error('Could not determine Container size prop');
      allValid = false;
    }
  }

  // Verify OptimizedImage component has proper sizing
  const optimizedImagePath = path.join(
    PROJECT_ROOT,
    'src',
    'components',
    'ui',
    'OptimizedImage.astro',
  );

  if (fs.existsSync(optimizedImagePath)) {
    const optimizedContent = fs.readFileSync(optimizedImagePath, 'utf-8');
    if (optimizedContent.includes('w-full') && optimizedContent.includes('h-full')) {
      success('OptimizedImage component has w-full and h-full classes');
    } else {
      error('OptimizedImage component missing w-full or h-full classes');
      allValid = false;
    }
  }

  return allValid;
}

/**
 * Verify docs page has language-specific icons
 */
function verifyDocsIcons() {
  section('4. Docs Page SDK Icons');
  const docsPath = path.join(PROJECT_ROOT, 'src', 'pages', 'docs', 'index.astro');

  if (!fs.existsSync(docsPath)) {
    error('docs/index.astro not found');
    return false;
  }

  const content = fs.readFileSync(docsPath, 'utf-8');
  let allValid = true;

  // Check that language icons are imported
  const requiredIcons = [
    'JavaScriptIcon',
    'PythonIcon',
    'RubyIcon',
    'GoIcon',
    'PhpIcon',
    'JavaIcon',
  ];

  for (const icon of requiredIcons) {
    if (content.includes(icon)) {
      success(`${icon} is imported/used`);
    } else {
      error(`${icon} not found in docs page`);
      allValid = false;
    }
  }

  // Check that language icons are used
  const languageIconCount = requiredIcons.filter((icon) => content.includes(icon)).length;

  if (languageIconCount >= 6) {
    success('All 6 language-specific icons are present');
  } else {
    error(`Only ${languageIconCount}/6 language icons found`);
    allValid = false;
  }

  // Verify LanguageIcons component exists
  const languageIconsPath = path.join(
    PROJECT_ROOT,
    'src',
    'components',
    'icons',
    'LanguageIcons.tsx',
  );

  if (fs.existsSync(languageIconsPath)) {
    success('LanguageIcons.tsx component exists');
  } else {
    error('LanguageIcons.tsx component not found');
    allValid = false;
  }

  return allValid;
}

/**
 * Verify LegalHero has enhanced titles
 */
function verifyLegalHero() {
  section('5. Legal Hero Enhanced Titles');
  const legalHeroPath = path.join(PROJECT_ROOT, 'src', 'components', 'sections', 'LegalHero.tsx');

  if (!fs.existsSync(legalHeroPath)) {
    error('LegalHero.tsx not found');
    return false;
  }

  const content = fs.readFileSync(legalHeroPath, 'utf-8');
  let allValid = true;

  // Check for gradient text effect
  if (content.includes('bg-gradient-to-r') && content.includes('from-primary-')) {
    success('Has gradient text effect');
  } else {
    error('Missing gradient text effect');
    allValid = false;
  }

  // Check for page type badges/icons
  if (content.includes('Shield') && content.includes('FileText')) {
    success('Has page type icons (Shield and FileText)');
  } else {
    error('Missing page type icons');
    allValid = false;
  }

  // Check for badge/label
  if (content.includes('Legal Document') || content.includes('Legal Agreement')) {
    success('Has legal page type badges');
  } else {
    error('Missing legal page type badges');
    allValid = false;
  }

  // Check for dark mode support
  if (content.includes('dark:from-primary-') || content.includes('dark:to-secondary-')) {
    success('Has dark mode gradient support');
  } else {
    error('Missing dark mode gradient support');
    allValid = false;
  }

  return allValid;
}

/**
 * Run all verification checks
 */
async function main() {
  console.log(`${colors.bold}UI Fixes Verification Script${colors.reset}`);
  console.log('Verifying all 5 UI fixes are properly implemented...\n');

  const results = {
    investorLogos: verifyInvestorLogos(),
    changelogColors: verifyChangelogColors(),
    blogMargins: verifyBlogImageMargins(),
    docsIcons: verifyDocsIcons(),
    legalHero: verifyLegalHero(),
  };

  // Summary
  console.log(`\n${colors.bold}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.bold}VERIFICATION SUMMARY${colors.reset}`);
  console.log(`${'='.repeat(50)}`);

  const allPassed = Object.values(results).every((result) => result === true);

  for (const [check, passed] of Object.entries(results)) {
    const status = passed
      ? `${colors.green}✓ PASS${colors.reset}`
      : `${colors.red}✗ FAIL${colors.reset}`;
    console.log(`${check.padEnd(20)} ${status}`);
  }

  console.log(`${'='.repeat(50)}`);

  if (allPassed) {
    console.log(
      `\n${colors.green}${colors.bold}✓ All UI fixes verified successfully!${colors.reset}\n`,
    );
    process.exit(0);
  } else {
    console.log(
      `\n${colors.red}${colors.bold}✗ Some verifications failed. Please review the errors above.${colors.reset}\n`,
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
