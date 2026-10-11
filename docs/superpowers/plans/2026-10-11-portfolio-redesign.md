# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a single cinematic "Blueprint → Build" scroll with GSAP choreography and statically generated case-study pages.

**Architecture:** Next.js 15 App Router. Content lives in typed data files under `src/content/`. The home page composes section components, and each section owns its GSAP timeline through `useGSAP`. Lenis smooth scroll is synced to ScrollTrigger once at the layout level. Case studies are SSG via `generateStaticParams`.

**Tech Stack:** Next.js 15.5, React 19, Tailwind CSS 4, gsap 3.15 (ScrollTrigger, SplitText), @gsap/react 2.1, lenis 1.3, Geist via next/font.

**Spec:** `docs/superpowers/specs/2026-10-11-portfolio-redesign-design.md`

## Global Constraints

- Dark-only theme. Tokens: bg `#0B0B0C`, raised `#121214`, text `#EDEDED`, muted `#8A8A8F`, hairline `rgba(255,255,255,0.08)`, accent `#FF5B1F`.
- Fonts: Geist Sans and Geist Mono only. No Inter, Exo 2 or serif.
- No emoji, no purple gradients, no "SECTION 01" meta-labels, no icon libraries (inline SVG only).
- Animate only `transform`, `opacity` and `clip-path`. `backdrop-blur` is allowed only on the fixed nav and menu overlay.
- Every GSAP timeline sits inside `gsap.matchMedia()`, with a `(prefers-reduced-motion: no-preference)` branch. With reduced motion, content renders in its final state.
- Pinning is enabled only at `(min-width: 768px)`.
- Email `nischal.ng11@gmail.com`; domain `https://nischalgupta.dev`; no `nischal.id.vn` anywhere.
- Case-study copy must not invent metrics. The only metric is "80% web performance improvement in Persona v2". investabl: "live, earning revenue", "32+ countries", "onchain payouts under 60 seconds" (public site copy).
- Credit "Design: Chaitanya Hegde" on Intract projects (persona, intract-quests, mints, ball-e).
- Prettier: tabs, single quotes, printWidth 85.

## Review Focus

1. **Reduced motion:** with OS reduced motion on, all text and images must be visible. Nothing may be stuck at `opacity: 0` from CSS. Initial hidden states must be set by GSAP `from()` inside the motion branch, never in CSS.
2. **Narrow viewport (320px):** no horizontal scroll. The hero H1 must fit, so it uses `clamp()` with a 2.25rem minimum. Wide annotations are hidden below `sm`.
3. **Route change and back navigation:** ScrollTrigger instances from the home page must not leak into `/work/[slug]`. `useGSAP` scope handles revert, and `ScrollTrigger.refresh()` runs after images load.
4. **Unknown slug:** `/work/does-not-exist` returns `notFound()` (404), not a crash. `dynamicParams = false`.
5. **Missing image for a case study (Spyne):** the template renders the type-led variant with no broken `<img>`.

Each line above maps to a check in Task 8.

---

### Task 1: Foundation (deps, tokens, fonts, layout, smooth scroll, content check)

**Files:**
- Modify: `package.json`, `src/styles/globals.css` (rewrite), `src/app/layout.tsx` (rewrite), `next.config.ts`
- Create: `src/lib/gsap.ts`, `src/components/smooth-scroll.tsx`, `src/components/icons.tsx`, `src/content/profile.ts`, `src/content/experience.ts`, `src/content/work.ts`, `scripts/check-content.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Delete: `src/components/magicui`, `src/components/ui`, `src/containers`, `src/components/layout`, `src/components/full-screen.tsx`, `src/components/mode-toggle.tsx`, `src/components/theme-provider.tsx`, `src/hooks`, `src/app/about`, `src/app/experience`, `src/app/projects`, `components.json`

**Interfaces (produced):**
```ts
// src/content/work.ts
export type Layer = { name: 'Design system' | 'Interface' | 'Services' | 'Cloud'; items: string[] };
export type Media = { src: string; alt: string; width: number; height: number; video?: string };
export type Deepdive = { title: string; body: string };
export type Work = {
	slug: string; title: string; company: string; role: string; years: string;
	oneLiner: string; link?: string; stack: string[]; cover?: Media; gallery: Media[];
	context: string; owned: string[]; deepdives: Deepdive[]; outcome: string;
	credits?: string; featured: boolean; hasPage: boolean; layers?: Layer[];
};
export const work: Work[];
export const caseStudies: Work[]; // work.filter(w => w.hasPage)
export function getWork(slug: string): Work | undefined;
export function nextWork(slug: string): Work; // cycles through caseStudies

// src/content/experience.ts
export type Role = { company: string; role: string; start: string; end: string; startYear: number; location: string; points: string[] };
export const experience: Role[]; // newest first

// src/content/profile.ts
export const profile: { name: string; role: string; email: string; site: string; location: string; tz: string; resume: string; socials: { label: string; href: string }[] };

// src/lib/gsap.ts
export { gsap, ScrollTrigger, SplitText, useGSAP };
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP = '(min-width: 768px)';
```

- [ ] **Step 1:** Remove unused deps and add new ones: `yarn remove motion three @react-three/fiber @types/three @tsparticles/engine @tsparticles/react @tsparticles/slim vaul @tabler/icons-react lucide-react next-themes @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot tw-animate-css class-variance-authority babel-plugin-react-compiler`, then `yarn add gsap@3.15.0 @gsap/react@2.1.2 lenis@1.3.26`.
- [ ] **Step 2:** Delete the legacy directories listed above.
- [ ] **Step 3:** Write the content files (profile, experience, work) with full copy from the spec, Cherry's challenge panels, and `experience.ts`.
- [ ] **Step 4:** Write `scripts/check-content.ts`, a node assert script run with `node --experimental-strip-types scripts/check-content.ts`. It asserts: slugs are unique; every `hasPage` entry has at least 2 deepdives and a non-empty `owned`; every media `src`/`video` exists under `public/`; experience is sorted newest-first; the investabl entry has exactly 4 layers in order. Add `"check:content"` to `package.json`. Run it and confirm it fails (no assets yet), then passes after Task 2.
- [ ] **Step 5:** Write `globals.css`: Tailwind import, `@theme` tokens (`--color-bg`, `--color-raised`, `--color-ink`, `--color-muted`, `--color-line`, `--color-accent`, `--font-sans`, `--font-mono`), base body styles, `.grid-bg` fixed layer (64px major / 8px minor lines via `background-image` linear-gradients), `.grain` fixed SVG-noise layer, `::selection` accent, `:focus-visible` accent outline, and `html.lenis` helpers.
- [ ] **Step 6:** Write `layout.tsx`: Geist and Geist_Mono from `next/font/google`, metadata with `metadataBase: new URL('https://nischalgupta.dev')`, `<body>` with fixed grid and grain layers, `<SmoothScroll>`, `<Nav>` (from Task 3; temporarily omitted), `<main className="overflow-x-clip">`, plus Analytics and SpeedInsights.
- [ ] **Step 7:** Write `smooth-scroll.tsx`, a client component that creates Lenis only when reduced motion is off, wires `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(t => lenis.raf(t * 1000))`, sets `gsap.ticker.lagSmoothing(0)`, and destroys on unmount. Anchor links use `lenis.scrollTo(hash)` through a click handler on `a[href^="#"], a[href^="/#"]` when on `/`.
- [ ] **Step 8:** `next.config.ts`: remove unused `remotePatterns`; add `redirects()` for `/experience` → `/#experience`, `/projects` → `/#work`, `/about` → `/#about` (permanent).
- [ ] **Step 9:** `sitemap.ts` (home plus case studies) and `robots.ts`.
- [ ] **Step 10:** Run `yarn build`. Expected: passes, with a placeholder `page.tsx` rendering the hero only. Commit.

### Task 2: Assets

**Files:** Create `public/work/{investabl,persona,intract-quests,mints,ball-e}/*`, `public/og.png`

- [ ] **Step 1:** From Cherry's downloads, export with ffmpeg:
  - **persona:** `cover.webp` (dashboard pUwG), `mint.webp` (BQkb), `identity.webp` (rOP8), `statue.mp4` (rclT, 1280w, crf 30, no audio, max 8s), `dashboard.mp4` (KPng, 1280w)
  - **intract-quests:** `cover.webp` (KqRT), `quests.mp4` (87gy), `achievements.mp4` (PzUE), `home.mp4` (9Jm1)
  - **mints:** `cover.webp` (frame of JAdT)
  - **ball-e:** `cover.webp` (frame of o69Y)
  - Each video gets a poster `.webp`. Target under 1.5MB per video.
- [ ] **Step 2:** Capture `investabl/cover.webp` and `investabl/trade.webp` from app.investabl.ai at 1440×900 with Playwright.
- [ ] **Step 3:** Generate `public/og.png` (1200×630) from a small HTML page rendered with Playwright, in the blueprint style with name and role.
- [ ] **Step 4:** Run `yarn check:content`. Expected: PASS. Commit.

### Task 3: Nav

**Files:** Create `src/components/nav.tsx`

- [ ] A fixed, floating pill (`top-4`, centred, `backdrop-blur-xl bg-black/40 ring-1 ring-white/10 rounded-full`). It holds the NG mark (SVG monogram) and links to `/#work`, `/#experience`, `/#about`, `/#contact`.
- [ ] Mobile: a `<button aria-expanded aria-controls>` whose two bars morph into an X. A full-screen overlay `<div role="dialog" aria-modal>` with staggered link reveals (GSAP, motion-ok only). Esc closes it, focus returns to the toggle, focus is trapped inside, and body scroll is locked (`lenis.stop()`).
- [ ] Verify keyboard behaviour in the browser and commit.

### Task 4: Hero

**Files:** Create `src/components/sections/hero.tsx`, `src/components/crosshair.tsx`

- [ ] H1 "I design it, build it, and ship it to production." at `max-w-6xl`, `text-[clamp(2.25rem,6.2vw,6rem)]`, `leading-[0.95]`, `tracking-[-0.04em]`. SplitText into lines; the outline layer (`-webkit-text-stroke: 1px`, transparent) sits under the filled layer revealed by `clip-path` per line.
- [ ] Sub-line and two CTAs. The primary CTA is an accent pill with a nested arrow circle; the secondary is a ghost pill.
- [ ] Mono corner annotations: `Gurgaon, IN · 28.45°N 77.03°E` and a live clock (`Intl.DateTimeFormat` with `Asia/Kolkata`, updated every 30s), `aria-hidden` where decorative.
- [ ] Crosshair: `(hover: hover) and (pointer: fine)` only. Two hairlines and an `x/y` readout follow the pointer via `gsap.quickTo`. `pointer-events-none`.
- [ ] Commit.

### Task 5: Featured investabl and selected work

**Files:** Create `src/components/sections/featured-investabl.tsx`, `src/components/sections/selected-work.tsx`, `src/components/blueprint-frame.tsx`

- [ ] **BlueprintFrame** (`{ media: Media; label: string; priority?: boolean }`): a relative wrapper. An SVG overlay draws a rect frame, corner ticks and dimension lines with mono labels `{width} × {height}`. Both the media (`next/image`, or `<video muted loop playsInline autoPlay>` with poster, played only when in view) and the SVG are inside. Timeline on enter (scrub, desktop): stroke dashoffset 1 → 0, then the media `clip-path: inset(0 0 100% 0)` → `inset(0)`, then the frame fades to 0.35. Reduced motion: everything is visible.
- [ ] **featured-investabl:** `#work` anchor. Desktop: a two-column grid; the left column is `sticky top-28`; the right column is a pinned stage with 4 layer cards in `perspective: 1200px`. They start exploded (`rotateX(55deg) rotateZ(-8deg)`, `z` offsets 0/-120/-240/-360, `y` spread), then scrub into a stack, and the active layer label lights up in the accent colour. Under the stack sits a BlueprintFrame of `investabl/cover.webp`. Mobile: a vertical list of the 4 layers plus the image.
- [ ] **selected-work:** the large entries persona, intract-quests and spyne alternate in an asymmetric 12-column layout (7/5 and 5/7 splits). Each has a BlueprintFrame (Spyne gets the type-led `TypeFrame`: big mono "RBAC · Stripe · Atomic UI" inside the frame), plus title, one-liner, role/years and a "Read case study" link. The small row (mints, ball-e) uses compact cards with cover and one line, and no link.
- [ ] Commit.

### Task 6: Build log, About and Contact

**Files:** Create `src/components/sections/build-log.tsx`, `src/components/sections/about.tsx`, `src/components/sections/contact.tsx`, `src/components/copy-email.tsx`

- [ ] **build-log** (`#experience`): left is a sticky big mono year counter (`2026`) and a ruler; right is the roles list. Each role is a ScrollTrigger (`start: 'top center'`) that tweens the counter to its `startYear` using a proxy object and `Math.round`. Mobile: the counter is hidden and each role shows its years inline.
- [ ] **about** (`#about`): a paragraph split into words (SplitText `type: 'words'`), scrubbing opacity 0.15 → 1. A stack spec table as a `<dl>` grouped into Interface / Systems / Cloud / Design.
- [ ] **contact** (`#contact`): H2 "Let's build something." `clamp(3rem,10vw,9rem)`. Two columns: Hiring (resume download, LinkedIn) and Project (CopyEmail, mailto). Footer: socials, local time, credit line.
- [ ] **CopyEmail:** `<button>` calls `navigator.clipboard.writeText`. Its label switches to "Copied" for 2s through an `aria-live="polite"` span, and falls back to `mailto` if clipboard throws.
- [ ] Compose `src/app/page.tsx` with all sections and commit.

### Task 7: Case study page

**Files:** Create `src/app/work/[slug]/page.tsx`, `src/components/case-study.tsx`

- [ ] `generateStaticParams` returns `caseStudies.map(w => ({ slug: w.slug }))`; set `export const dynamicParams = false`; `generateMetadata` produces a per-case title, description and canonical.
- [ ] Template per spec section 3: header, hero BlueprintFrame (or TypeFrame when `!cover`), context, owned list, deep dives as numbered mono-annotated blocks, gallery (BlueprintFrame each), outcome, credits, next-project link (large, hover underline draw).
- [ ] Commit.

### Task 8: Verification

- [ ] `yarn lint`, `yarn build` and `yarn check:content` all pass.
- [ ] Playwright screenshots at 1440 and 390 of the home page (each section scrolled into view) and of `/work/persona` and `/work/spyne`.
- [ ] Emulate `reducedMotion: 'reduce'`: assert no element inside `main` has computed opacity below 0.99 (for decorative elements, check `aria-hidden`), using a quick `page.evaluate`.
- [ ] At 320px, assert `document.documentElement.scrollWidth <= 320`.
- [ ] `/work/nope` returns status 404.
- [ ] `/experience` redirects to `/#experience`.
- [ ] Lighthouse mobile (`npx lighthouse` against `yarn start`). Target perf 90 or above; fix the biggest offender if below.
- [ ] Commit.

---

## Amendments after plan review (2026-10-11)

1. Task 1: stub `src/app/page.tsx` before deleting legacy dirs so the build stays green.
2. Content files import nothing. `scripts/check-content.ts` imports `../src/content/*.ts`; `scripts` is added to tsconfig `exclude` so `next build` does not type-check it.
3. BlueprintFrame clip tween uses matching units: `inset(0% 0% 100% 0%)` → `inset(0% 0% 0% 0%)` on a wrapper div.
4. Hero SplitText uses `autoSplit: true` + `onSplit` returning the tween (font swap re-splits).
5. Smooth scroll uses `ReactLenis root` from `lenis/react` (`anchors: true`, `autoRaf: false`, ticker-driven); Nav uses `useLenis()` to stop/start; body overflow also locked for reduced-motion users. `lenis/dist/lenis.css` imported.
6. No `pin: true` anywhere: featured stack and build log use a tall parent + `sticky top-0 h-[100dvh]` stage, scrubbed from the parent.
7. On load with a hash, after `ScrollTrigger.refresh()`, scroll to the hash immediately.
8. Build log displays oldest → newest so the counter climbs 2021 → 2026 and ends on investabl.
9. Fonts mapped inside `@theme inline`.
10. Layout metadata adds `openGraph.images: ['/og.png']`; case studies use their cover as OG image.
11. Icons written in Task 1. Task 8 adds a keyboard/focus-trap check.
12. Dropped: dimension count-up labels.
