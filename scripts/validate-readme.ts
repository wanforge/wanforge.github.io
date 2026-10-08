import fs from 'fs';
import path from 'path';

const README_PATH = path.join(process.cwd(), 'README.md');

const REQUIRED_SECTIONS = [
  'Features',
  'Tech Stack',
  'Project Structure',
  'Quick Start',
  'Customization',
  'Configuration',
  'Deployment',
  'Testing',
  'Screenshots',
  'License',
  'Credits',
];

const REQUIRED_PATTERNS = [
  {
    name: 'Live Demo Link',
    pattern: /\[!\[Live Demo\]\(.*\)\]\(.*\)/,
  },
  {
    name: 'Screenshots',
    pattern: /!\[.*\]\(.*docs\/screenshots\/.*\)/,
  },
  {
    name: 'Bun Instructions',
    pattern: /bun (install|run|test)/i,
  },
];

function validateReadme() {
  if (!fs.existsSync(README_PATH)) {
    console.error('README.md not found!');
    process.exit(1);
  }

  const content = fs.readFileSync(README_PATH, 'utf-8');
  const errors: string[] = [];

  // Check sections
  REQUIRED_SECTIONS.forEach((section) => {
    const sectionPattern = new RegExp(`##.*${section}`, 'i');
    if (!sectionPattern.test(content)) {
      errors.push(`Missing section: ## ${section}`);
    }
  });

  // Check patterns
  REQUIRED_PATTERNS.forEach(({ name, pattern }) => {
    if (!pattern.test(content)) {
      errors.push(`Missing or invalid: ${name}`);
    }
  });

  if (errors.length > 0) {
    console.error('README validation failed:');
    errors.forEach((err) => console.error(`- ${err}`));
    process.exit(1);
  } else {
    console.warn('README validation passed! All required sections and patterns found.');
  }
}

validateReadme();
