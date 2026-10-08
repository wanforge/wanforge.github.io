# WANFORGE modern SaaS landing design

## Goal

Create the WANFORGE public site from the MIT-licensed `MasuRii/ModernSaaS-LandingPage-Template` Astro template. Publish with existing GitHub Pages configuration: `gh-pages` serves `https://wanforge.asia/`.

## Audience

Indonesian companies and product teams needing a technical partner for web applications, infrastructure, AI workflows, connected devices, or security work. English-speaking visitors receive equivalent English content.

## Information architecture

- `/`: Indonesian landing page.
- `/en/`: English landing page.
- Shared navigation: Services, Capabilities, Contact, language switcher, GitHub.
- Shared footer: service links, GitHub, WhatsApp, privacy/terms only if template requires them.

No founder profile, CV, pricing table, fabricated testimonials, customer logos, case-study metrics, or unverified performance/security claims.

## Content

### Positioning

WANFORGE is an engineering and product studio. It turns operational needs into web products, apps, infrastructure, automation, and integrated systems.

### Services

1. Web and application engineering.
2. Cloud, DevOps, and delivery infrastructure.
3. AI systems, MCP tooling, and workflow automation.
4. IoT, hardware integration, and authorized security assessments.

### Calls to action

- Primary: WhatsApp `https://wa.me/62816658056`.
- Secondary: `https://github.com/wanforge`.
- Copy asks visitors to send project goals, constraints, and expected timeline.

## Visual direction

Keep template’s responsive layout, accessibility primitives, and light/dark mode. Replace ModernSaaS name, generic icons, copy, illustration treatment, and metadata with WANFORGE identity. Use WANFORGE dark navy as primary ink, deep red as action color, white/near-white surfaces, and existing WANFORGE favicon where compatible. Avoid generic SaaS claims and decorative data cards not backed by evidence.

## Technical plan

- Import upstream template source into `main` while preserving this repository remote/history.
- Retain upstream Astro/TypeScript tooling and existing test/build scripts.
- Add bilingual routes using Astro pages/content, without a client-side language state dependency.
- Configure static production build for root-domain GitHub Pages.
- Build output is published to existing `gh-pages`; retain its CNAME `wanforge.asia`.
- Do not move production source into `gh-pages`.

## Verification

- Dependency install succeeds from upstream lockfile.
- Formatting, tests, type checks, and production build commands offered by template exit 0.
- Generated output contains both `/index.html` and `/en/index.html`.
- Publish generated output to `gh-pages` from a committed `main` revision.
- GitHub Pages API remains configured for `gh-pages`, custom domain `wanforge.asia`, HTTPS enabled.
- HTTP verification confirms homepage returns 200 after deployment propagation.

## Scope boundaries

No CMS, contact-form backend, analytics IDs, database, auth, customer portal, or migration of legacy posts in this pass.
