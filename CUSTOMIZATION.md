# Customization Guide

This guide provides detailed instructions for fully adapting the ModernSaaS
Landing Page Template to your brand and product requirements.

## Table of Contents

1. [Quick Customization](#quick-customization)
2. [Branding & Configuration](#branding--configuration)
3. [Theme Customization](#theme-customization)
4. [Typography](#typography)
5. [Content Management](#content-management)
6. [Component Customization](#component-customization)
7. [Adding New Pages](#adding-new-pages)
8. [Modifying Sections](#modifying-sections)
9. [Animations & Motion](#animations--motion)
10. [Path Management](#path-management)

---

## Quick Customization

For rapid customization, focus on these three files:

| File                    | Purpose                                            |
| ----------------------- | -------------------------------------------------- |
| `src/config/site.ts`    | Company info, social links, SEO, feature flags     |
| `src/styles/tokens.css` | Colors, fonts, spacing tokens                      |
| `src/data/*.ts`         | All page content (features, pricing, testimonials) |

---

## Branding & Configuration

The primary branding configuration is centralized in `src/config/site.ts`. This
file controls the company name, social links, contact info, and SEO defaults
used across the entire site.

### Company Information

Update the `company` constant to change your product's identity:

```typescript
// src/config/site.ts
export const company = {
  name: 'YourProduct',
  tagline: 'The ultimate solution for X',
  shortDescription: 'Describe your product in one or two sentences.',
  foundedYear: 2026,
  // ...
} as const;
```

### Social Links & Contact

Update your social media profiles and contact information:

```typescript
// src/config/site.ts
export const social = {
  twitter: 'https://twitter.com/yourhandle',
  github: 'https://github.com/yourorg',
  linkedin: 'https://linkedin.com/company/yourcompany',
  // ...
} as const;

export const contact = {
  email: 'hello@yourproduct.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, City, Country',
} as const;
```

### Feature Flags

Enable or disable entire site features via `featureFlags`:

```typescript
// src/config/site.ts
export const featureFlags = {
  newsletter: true,
  liveChat: false, // Disables the chat widget
  darkMode: true,
  demoMode: true, // If true, placeholder links trigger "Demo Modal"
  search: true,
} as const;
```

---

## Theme Customization

The template uses a robust CSS variable system defined in
`src/styles/tokens.css`. It follows a three-tier hierarchy: **Primitive →
Semantic → Component**.

### Color Palette

To change your brand colors, modify the **Primitive Tokens**:

```css
/* src/styles/tokens.css */
:root {
  /* Primary - Change these to your brand's primary color */
  --primitive-color-primary-50: #eff6ff;
  --primitive-color-primary-100: #dbeafe;
  --primitive-color-primary-500: #3b82f6;
  --primitive-color-primary-600: #2563eb;
  --primitive-color-primary-900: #1e3a8a;

  /* Secondary - Change these to your secondary brand color */
  --primitive-color-secondary-500: #a855f7;
  --primitive-color-secondary-600: #9333ea;
}
```

### Dark Mode

Dark mode colors are defined in the `.dark` class block in `tokens.css`.
Semantic tokens automatically switch based on the active theme:

```css
/* src/styles/tokens.css */
.dark {
  --token-bg-primary: var(--primitive-color-gray-950);
  --token-bg-secondary: var(--primitive-color-gray-900);
  --token-text-primary: var(--primitive-color-gray-50);
  --token-text-secondary: var(--primitive-color-gray-400);
}
```

### CSS Variables Overview

| Variable Type | Prefix          | Example                         | Usage                               |
| ------------- | --------------- | ------------------------------- | ----------------------------------- |
| Primitive     | `--primitive-*` | `--primitive-color-primary-500` | Raw color values                    |
| Semantic      | `--token-*`     | `--token-bg-primary`            | Contextual colors (adapts to theme) |
| Component     | `--component-*` | `--component-button-radius`     | Component-specific values           |

---

## Typography

The template uses **Inter** as the default sans-serif font.

### Changing Fonts

1. Import your new font in `src/layouts/Layout.astro` or via CSS.
2. Update the font tokens in `src/styles/tokens.css`:

```css
/* src/styles/tokens.css */
:root {
  --font-family-sans: 'YourNewFont', system-ui, -apple-system, sans-serif;
  --font-family-mono: 'YourNewMono', 'Fira Code', monospace;
}
```

### Type Scale

Adjust the modular type scale by modifying the font size tokens:

```css
:root {
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-4xl: 2.25rem; /* 36px */
  --font-size-6xl: 3.75rem; /* 60px */
}
```

---

## Content Management

All site content (text, testimonials, pricing, features) is stored in
`src/data/`. This allows you to update the site content without touching the UI
code.

### Data Files Reference

| Data File         | Content Controlled                                 |
| ----------------- | -------------------------------------------------- |
| `features.ts`     | Feature lists, bento grid content, zigzag sections |
| `pricing.ts`      | Pricing tiers, billing cycles, feature comparisons |
| `testimonials.ts` | Customer quotes, avatars, company names, ratings   |
| `team.ts`         | Team member profiles, photos, roles, bios          |
| `integrations.ts` | Integration partners, logos, descriptions          |
| `faq.ts`          | Frequently asked questions and answers             |
| `navigation.ts`   | Header and footer link structures                  |
| `blog.ts`         | Static blog metadata                               |

### Example: Updating Features

```typescript
// src/data/features.ts
export const features = [
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description:
      'Get deep insights into your data with our powerful analytics dashboard.',
    icon: 'BarChart',
  },
  // Add or modify features here
];
```

### Example: Updating Pricing

```typescript
// src/data/pricing.ts
export const pricingTiers = [
  {
    name: 'Starter',
    price: { monthly: 9, yearly: 90 },
    description: 'Perfect for individuals and small projects.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  // Add or modify tiers here
];
```

---

## Component Customization

Components are built using React and Tailwind CSS v4. They are located in
`src/components/`.

### Reusable UI Components

Most UI components accept a `variant`, `size`, and `className` prop for easy
styling:

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg" className="rounded-full shadow-lg">
  Get Started
</Button>;
```

### Component Structure

```
src/components/
├── layout/          # Layout components (Header, Footer)
├── sections/        # Page sections (Hero, Features, Pricing, etc.)
└── ui/              # Reusable UI components (Button, Card, Modal, etc.)
```

### Modifying Component Styles

Component-specific styles are usually handled via Tailwind classes within the
component file. For example, to change the default button radius globally,
update `Button.tsx`:

```tsx
// src/components/ui/Button.tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors...',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
        // ...
      },
    },
  },
);
```

---

## Adding New Pages

The template uses **Astro's file-based routing**.

### Creating a New Page

1. Create a new `.astro` file in `src/pages/` (e.g.,
   `src/pages/new-page.astro`).
2. Wrap your content with the `Layout` component:

```astro
---
import Layout from '../layouts/Layout.astro';
import { Container } from '../components/ui';
import { Section } from '../components/ui';
---

<Layout title="New Page | ModernSaaS">
  <Section>
    <Container>
      <h1 class="text-4xl font-bold">New Page Content</h1>
      <p class="mt-4 text-lg text-text-secondary">Your content goes here.</p>
    </Container>
  </Section>
</Layout>
```

### Dynamic Routes

For dynamic content like blog posts:

```
src/pages/blog/
├── index.astro       # Blog listing page
└── [slug].astro      # Individual blog post (dynamic route)
```

---

## Modifying Sections

Sections are modular components located in `src/components/sections/`. Each
section typically maps to one part of a page (e.g., `Hero`, `Features`,
`Pricing`).

### Available Sections

| Section      | File               | Description                       |
| ------------ | ------------------ | --------------------------------- |
| Hero         | `Hero.tsx`         | Main landing hero with CTA        |
| Features     | `Features.tsx`     | Feature grid or zigzag layout     |
| Pricing      | `Pricing.tsx`      | Pricing cards with toggle         |
| Testimonials | `Testimonials.tsx` | Customer testimonials slider/grid |
| FAQ          | `FAQ.tsx`          | Accordion-style FAQ section       |
| CTA          | `CTA.tsx`          | Call-to-action banner             |
| Footer       | `Footer.tsx`       | Site footer with links            |

### Modifying the Hero Section

To change the layout of the homepage Hero:

1. Open `src/components/sections/Hero.tsx`.
2. Modify the JSX/Tailwind classes.
3. Update the data being passed from `src/pages/index.astro`.

---

## Animations & Motion

Animations are powered by **Motion One** (Web Animations API).

### Changing Entrance Animations

Entrance animations are defined in individual components using the `motion`
component:

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Content
</motion.div>;
```

### Scroll-Triggered Animations

Use the `whileInView` prop for scroll-triggered animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6 }}
>
  Content appears on scroll
</motion.div>
```

### Global Motion Preferences

Reduced motion is automatically respected. You can check the user's preference
using the `useReducedMotion` hook:

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

const prefersReducedMotion = useReducedMotion();

// Conditionally disable animations
<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1 }}
>
```

---

## Path Management

The template supports deployment to subdirectories (common for GitHub Pages).

### Internal Links

Always use the `Link` component or the `resolveHref` utility to ensure paths are
correctly prefixed with the project base path:

```tsx
import { Link } from '@/components/ui';
import { resolveHref } from '@/config/paths';

// Using Link component
<Link href="/features">Features</Link>;

// Using resolveHref utility
const path = resolveHref('/features');
// Returns: "/ModernSaaS-LandingPage-Template/features"
```

### Asset Paths

Use `getAssetPath` or `getImagePath` for any local assets:

```tsx
import { getImagePath } from '@/config/paths';

const logoSrc = getImagePath('logo.svg');
// Handles base path and subdirectory automatically
```

### Configuration

Path configuration is centralized in `src/config/paths.ts`. The `base` path is
automatically detected from:

1. `BASE_PATH` environment variable
2. GitHub Actions context (`GITHUB_PAGES` env var)
3. Defaults to `/` for local development

---

## Deployment

For detailed deployment instructions, see the
[README.md](./README.md#deployment).

---

<div align="center">

**Need more help?** Open an issue on GitHub!

</div>
