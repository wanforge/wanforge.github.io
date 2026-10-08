# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- **Investor Logos** - Replaced generic placeholder logos with proper branded
  SVGs for Sequoia Capital, Andreessen Horowitz (a16z), Y Combinator, Accel
  Partners, Greylock Partners, and Angel Investors. All logos use `currentColor`
  for automatic light/dark theme compatibility.
- **Changelog Text Visibility** - Fixed hardcoded `text-white` colors in
  ChangelogHero component to use theme-aware `text-text-primary` and
  `text-text-secondary` classes, ensuring proper visibility in both light and
  dark modes with WCAG AA compliant contrast ratios (~12:1).
- **Blog Image White Margins** - Resolved white margin issue at ultra-wide
  resolutions (>1920px) by changing Container size from `default` to `full` in
  blog post pages. Added `w-full h-full` classes to OptimizedImage component for
  proper container filling.
- **Docs Page SDK Icons** - Replaced generic `Code` icon with language-specific
  icons (JavaScript, Python, Ruby, Go, PHP, Java) in the documentation SDK
  section. Created `LanguageIcons.tsx` component with custom SVG icons using
  `currentColor` for theme support.

### Enhanced

- **Privacy/Terms Page Titles** - Improved visual presentation of LegalHero
  component with gradient text effects
  (`bg-gradient-to-r from-primary-600 to-secondary-600`), dynamic page type
  badges (Shield icon for Privacy Policy, FileText icon for Terms of Service),
  and responsive typography. All enhancements support both light and dark modes.
- **Mobile Navigation** - Optimized width with
  `max-w-[min(24rem,calc(100vw-2rem))]` and added safe area insets for header
  and footer padding.
- **Section Components** - Enhanced mobile-first responsive design across all
  sections with center-aligned content on mobile, left-align on desktop.
- **Category Filter** - Added `touch-pan-x` for smoother horizontal scrolling on
  mobile.

## [0.1.0] - 2026-02-12

### Added

#### Core Architecture

- Built with Astro 5 for high-performance static generation
- React 19 integration for interactive "islands"
- Tailwind CSS v4 for utility-first styling
- Bun as the primary package manager and runner

#### Design & UI

- Modern 2026 design trends (glassmorphism, bento grids, gradients)
- First-class dark mode support with system preference detection and persistence
- Fully responsive layouts for all devices (320px to ultra-wide)
- High-performance animations using Motion One
- Accessible UI primitives using Radix UI

#### Pages & Sections

- Comprehensive Homepage with 12 sections
- Features page with zigzag layouts and comparison tables
- Conversion-optimized Pricing page with billing toggle
- About page with company story, values, and team
- Blog system with search, category filtering, and pagination
- Interactive Demo Link modals for placeholder functionality
- Functional Contact, Login, and Signup mockup forms
- Documentation page with SDK examples
- Legal pages (Privacy Policy, Terms of Service)

#### SEO & Performance

- Optimized Core Web Vitals (Perfect Lighthouse scores)
- JSON-LD Structured Data (FAQ, Person, Organization, Article)
- Automatic sitemap and robots.txt generation
- Image optimization pipeline using Sharp

#### Testing & Quality

- 1,100+ Unit tests using Vitest
- Comprehensive E2E suite using Playwright (Cross-browser, Responsive, User
  Journeys)
- Visual regression testing with Playwright screenshots
- Automated accessibility audits using Axe-core
- Performance monitoring with Lighthouse CI
- Deployment verification scripts for broken links and assets

#### DevOps & Documentation

- GitHub Actions workflow for automated GitHub Pages deployment
- Centralized path management for subdirectory support
- SPA routing strategy for GitHub Pages (404.html redirect)
- Comprehensive README with customization, configuration, and testing guides
- Customization Guide for detailed branding instructions
- Contributing Guidelines with Git Flow strategy

### Fixed

- Resolved hydration mismatches in SEO schemas and complex forms
- Fixed path resolution issues for GitHub Pages subdirectories
- Corrected color contrast violations for WCAG AA compliance
- Fixed layout overflows and responsiveness bugs on small viewports
- Standardized trailing slash behavior across all internal links

---

## Version History Format

```
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Now removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```
