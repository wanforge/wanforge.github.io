/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const DIST_DIR = './dist';

/**
 * Determines the base path for verification, matching astro.config.mjs logic
 */
const getBasePath = () => {
  if (process.env.GITHUB_PAGES === 'true') {
    const repo = process.env.GITHUB_REPOSITORY;
    if (repo) {
      const [, repoName] = repo.split('/');
      return repoName ? `/${repoName}` : '/';
    }
  }
  return process.env.BASE_PATH || '/ModernSaaS-LandingPage-Template';
};

const BASE_PATH = getBasePath();
const verifiedAssets = new Set<string>();
const pageIdCache = new Map<string, Set<string>>();

/**
 * Demo link patterns to ignore (should match src/config/demoLinks.ts)
 */
const DEMO_PATTERNS = [
  '/signup',
  '/login',
  '/auth/',
  '/oauth/',
  '/signin',
  '/dashboard',
  '/app/',
  '/admin/',
  '/settings',
  '/account',
  '/profile',
  '/careers/',
  '/integrations/',
  '/connect/',
  '/api/setup',
  '/forgot-password/',
  '/docs/',
  '/docs/api/',
  '/demo/video',
];

function isDemoLink(href: string): boolean {
  // Normalize href for checking
  const normalizedHref = href.startsWith(BASE_PATH) ? href.replace(BASE_PATH, '') : href;

  return DEMO_PATTERNS.some((pattern) => normalizedHref.includes(pattern));
}

/**
 * Verifies the deployment by checking for broken links and missing assets in the build output.
 */
async function verifyDeployment() {
  console.log('🚀 Starting deployment verification...');
  console.log(`📍 Base path: ${BASE_PATH}`);

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`❌ Build directory ${DIST_DIR} not found. Please run 'bun run build' first.`);
    process.exit(1);
  }

  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  console.log(`📄 Found ${htmlFiles.length} HTML files to verify.`);

  let errorCount = 0;

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const dom = new JSDOM(content);
    const { document } = dom.window;

    const relativePath = path.relative(DIST_DIR, file);
    // console.log(`\n🔍 Verifying ${relativePath}...`);

    // Collect all IDs in the document for hash verification
    const allIds = new Set(Array.from(document.querySelectorAll('[id]')).map((el) => el.id));

    // Check Links
    const links = Array.from(document.querySelectorAll('a[href]'));
    for (const link of links as HTMLAnchorElement[]) {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) continue;

      if (isInternal(href)) {
        if (isDemoLink(href)) {
          // Skip verification for demo links as they trigger modals
          continue;
        }

        const parts = href.split('#');
        const pathPart = parts[0] as string;
        const hashPart = parts[1];

        if (!verifyInternalPath(pathPart, file)) {
          console.error(`  ❌ Broken link in ${relativePath}: ${href}`);
          errorCount++;
          continue;
        }

        // Verify hash if present
        if (hashPart) {
          if (
            !pathPart ||
            pathPart === '/' ||
            pathPart === BASE_PATH ||
            pathPart === `${BASE_PATH}/`
          ) {
            // Check in current file if it's index.html, or if path is empty
            const isRoot =
              pathPart === '/' || pathPart === BASE_PATH || pathPart === `${BASE_PATH}/`;
            const isCurrentFileIndex = relativePath === 'index.html';

            if (!pathPart || (isRoot && isCurrentFileIndex)) {
              if (!allIds.has(hashPart)) {
                console.error(`  ❌ Broken anchor in ${relativePath}: #${hashPart}`);
                errorCount++;
              }
            } else {
              // Hash on another page
              if (!verifyAnchorOnPage(pathPart, hashPart, file)) {
                console.error(`  ❌ Broken anchor in ${relativePath}: ${href}`);
                errorCount++;
              }
            }
          }
        }
      }
    }

    // Check Images
    const images = Array.from(document.querySelectorAll('img[src], source[srcset]'));
    for (const img of images as HTMLElement[]) {
      const src = img.getAttribute('src');
      const srcset = img.getAttribute('srcset');

      const urls = [];
      if (src) urls.push(src);
      if (srcset) {
        // Handle srcset (might have multiple URLs)
        const srcsetUrls = srcset.split(',').map((u) => u.trim().split(' ')[0]);
        urls.push(...srcsetUrls);
      }

      for (const url of urls) {
        if (url && isInternal(url) && !url.startsWith('data:')) {
          if (!verifyAsset(url, file)) {
            console.error(`  ❌ Missing image in ${relativePath}: ${url}`);
            errorCount++;
          }
        }
      }
    }

    // Check CSS
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    for (const style of styles as HTMLLinkElement[]) {
      const href = style.getAttribute('href');
      if (href && isInternal(href)) {
        if (!verifyAsset(href, file)) {
          console.error(`  ❌ Missing stylesheet in ${relativePath}: ${href}`);
          errorCount++;
        }
      }
    }

    // Check JS
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    for (const script of scripts as HTMLScriptElement[]) {
      const src = script.getAttribute('src');
      if (src && isInternal(src)) {
        if (!verifyAsset(src, file)) {
          console.error(`  ❌ Missing script in ${relativePath}: ${src}`);
          errorCount++;
        }
      }
    }
  }

  console.log('\n📊 Verification Summary:');
  if (errorCount > 0) {
    console.error(`❌ Deployment verification failed with ${errorCount} errors.`);
    process.exit(1);
  } else {
    console.log('✅ Deployment verification passed! No 404s found.');
  }
}

function getAllHtmlFiles(dir: string): string[] {
  let files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getAllHtmlFiles(path.join(dir, item.name))];
    } else if (item.name.endsWith('.html')) {
      files.push(path.join(dir, item.name));
    }
  }
  return files;
}

function isInternal(url: string): boolean {
  return (
    !url.startsWith('http') &&
    !url.startsWith('//') &&
    !url.startsWith('mailto:') &&
    !url.startsWith('tel:') &&
    !url.startsWith('javascript:') &&
    !url.startsWith('data:')
  );
}

function verifyAnchorOnPage(pathPart: string, hashPart: string, currentFile: string): boolean {
  const absolutePath = getAbsolutePath(pathPart, currentFile);
  if (!absolutePath) return false;

  let targetHtmlFile: string;
  if (fs.existsSync(absolutePath)) {
    if (fs.statSync(absolutePath).isDirectory()) {
      targetHtmlFile = path.join(absolutePath, 'index.html');
    } else {
      targetHtmlFile = absolutePath;
    }
  } else if (fs.existsSync(`${absolutePath}.html`)) {
    targetHtmlFile = `${absolutePath}.html`;
  } else if (fs.existsSync(path.join(absolutePath, 'index.html'))) {
    targetHtmlFile = path.join(absolutePath, 'index.html');
  } else {
    return false;
  }

  if (!fs.existsSync(targetHtmlFile)) return false;

  let ids = pageIdCache.get(targetHtmlFile);
  if (!ids) {
    const content = fs.readFileSync(targetHtmlFile, 'utf-8');
    const dom = new JSDOM(content);
    const { document } = dom.window;
    ids = new Set(Array.from(document.querySelectorAll('[id]')).map((el) => el.id));
    pageIdCache.set(targetHtmlFile, ids);
  }

  return ids.has(hashPart);
}

function getAbsolutePath(href: string, currentFile: string): string | null {
  const cleanPath = href.split('#')[0];
  if (!cleanPath && href.includes('#')) {
    return currentFile;
  }
  if (!cleanPath) return null;

  if (cleanPath === '/' || cleanPath === BASE_PATH || cleanPath === `${BASE_PATH}/`) {
    return path.join(DIST_DIR, 'index.html');
  }

  if (cleanPath.startsWith(BASE_PATH)) {
    return path.join(DIST_DIR, cleanPath.replace(BASE_PATH, ''));
  } else if (cleanPath.startsWith('/')) {
    return path.join(DIST_DIR, cleanPath);
  } else {
    return path.resolve(path.dirname(currentFile), cleanPath);
  }
}

function verifyInternalPath(href: string, currentFile: string): boolean {
  const absolutePath = getAbsolutePath(href, currentFile);
  if (!absolutePath) return true; // Just a hash

  // Check if it's a file or a directory with index.html
  if (fs.existsSync(absolutePath)) {
    if (fs.statSync(absolutePath).isDirectory()) {
      return fs.existsSync(path.join(absolutePath, 'index.html'));
    }
    return true;
  }

  // Check if appending /index.html works (for directory-style links like /about/)
  if (fs.existsSync(path.join(absolutePath, 'index.html'))) return true;

  // Check if it's a file that ends with .html but link omitted it
  if (fs.existsSync(`${absolutePath}.html`)) return true;

  return false;
}

function verifyAsset(src: string, currentFile: string): boolean {
  // Remove query params
  const cleanSrc = src.split('?')[0];
  if (!cleanSrc) return true;

  if (verifiedAssets.has(cleanSrc)) return true;

  let absolutePath: string;
  if (cleanSrc.startsWith(BASE_PATH)) {
    absolutePath = path.join(DIST_DIR, cleanSrc.replace(BASE_PATH, ''));
  } else if (cleanSrc.startsWith('/')) {
    absolutePath = path.join(DIST_DIR, cleanSrc);
  } else {
    absolutePath = path.resolve(path.dirname(currentFile), cleanSrc);
  }

  const exists = fs.existsSync(absolutePath);
  if (exists) {
    verifiedAssets.add(cleanSrc);
    return true;
  }
  return false;
}

verifyDeployment().catch((err) => {
  console.error(err);
  process.exit(1);
});
