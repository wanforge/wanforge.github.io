# WANFORGE Modern SaaS Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish bilingual WANFORGE landing pages from the ModernSaaS Astro template.

**Architecture:** Replace empty `main` with pinned upstream template source while retaining repository identity. Convert template content to static bilingual Astro routes: Indonesian at `/` and English at `/en/`. Keep GitHub Pages production output isolated on existing `gh-pages`, where current CNAME remains.

**Tech Stack:** Astro, TypeScript, Tailwind CSS, Vitest, Playwright, GitHub Pages.

## Global Constraints

- Use `MasuRii/ModernSaaS-LandingPage-Template` source under MIT license.
- UI copy and documentation prose use Indonesian or English; no founder profile or Sugeng reference.
- Do not add dependencies unless existing upstream dependencies cannot perform task.
- Preserve `origin` remote and Git history.
- `main` holds source; `gh-pages` holds only built static output and existing `CNAME` for `wanforge.asia`.
- Remove pricing, testimonials, customer logos, fabricated metrics, and unverifiable performance/security claims.
- Primary CTA is `https://wa.me/62816658056`; secondary CTA is `https://github.com/wanforge`.
- Commit each independently testable task, push it, and end with clean worktree.

---

### Task 1: Import upstream template as source baseline

**Files:**
- Create: upstream tracked template files at repository root
- Preserve: `docs/superpowers/specs/2026-10-07-wanforge-modern-saas-design.md`
- Preserve: `docs/superpowers/plans/2026-10-07-wanforge-modern-saas.md`

**Interfaces:**
- Consumes: `https://github.com/MasuRii/ModernSaaS-LandingPage-Template` default branch at recorded commit SHA.
- Produces: runnable Astro project with upstream package scripts.

- [ ] **Step 1: Record upstream revision and inspect manifest**

Run:
```bash
git ls-remote https://github.com/MasuRii/ModernSaaS-LandingPage-Template.git refs/heads/main
git clone --depth 1 https://github.com/MasuRii/ModernSaaS-LandingPage-Template.git /home/wanforge/.hermes/cache/scratch/modern-saas-template
git -C /home/wanforge/.hermes/cache/scratch/modern-saas-template log -1 --format='%H %s'
node -e "const p=require('/home/wanforge/.hermes/cache/scratch/modern-saas-template/package.json'); console.log(p.scripts)"
```
Expected: a SHA and package scripts are printed.

- [ ] **Step 2: Copy tracked upstream project files without overwriting documentation**

Run:
```bash
rsync -a --delete \
  --exclude='.git' \
  --exclude='docs/superpowers/specs/2026-10-07-wanforge-modern-saas-design.md' \
  --exclude='docs/superpowers/plans/2026-10-07-wanforge-modern-saas.md' \
  /home/wanforge/.hermes/cache/scratch/modern-saas-template/ \
  /home/wanforge/www/wanforge.github.io/
```
Expected: root contains `astro.config.mjs`, `package.json`, `src/`, and `public/`.

- [ ] **Step 3: Add attribution note**

Create `ATTRIBUTION.md`:
```markdown
# Template attribution

This site starts from [ModernSaaS LandingPage Template](https://github.com/MasuRii/ModernSaaS-LandingPage-Template), licensed under MIT. WANFORGE content, configuration, and assets are maintained separately.
```

- [ ] **Step 4: Install and run baseline checks**

Run exact scripts discovered in Step 1, starting with:
```bash
npm ci
npm run lint
npm run test
npm run build
```
Expected: every available baseline command exits 0.

- [ ] **Step 5: Commit and push baseline**

Run:
```bash
git add -A
git commit -m 'feat: import modern SaaS landing template'
git push origin main
git status --short
```
Expected: empty status output.

### Task 2: Define shared WANFORGE content and bilingual navigation

**Files:**
- Create: `src/data/wanforge.ts`
- Modify: template navigation/header/footer components identified in Task 1
- Test: `src/data/wanforge.test.ts`

**Interfaces:**
- Produces `siteContent` with `id` and `en` keys.
- Each locale exposes `nav`, `hero`, `services`, `capabilities`, `contact`, and `footer` strings.
- Page components consume locale key `'id' | 'en'` and use only this module for WANFORGE copy and external links.

- [ ] **Step 1: Write failing content test**

Create `src/data/wanforge.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { siteContent } from './wanforge';

describe('siteContent', () => {
  it('has equivalent Indonesian and English service sets', () => {
    expect(siteContent.id.services).toHaveLength(4);
    expect(siteContent.en.services).toHaveLength(4);
    expect(siteContent.id.primaryCta.href).toBe('https://wa.me/62816658056');
    expect(siteContent.en.secondaryCta.href).toBe('https://github.com/wanforge');
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run:
```bash
npx vitest run src/data/wanforge.test.ts
```
Expected: FAIL because `./wanforge` does not exist.

- [ ] **Step 3: Implement minimal content module**

Create `src/data/wanforge.ts` exporting:
```ts
export type Locale = 'id' | 'en';

export const siteContent = {
  id: {
    nav: ['Layanan', 'Kapabilitas', 'Kontak'],
    primaryCta: { label: 'Mulai diskusi', href: 'https://wa.me/62816658056' },
    secondaryCta: { label: 'GitHub', href: 'https://github.com/wanforge' },
    hero: {
      title: 'Sistem digital yang siap bekerja.',
      description: 'WANFORGE merancang produk web, aplikasi, infrastruktur, otomasi, dan sistem terintegrasi untuk kebutuhan operasional yang nyata.',
    },
    services: [
      { title: 'Web & Aplikasi', description: 'Platform web, dashboard operasional, dan aplikasi yang mudah dipakai.' },
      { title: 'Cloud & DevOps', description: 'Deployment yang dapat diulang, server terkelola, dan alur rilis yang rapi.' },
      { title: 'AI & Otomasi', description: 'Sistem AI, MCP tooling, integrasi API, dan workflow untuk mengurangi kerja berulang.' },
      { title: 'IoT & Security', description: 'Integrasi perangkat, telemetry, dan asesmen keamanan yang berizin.' },
    ],
    capabilities: 'Dari kebutuhan operasional hingga sistem yang dapat dijalankan tim.',
    contact: 'Kirim tujuan proyek, batasan, dan perkiraan jadwal. Kami balas dengan langkah teknis yang jelas.',
    footer: 'WANFORGE — Engineering & Product Studio.',
  },
  en: {
    nav: ['Services', 'Capabilities', 'Contact'],
    primaryCta: { label: 'Start a conversation', href: 'https://wa.me/62816658056' },
    secondaryCta: { label: 'GitHub', href: 'https://github.com/wanforge' },
    hero: {
      title: 'Digital systems ready to work.',
      description: 'WANFORGE builds web products, applications, infrastructure, automation, and integrated systems for real operational needs.',
    },
    services: [
      { title: 'Web & Applications', description: 'Web platforms, operational dashboards, and applications people can use.' },
      { title: 'Cloud & DevOps', description: 'Repeatable deployment, managed servers, and disciplined release workflows.' },
      { title: 'AI & Automation', description: 'AI systems, MCP tooling, API integrations, and workflows that remove repetitive work.' },
      { title: 'IoT & Security', description: 'Device integration, telemetry, and authorized security assessments.' },
    ],
    capabilities: 'From operational requirements to systems teams can run.',
    contact: 'Send project goals, constraints, and expected timeline. We will reply with clear technical next steps.',
    footer: 'WANFORGE — Engineering & Product Studio.',
  },
} as const;
```

- [ ] **Step 4: Replace template brand/navigation/footer strings**

Wire existing header and footer components to the module. Use `/` for Indonesian and `/en/` for English. Use semantic links; preserve visible keyboard focus and existing dark-mode control.

- [ ] **Step 5: Run test and production check**

Run:
```bash
npx vitest run src/data/wanforge.test.ts
npm run build
```
Expected: 1 test passes and production build exits 0.

- [ ] **Step 6: Commit and push content foundation**

Run:
```bash
git add src/data/wanforge.ts src/data/wanforge.test.ts src

git commit -m 'feat: add bilingual WanForge content foundation'
git push origin main
git status --short
```
Expected: empty status output.

### Task 3: Replace generic landing sections with WANFORGE pages

**Files:**
- Modify: `src/pages/index.astro` and equivalent template home composition files
- Create: `src/pages/en/index.astro`
- Modify: shared landing section components used by both routes
- Test: `e2e/wanforge-home.spec.ts`

**Interfaces:**
- `/` renders Indonesian page with `siteContent.id`.
- `/en/` renders English page with `siteContent.en`.
- Both include hero, four services, capabilities section, contact CTA, and language switch.

- [ ] **Step 1: Write failing route smoke test**

Create `e2e/wanforge-home.spec.ts`:
```ts
import { expect, test } from '@playwright/test';

test('Indonesian and English landing pages expose WanForge services', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Sistem digital yang siap bekerja.' })).toBeVisible();
  await expect(page.getByText('AI & Otomasi')).toBeVisible();

  await page.goto('/en/');
  await expect(page.getByRole('heading', { name: 'Digital systems ready to work.' })).toBeVisible();
  await expect(page.getByText('AI & Automation')).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify failure**

Run template's E2E command with the test path, for example:
```bash
npx playwright test e2e/wanforge-home.spec.ts
```
Expected: FAIL because routes/content do not yet match.

- [ ] **Step 3: Implement route composition**

Replace generic ModernSaaS hero, customer-logo, testimonial, pricing, and invented metrics sections. Retain only reusable layout, theme control, accessibility behavior, and non-deceptive UI primitives. Build these sections from `siteContent`:

```text
header + language switch
hero + WhatsApp/GitHub CTAs
four service cards
capabilities section
contact CTA
footer
```

Set language links to `/` and `/en/`. Remove all example company names and product-specific claims from rendered output.

- [ ] **Step 4: Add metadata**

Set Indonesian default title and description:
```text
WANFORGE — Engineering & Product Studio
WANFORGE membangun produk web, aplikasi, infrastruktur, otomasi, dan sistem terintegrasi untuk kebutuhan operasional nyata.
```

Set English `/en/` title and description:
```text
WANFORGE — Engineering & Product Studio
WANFORGE builds web products, applications, infrastructure, automation, and integrated systems for real operational needs.
```

- [ ] **Step 5: Run route and build checks**

Run:
```bash
npx playwright test e2e/wanforge-home.spec.ts
npm run lint
npm run test
npm run build
find dist -maxdepth 2 -name index.html -print | sort
```
Expected: tests pass, build exits 0, output includes `dist/index.html` and `dist/en/index.html`.

- [ ] **Step 6: Commit and push landing pages**

Run:
```bash
git add src e2e
git commit -m 'feat: build bilingual WanForge landing pages'
git push origin main
git status --short
```
Expected: empty status output.

### Task 4: Apply WANFORGE identity and static deployment configuration

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/styles/*` or template global stylesheet identified in Task 1
- Create or modify: `public/favicon.svg`
- Modify: `public/robots.txt` and `public/sitemap-index.xml` only if upstream uses static versions
- Test: `e2e/wanforge-home.spec.ts`

**Interfaces:**
- Astro generates root-domain static paths.
- Metadata uses `https://wanforge.asia`.
- Visual tokens expose dark navy primary ink, deep red action color, and accessible white/near-white surfaces.

- [ ] **Step 1: Update site URL and static build settings**

Set Astro site configuration:
```ts
site: 'https://wanforge.asia',
output: 'static',
```

Do not configure a project subpath base.

- [ ] **Step 2: Replace visual tokens**

Set CSS variables or Tailwind tokens used by template:
```css
--color-ink: #06142E;
--color-action: #B91C1C;
--color-surface: #FFFFFF;
--color-surface-muted: #F8FAFC;
--color-text: #0F172A;
```

Ensure link, button, focus-visible, and dark-mode contrast remain legible. Do not introduce gradients solely as decoration.

- [ ] **Step 3: Add WANFORGE favicon**

Copy `favicon-light.svg` from archived repo revision into `public/favicon.svg` after checking it has square white background and dark icon. Add a `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` through template metadata/layout mechanism.

- [ ] **Step 4: Run visual and production checks**

Run:
```bash
npm run build
npx playwright test e2e/wanforge-home.spec.ts
```

Open local production preview and capture desktop plus mobile screenshots. Confirm both backgrounds, CTA contrast, language switch, and no removed generic sections appear.

- [ ] **Step 5: Commit and push brand deployment configuration**

Run:
```bash
git add astro.config.mjs src public e2e
git commit -m 'feat: apply WanForge site identity'
git push origin main
git status --short
```
Expected: empty status output.

### Task 5: Deploy committed static output to existing Pages branch

**Files:**
- Modify: `gh-pages` branch build artifacts only
- Preserve: `gh-pages:CNAME` containing `wanforge.asia`

**Interfaces:**
- Consumes: committed `main` build output in `dist/`.
- Produces: `gh-pages` static files served by GitHub Pages.

- [ ] **Step 1: Verify main source and build**

Run:
```bash
git status --short
git rev-parse HEAD
npm run build
test -f dist/index.html
test -f dist/en/index.html
```
Expected: clean source status and both output files exist.

- [ ] **Step 2: Preserve CNAME and publish build output**

Run:
```bash
git show origin/gh-pages:CNAME > dist/CNAME
git worktree add /home/wanforge/.hermes/cache/scratch/wanforge-pages gh-pages
rsync -a --delete --exclude='.git' dist/ /home/wanforge/.hermes/cache/scratch/wanforge-pages/
git -C /home/wanforge/.hermes/cache/scratch/wanforge-pages add -A
git -C /home/wanforge/.hermes/cache/scratch/wanforge-pages commit -m 'deploy: publish WanForge bilingual landing'
git -C /home/wanforge/.hermes/cache/scratch/wanforge-pages push origin gh-pages
git worktree remove /home/wanforge/.hermes/cache/scratch/wanforge-pages
```
Expected: `gh-pages` receives only generated assets and `CNAME`.

- [ ] **Step 3: Verify GitHub Pages configuration and live site**

Run:
```bash
gh api repos/wanforge/wanforge.github.io/pages --jq '{html_url,cname,source,status,https_enforced}'
curl -I --max-time 30 https://wanforge.asia/
curl -I --max-time 30 https://wanforge.asia/en/
```
Expected: Pages uses `gh-pages`, CNAME is `wanforge.asia`, HTTPS remains enforced, and both URLs return HTTP 200 after propagation.

- [ ] **Step 4: Final source verification**

Run:
```bash
git status --short
git log -1 --oneline
git ls-remote origin refs/heads/main refs/heads/gh-pages
```
Expected: clean `main` worktree and remote refs present.
