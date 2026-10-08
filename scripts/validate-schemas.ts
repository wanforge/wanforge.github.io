/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const DIST_DIR = './dist';

/**
 * Validates JSON-LD schemas in the built HTML files.
 */
async function validateSchemas() {
  console.log('🔍 Validating JSON-LD schemas...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`❌ Build directory ${DIST_DIR} not found. Please run 'bun run build' first.`);
    process.exit(1);
  }

  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  console.log(`📄 Found ${htmlFiles.length} HTML files.`);

  let totalSchemas = 0;
  let invalidSchemas = 0;
  const foundTypes = new Set<string>();

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const jsonLdScripts = extractJsonLd(content);

    if (jsonLdScripts.length > 0) {
      for (const script of jsonLdScripts) {
        totalSchemas++;
        try {
          const schema = JSON.parse(script) as Record<string, unknown>;
          const validationError = validateSchemaObject(schema, file);
          if (validationError) {
            console.error(`  ❌ Invalid schema in ${file}: ${validationError}`);
            invalidSchemas++;
          } else {
            const type = schema['@type'];
            if (type) {
              if (Array.isArray(type)) {
                type.forEach((t: unknown) => {
                  if (typeof t === 'string') foundTypes.add(t);
                });
              } else if (typeof type === 'string') {
                foundTypes.add(type);
              }
            }
          }
        } catch (e) {
          console.error(`  ❌ Failed to parse JSON-LD in ${file}: ${(e as Error).message}`);
          invalidSchemas++;
        }
      }
    }
  }

  console.log('\n📊 Validation Summary:');
  console.log(`  - Total schemas found: ${totalSchemas}`);
  console.log(`  - Invalid schemas: ${invalidSchemas}`);
  console.log(`  - Unique types found: ${Array.from(foundTypes).join(', ')}`);

  const requiredTypes = ['Organization', 'Product', 'BlogPosting', 'FAQPage'];
  const missingTypes = requiredTypes.filter((type) => {
    if (type === 'BlogPosting') {
      return !foundTypes.has('BlogPosting') && !foundTypes.has('Article');
    }
    return !foundTypes.has(type);
  });

  if (missingTypes.length > 0) {
    console.warn(`  ⚠️ Missing required types in the entire site: ${missingTypes.join(', ')}`);
  }

  if (invalidSchemas > 0) {
    console.error('\n❌ Schema validation failed.');
    process.exit(1);
  } else {
    console.log('\n✅ All schemas are valid!');
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

function extractJsonLd(html: string): string[] {
  const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const matches: string[] = [];
  let match;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    if (match[1]) {
      matches.push(match[1]);
    }
  }
  return matches;
}

interface SchemaObject {
  '@context'?: unknown;
  '@type'?: string | string[];
  [key: string]: unknown;
}

function validateSchemaObject(schema: SchemaObject, _fileName: string): string | null {
  if (!schema['@context']) return 'Missing @context';
  if (!schema['@type']) return 'Missing @type';

  const type = schema['@type'];

  if (type === 'Organization') {
    if (!schema.name) return 'Organization missing name';
    if (!schema.url) return 'Organization missing url';
    if (!schema.logo) return 'Organization missing logo';
  }

  if (type === 'WebSite') {
    if (!schema.name) return 'WebSite missing name';
    if (!schema.url) return 'WebSite missing url';
  }

  if (type === 'Product') {
    if (!schema.name) return 'Product missing name';
    if (!schema.description) return 'Product missing description';
    if (!schema.offers) return 'Product missing offers';
  }

  if (type === 'Article' || type === 'BlogPosting') {
    if (!schema.headline) return `${type as string} missing headline`;
    if (!schema.author) return `${type as string} missing author`;
    if (!schema.datePublished) return `${type as string} missing datePublished`;
    if (!schema.image) return `${type as string} missing image`;
  }

  if (type === 'FAQPage') {
    if (!schema.mainEntity) return 'FAQPage missing mainEntity';
    if (!Array.isArray(schema.mainEntity)) return 'FAQPage mainEntity must be an array';
    if (schema.mainEntity.length === 0) return 'FAQPage mainEntity is empty';

    for (const item of schema.mainEntity as Record<string, unknown>[]) {
      if (item['@type'] !== 'Question') return 'FAQPage item must be @type Question';
      if (!item.name) return 'FAQPage question missing name';
      if (!item.acceptedAnswer) return 'FAQPage question missing acceptedAnswer';
      const answer = item.acceptedAnswer as Record<string, unknown>;
      if (answer['@type'] !== 'Answer') return 'FAQPage answer must be @type Answer';
      if (!answer.text) return 'FAQPage answer missing text';
    }
  }

  if (type === 'BreadcrumbList') {
    if (!schema.itemListElement) return 'BreadcrumbList missing itemListElement';
    if (!Array.isArray(schema.itemListElement))
      return 'BreadcrumbList itemListElement must be an array';
  }

  if (type === 'Person') {
    if (!schema.name) return 'Person missing name';
  }

  return null;
}

validateSchemas().catch((err) => {
  console.error(err);
  process.exit(1);
});
