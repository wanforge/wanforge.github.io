# anti-slop-design

Autonomous Principal Design Technologist and Anti-AI-Slop Specialist for AI coding agents (Claude Code, Cursor, Antigravity, Windsurf).

Transforms messy, template-ridden vibe-coded prototypes into bespoke, human-grade, production-ready software.

```bash
npx skills add wwewtech/anti-slop-design
```

**[Live Showcase](https://wwewtech.github.io/anti-slop-design/)** • **[skills.sh](https://skills.sh/wwewtech/anti-slop-design)** • **[SKILL.md](SKILL.md)** • **[Collections](COLLECTIONS.md)**

---

## Why Anti-Slop?

When coding agents generate user interfaces without design constraints, they converge on predictable tropes:

- **The "AI Dark Mode" Blob**: `radial-gradient` from indigo-600/purple-900 blurred in corners of dark backgrounds.
- **Metric & Filter Clutter**: Date pickers duplicated inside individual cards; total counts repeated across 3 different widgets.
- **The "Emoji as Icon" Plague**: Using raw emojis (`🚀`, `🔥`, `💡`, `📊`) in buttons and sidebars instead of single-stroke vector icons.
- **Vanity Space-Wasters**: Giant 3D globes or map widgets that occupy 50% of the viewport with zero actionable data deltas.
- **Sluggish Transitions**: 400ms `ease-in` curves that make software feel laggy and ungrounded.
- **Missing Interaction States**: Buttons that only have hover states, lacking `:focus-visible`, `:active`, loading, and disabled handling.

`anti-slop-design` replaces these defaults with deterministic architectural rules, curated token archetypes, and an objective 7-axis quality gate.

---

## Transformation in Action

### Before: Vibe-Coded AI Slop
```tsx
<div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_#312e81,_#0f172a,_#000000)] p-8">
  <span className="text-xs uppercase tracking-widest text-indigo-400">ANALYTICS</span>
  <h1 className="text-4xl font-bold text-white">Live <span className="italic bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Radar</span></h1>
  
  <div className="grid grid-cols-3 gap-6 mt-8">
    <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-indigo-500 transition-all duration-400 ease-in">
      <div className="text-2xl mb-2">🚀</div>
      <h3 className="text-xl font-semibold">Total Clicks</h3>
      <p className="text-3xl font-bold">+99.9% Uptime</p>
      <input type="date" className="mt-4 p-2 bg-slate-800 rounded" />
    </div>
  </div>
</div>
```

### After: Human-Grade Production (Quiet Luxury SaaS Archetype)
```tsx
<div className="min-h-screen bg-[#09090b] text-zinc-100 p-8 font-sans">
  <div className="max-w-5xl mx-auto space-y-6">
    {/* Unified Page-Level Header & Filter Bar */}
    <header className="flex items-center justify-between pb-4 border-b border-white/10">
      <div>
        <h1 className="text-base font-semibold tracking-tight">Link Telemetry</h1>
        <p className="text-xs text-zinc-400 mt-0.5">Normalized 30-day traffic metrics</p>
      </div>
      <div className="flex items-center gap-3">
        <DateRangeSelector defaultValue="30d" />
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-medium rounded-md active:scale-95 transition-transform duration-100 focus-visible:ring-2 focus-visible:ring-white/50 outline-none">
          <PlusIcon className="w-3.5 h-3.5 stroke-[2]" />
          Create Link
        </button>
      </div>
    </header>

    {/* Single Source of Truth Summary */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard label="Active Links" value="1,284" change="+12.4%" />
      <MetricCard label="Total Referrals" value="49,102" change="+8.1%" />
      <MetricCard label="Avg Latency" value="42ms" change="-3.2%" />
    </div>
  </div>
</div>
```

---

## Quick Installation

### 1. Via `skills.sh` / Vercel Skills CLI
```bash
npx skills add wwewtech/anti-slop-design
```

### 2. Via Claude Code
```bash
claude skills add https://github.com/wwewtech/anti-slop-design
```

### 3. For Google Antigravity
Clone or copy `SKILL.md` directly into your Antigravity skills directory:
```bash
# Windows
mkdir -p "$HOME\.gemini\config\skills\anti-slop-design"
curl -sL https://raw.githubusercontent.com/wwewtech/anti-slop-design/main/SKILL.md -o "$HOME\.gemini\config\skills\anti-slop-design\SKILL.md"

# macOS / Linux
mkdir -p ~/.gemini/config/skills/anti-slop-design
curl -sL https://raw.githubusercontent.com/wwewtech/anti-slop-design/main/SKILL.md -o ~/.gemini/config/skills/anti-slop-design/SKILL.md
```

### 4. For Cursor & Windsurf
Add `SKILL.md` to your workspace prompt context:
```bash
mkdir -p .cursor/skills/anti-slop-design
curl -sL https://raw.githubusercontent.com/wwewtech/anti-slop-design/main/SKILL.md -o .cursor/skills/anti-slop-design/SKILL.md
```

---

## The 12 AI Slop Anti-Patterns

| Anti-Pattern | Manifestation in Vibe-Coded UI | Mandatory Production Replacement |
| :--- | :--- | :--- |
| **The "AI Dark Mode" Blob** | `radial-gradient` from indigo-600 or purple-900 blurred in corners of dark backgrounds. | Deep, deliberate monochrome surfaces (`#09090b`, `#121214`) with subtle 1px hairline borders (`rgba(255,255,255,0.08)`). |
| **Monotonous Slate/Indigo** | Generic `bg-slate-900 text-slate-400 bg-indigo-600` cookie-cutter templates. | Curated semantic tokens (OKLCH/HSL) with distinct brand personality (e.g., Warm Amber, Electric Cobalt, Deep Emerald, or Crisp Monochrome). |
| **Cookie-Cutter 3-Card Grid** | Three identical rectangular cards with glowing borders on hover. | Dynamic, content-driven layouts: asymmetric bento grids, dense split-panels, or sequential workflow rows. |
| **Raw Emojis as Icons** | Plastering raw emojis (`🚀`, `🔥`, `💡`, `📊`) inside buttons, cards, and sidebars. | Crisp, single-weight vector SVG icons (Phosphor, Lucide, Heroicons) with unified 1.5px/2px stroke widths. |
| **Fabricated Vanity Stats** | Meaningless filler cards: `"+99.9% Uptime"`, `"10x Faster"`, `"50k+ Users"` with no source. | Real domain telemetry or remove the card entirely. Zero vanity metrics. |
| **Screaming Eyebrow Labels** | Tracked-out uppercase labels above every heading: `OVERVIEW`, `FEATURES`, `ANALYTICS`. | Sentence-case hierarchy, subtle metadata tags, or omit entirely if the heading is self-explanatory. |
| **Single-Word Italic/Color Accents** | Headlines with one arbitrary word italicized or highlighted in glowing gradient text. | Uniform, confident typographic weight. Let the whole statement carry authority. |
| **Redundant Metric Duplication** | Repeating total clicks/revenue in header, sidebar, and inside multiple individual cards. | **Single Source of Metric Truth.** One primary KPI summary per viewport; drill-downs below. |
| **Card-Level Filter Pollution** | Duplicating date pickers or dropdowns inside every card rather than at the page level. | Unified **Page-Level Control Bar** that synchronizes all underlying views. |
| **Vanity Visual Space-Wasters** | Giant world maps or 3D blobs that occupy 60% of the screen with zero actionable data. | Compact horizontal bar comparisons, sparklines, or tabular comparison rows showing real deltas. |
| **Missing Interactive States** | Buttons with only hover effects, lacking `:focus-visible`, `:active`, loading, and disabled states. | **8-State Interactive Feedback System** on all interactive primitives. |
| **Broken Placeholders & Links** | `via.placeholder.com`, broken Unsplash URLs, or blurry stock photos. | High-fidelity inline SVGs, semantic CSS abstract shapes, or verified local assets. |

---

## Core UX Axioms

1. **The "1-to-3" Rule:** 1 primary action or dominant focal point per viewport section -> max 3 secondary supporting actions.
2. **The 85% Statistical Prioritization Law:** Optimize for what 85% of users do every day. Make that scenario 1-click accessible. Tweak the 15% edge cases into subtle secondary popovers.
3. **Strict Ban on Duplication:** Page-level filters apply globally. Never repeat the same KPI across multiple widgets.
4. **Mobile Linearity on Desktop:** Stack competing logic blocks sequentially so the human eye scans naturally from top to bottom.

---

## Architectural Principles

1. **Visual DNA Ingestion:** Extract 5 foundation tokens (`Canvas`, `Surface`, `Primary Accent`, `Text Hierarchy`, `Hairline Border`) without copying visual bugs.
2. **Bespoke Asset Architecture:** Replace broken placeholders with high-fidelity inline SVGs or structured DOM mockups.
3. **Contextual Asset Differentiation:** Frame physical goods with generous whitespace and macro-photography; showcase digital SaaS with live, crisp UI components.
4. **Typographic Discipline:** Cap body line length at `<= 75ch`. Pair character-rich display fonts with tabular monospace metadata (`font-variant-numeric: tabular-nums`).
5. **Deterministic Design Variations:** Switch between 4 logic-preserving archetypes (*Quiet Luxury SaaS*, *Technical Dense Terminal*, *Editorial & Refined*, *Warm Tactile*) while preserving 100% of underlying form logic and state.
6. **Spacing Geometry:** Strict 4px/8pt spatial grid. Enforce nested radius math: `R_inner = max(0, R_outer - padding)`.
7. **Cognitive De-Cluttering:** Strip decorative ballast, redundant status pills, and empty ghost cards.
8. **Systematic Scaffolding:** Anchor every screen to a battle-tested layout skeleton (App Shell, High-Density Dashboard, or 50ms Conversion Hero).

---

## Production Design Archetypes

### Quiet Luxury SaaS (B2B / Pro Tools)
```css
:root {
  --bg-canvas: #09090b;
  --bg-surface: #121215;
  --bg-surface-elevated: #18181c;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.16);
  --accent-primary: #3b82f6; /* Electric Cobalt */
  --accent-foreground: #ffffff;
  --text-primary: #f4f4f5;
  --text-secondary: #a1a1aa;
  --radius-sm: 6px;
  --radius-md: 10px;
}
```

### Technical Dense Terminal (DevTools / FinTech / Observability)
```css
:root {
  --bg-canvas: #0c0d0e;
  --bg-surface: #141618;
  --border-subtle: #24282c;
  --accent-primary: #10b981; /* Precision Emerald */
  --accent-secondary: #f59e0b; /* Amber Alert */
  --text-primary: #e6edf3;
  --font-mono: 'JetBrains Mono', monospace;
  --radius-sm: 2px;
}
```

---

## Micro-Interactions & The 8-State Feedback System

Every interactive primitive (button, input, tab, card) must implement 8 functional states:

```
[Default] ──> [Hover] ──> [:focus-visible] ──> [:active (Tactile 0.97)]
   │
   └──> [Loading (Spinner)] ──> [Error (Shake)] ──> [Success (Pulse)] ──> [Disabled]
```

### The Emil Kowalski Animation Decision Rules
- **Actions performed 100+ times/day:** **0ms duration (INSTANT). Never animate.**
- **Standard micro-interactions:** **120ms – 180ms**.
- **Curves:** **Never use `ease-in` for UI.** Always use punchy `ease-out`: `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Tactile press:** On `:active`, scale down by 2–3%: `transform: scale(0.97)`.

---

## The 7-Axis Pre-Emit Quality Gate

Before completing any UI task, the agent automatically grades its work against 7 objective criteria:

| Axis | Metric | Target Threshold |
| :--- | :--- | :--- |
| **1. Anti-Slop Purity** | Freedom from AI clichés | Zero purple gradients, zero emojis as icons, zero vanity stats |
| **2. UX Speed & 1-to-3 Rule** | Logical clarity | 1 primary action, max 3 secondary, unified page-level filters |
| **3. Typographic Discipline** | Personality & hierarchy | Max 2 font families, tabular numbers on metrics, `<= 75ch` body |
| **4. Spacing & Geometric Math** | Spatial cadence | Strict 4px/8pt grid, nested radius math `R_inner = max(0, R_outer - padding)` |
| **5. Micro-Interactions & Motion** | Physical feel | Snappy transitions `< 200ms`, tactile `:active { transform: scale(0.97) }` |
| **6. Accessibility & Keyboard Flow** | WCAG 2.1 AA | Visible `:focus-visible` rings, no naked `outline: none`, semantic tags |
| **7. Mobile & Responsive Linearity** | Cross-device stability | Clean vertical stacking, zero horizontal overflow, `>= 44px` touch targets |

*A score of `>= 4/5` across all 7 axes is mandatory before shipping.*

---

## Collections & Ecosystem Inclusion

`anti-slop-design` is indexed and curated across major AI agent skill collections and registries:

- **[skills.sh Directory](https://skills.sh/wwewtech/anti-slop-design):** Featured in `Design & UI`, `Agent Workflows`, `Mobile`, `React`, and `Next.js` topics.
- **[ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills):** Curated under UI & Frontend Engineering.
- **[VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills):** Listed in Design & User Experience.
- **[Google Antigravity Built-in Skills](https://deepmind.google):** Full support for native workspace and agent workflows.
- **Full Compilations Registry:** See [COLLECTIONS.md](COLLECTIONS.md) for direct links, category entries, and markdown snippets for awesome-lists.

---

## Research & Corpus Audit

This skill was engineered by auditing **100+ top design skills** and the official **`skill-creator`** meta-skill across the GitHub and `skills.sh` ecosystem, including:

- `anthropics/skills` (`frontend-design`, `skill-creator`)
- `vercel-labs/agent-skills` (`web-design-guidelines`)
- `leonxlnx/taste-skill` (`design-taste-frontend`)
- `emilkowalski/skills` (`emil-design-eng`)
- `wshobson/agents` (`kpi-dashboard-design`, `visual-design-foundations`)
- Real-world SaaS critiques from Kole Jain, ALETI landing page analyses, and commercial UX speed studies.

For the complete 100-skill benchmark and diagnostic report, see [SKILLS_ANALYSIS_AND_AUDIT.md](SKILLS_ANALYSIS_AND_AUDIT.md).

---

## License

MIT © [wwewtech](https://github.com/wwewtech)
