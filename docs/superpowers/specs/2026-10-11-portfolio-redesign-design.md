# Portfolio Redesign: "Blueprint → Build"

Date: 2026-10-11
Branch: env/development
Status: Draft for review

## 1. Intent

**Who it's for:** recruiters hiring senior frontend/full-stack engineers, and freelance clients.
**What it must do:** show real work and skills, then make reaching out effortless, with one path for hiring and one for projects.
**Core message:** Nischal takes a product all the way from design system to cloud, and ships it. investabl.ai is the proof: a live, revenue-generating product he built end to end as founding engineer.
**Success criteria:**
- A visitor understands who Nischal is and what he builds within the first viewport.
- Every case study is reachable within one scroll and one click.
- Contact is two clicks or fewer from anywhere.
- Lighthouse mobile performance is 90 or above, the site is fully usable with reduced motion, and it never scrolls horizontally.

## 2. Visual direction: Blueprint → Build

The site acts out the claim: things are *specified*, then *built*.

- **Canvas:** dark-only graphite (`#0B0B0C` base, `#121214` raised). A faint 8px/64px blueprint grid sits on a fixed, `pointer-events-none` layer, with low-opacity grain on the same fixed layer.
- **Accent:** one signal colour (orange, about `#FF5B1F`), used sparingly for focus, active states and the single highlighted word. Neutrals: `#EDEDED` text, `#8A8A8F` muted, `rgba(255,255,255,0.08)` hairlines.
- **Type:** Geist Sans (display and body) and Geist Mono (annotations, labels, metadata), loaded via `next/font/google`. Display headings use tight tracking with `clamp()` sizes, wide containers and 2–3 lines at most.
- **Annotation language:** small mono notes such as dimension lines, coordinates, `v2.0` tags and crosshair marks. Used as decoration that rewards a closer look, never as cheap "SECTION 01" meta-labels.
- **Banned:** purple/indigo gradients, glow blobs, emoji, icon clouds, particle backgrounds, light theme or theme toggle.
- **Icons:** about 8 inline SVG icons (arrow, copy, check, download, GitHub, LinkedIn, X, mail), drawn with a thin 1.25px stroke.

## 3. Information architecture

### Home `/`: one continuous scroll

1. **Nav:** a floating pill, top-centred and detached from the edge. It holds the NG mark, then Work / Experience / About / Contact as anchor links. On mobile, a hamburger morphs into an X and opens a full-screen overlay where the links slide in one after another. Focus is trapped while the menu is open, and Esc closes it.
2. **Hero:**
   - A wide H1, 2 lines at most (`max-w-6xl`), along the lines of: *"I design it, build it, and ship it to production."*
   - Sub-line: "Founding engineer at investabl.ai. Design systems → interfaces → services → cloud."
   - Two CTAs: *See the work* (to `#work`) and *Get in touch* (to `#contact`).
   - Background: the blueprint grid plus a cursor crosshair with live mono coordinates. The crosshair only appears on hover-capable pointers.
   - Corner annotation: "Gurgaon, IN" and local time.
3. **Featured: investabl.ai (`#work`):** a pinned section. The left column stays fixed (name, one-liner, role and dates, "Live. Earning revenue.", a link to app.investabl.ai). The right column assembles four layers as you scroll:
   - **Design system:** Figma, Claude Design. The "trading cockpit" system on Radix/shadcn and Tailwind.
   - **Interface:** React 19, Vite, React Router, TanStack Query/Table, Zustand, TradingView charts, wagmi/viem, PWA.
   - **Services:** Fastify, Postgres, Redis, WebSockets, Zod, Hyperliquid, MT4/MT5, Gemini.
   - **Cloud:** GCP VMs, GitHub Actions CI/CD.
   - One-liner: a prop trading platform where traders pass an evaluation, get funded, and withdraw profits onchain in under 60 seconds, in 32+ countries.
4. **Selected work:** Proof of Humanity / Persona, Intract Quests + Admin/CMS, and Spyne Dashboard as large entries. Intract Mints (sunset) and Ball-E appear as a smaller row. Each large entry uses the wireframe → screen reveal and links to `/work/[slug]`.
5. **Experience (`#experience`):** the build log. A vertical ruler with year ticks, and a pinned year counter that scrubs 2021 → 2026 as entries pass:
   - investabl.ai: Founding Engineer, 04/2026 – present
   - Intract.io: Frontend Engineer, 03/2024 – 04/2026
   - Spyne.ai: Full Stack Software Engineer, 06/2022 – 03/2024
   - Napier Healthcare: Software Development Intern, 08/2021 – 03/2022
6. **About (`#about`):** one short paragraph with word-by-word scrub reveal, plus a stack spec table grouped as Interface / Systems / Cloud / Design. The Spotify, dev-blog, icon-cloud and resume-card bento are removed.
7. **Contact (`#contact`):** a very large "Let's build something." heading with two paths:
   - **Hiring:** resume download (`/files/nischal_gupta.pdf`) and LinkedIn.
   - **Project:** copy email (`nischal.ng11@gmail.com`, with copied-state feedback) and `mailto:`.
   - Footer: GitHub / LinkedIn / X, local time, and "Built from scratch: Next.js + GSAP".

### Case study `/work/[slug]`

Statically generated from `src/content/work.ts`. Slugs: `investabl`, `persona`, `intract-quests`, `spyne`. Mints and Ball-E stay home-page entries only (no page) until there is content for them.

Template:
1. **Header:** title, one-liner, role, years, stack chips, live link.
2. **Hero visual:** wireframe → screen reveal. Spyne uses a type-led variant with no image.
3. **Context:** the problem and the product, 2–3 sentences.
4. **What I owned:** a bullet list.
5. **Engineering deep dives:** 2–3 short blocks, each a heading, a paragraph and an optional diagram or code snippet. Examples: Persona's 80% performance gain, the solo-built Admin/CMS, Spyne's RBAC and Stripe PLG flow, and investabl's design-system-to-cloud ownership.
6. **Outcome.**
7. **Credits:** "Design: Chaitanya Hegde" on Intract projects.
8. **Next project:** a link that cycles through the case studies.

Copy for these is drafted from `experience.ts` and the investabl stack, then reviewed by Nischal. No invented metrics.

### Removed routes

`/experience`, `/projects` and `/about` are deleted. A `next.config.ts` redirect sends each one (permanent) to `/#experience`, `/#work` and `/#about` respectively.

## 4. Motion system

- **Libraries:** `gsap` and `@gsap/react` (ScrollTrigger, SplitText) and `lenis` for smooth scroll, synced to ScrollTrigger through `gsap.ticker`. `motion` / Framer Motion is removed, leaving one animation system.
- **Hooks:** every animation lives in `useGSAP` with a scoped ref, so it is cleaned up on unmount and on route change.
- **Animated properties:** only `transform`, `opacity` and `clip-path`. `backdrop-blur` is used only on the fixed nav and menu overlay.
- **Easing:** custom curves (`expo.out`, `power3.out`). No linear easing except on scrub timelines.
- **Signature effects:**
  1. **Hero draw:** SplitText lines go from an outline stroke (`-webkit-text-stroke`, transparent fill) to filled, staggered on load.
  2. **Wireframe → screen:** an SVG frame and dimension lines draw via `stroke-dashoffset`, then the image is revealed via a `clip-path: inset()` scrub. Small mono labels count up the image dimensions.
  3. **Layer stack:** four panels in CSS `perspective`, starting spread apart on the Z/Y axis, scrub into a stack while pinned. Each label activates as its layer lands.
  4. **Build-log counter:** a pinned year readout tweens between years in sync with the entry positions.
  5. **About scrub:** word opacity goes from 0.15 to 1 across the paragraph.
  6. **Section entries:** a heavy fade-up (`y: 48`, `opacity: 0`, 0.9s).
- **Reduced motion:** `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` skips every timeline, so content renders in its final state. No content is ever hidden in a way that depends on JS running.
- **Mobile (below 768px):** pinning is disabled. The layer stack becomes a vertical list with simple reveals, the build log becomes a plain list, and the crosshair is off.

## 5. Code structure

```
src/
  app/
    layout.tsx            # fonts, metadata (nischalgupta.dev), Lenis provider, grain/grid layer
    page.tsx              # composes home sections
    work/[slug]/page.tsx  # case study template + generateStaticParams + metadata
    sitemap.ts, robots.ts
  content/
    profile.ts            # name, role, email, socials, location
    experience.ts         # roles (moved from app/experience)
    work.ts               # case studies (typed)
  components/
    nav.tsx
    smooth-scroll.tsx     # Lenis + ScrollTrigger sync (client)
    icons.tsx             # inline SVG set
    blueprint-frame.tsx   # wireframe → screen reveal
    sections/
      hero.tsx
      featured-investabl.tsx
      selected-work.tsx
      build-log.tsx
      about.tsx
      contact.tsx
  lib/
    gsap.ts               # registerPlugin once, shared matchMedia helpers
    utils.ts              # cn() (kept)
  styles/globals.css      # tokens, grid/grain, base type
```

Each section is one file under about 200 lines, owning its own GSAP timeline. Content lives only in `src/content/`, never inside JSX.

**Deleted:** `src/components/magicui/*`, everything in `src/components/ui/*` except anything still used (expected: none), `src/containers/*`, `components/full-screen.tsx`, `layout/*`, `mode-toggle.tsx`, `theme-provider.tsx`, `hooks/use-outside-click.tsx`, `app/about`, `app/experience`, `app/projects`.

**Dependencies removed:** `motion`, `three`, `@react-three/fiber`, `@types/three`, `@tsparticles/*`, `vaul`, `@tabler/icons-react`, `lucide-react`, `next-themes`, `@radix-ui/*`, `tw-animate-css`, `class-variance-authority`. Each is removed only if a grep confirms it is unused.
**Dependencies added:** `gsap`, `@gsap/react`, `lenis`.
**Kept:** `next`, `react`, Tailwind 4, `clsx`, `tailwind-merge`, `@vercel/analytics`, `@vercel/speed-insights`.

## 6. Assets

- **Intract screens** (Persona, Quests, Mints, Ball-E) come from Chaitanya Hegde's portfolio (cherrydesign.framer.website), with Nischal's go-ahead and an on-page design credit. They are saved to `public/work/<slug>/` as optimised WebP and served via `next/image`.
- **investabl:** screenshots of app.investabl.ai captured during implementation.
- **Spyne:** type-led for now. The layout accepts images later with no structural change.
- **OG image:** a static 1200×630 PNG in the blueprint style.

## 7. Accessibility and SEO

- Semantic landmarks, one H1 per page, no skipped heading levels.
- Every interactive element is a real `<a>` or `<button>`, with visible focus rings in the accent colour.
- Contrast meets 4.5:1 for body text and 3:1 for large text and annotations that carry meaning. Purely decorative annotations are marked `aria-hidden`.
- The copy-email button announces its state through `aria-live`.
- Metadata is unified on `https://nischalgupta.dev`. Each case study has its own title, description and OG. A sitemap and robots file are included. All `nischal.id.vn` references are removed.

## 8. Verification

- `yarn build` and `yarn lint` pass with no errors.
- Manual check at 320, 768, 1024 and 1440px: no horizontal scroll, and pinned sections behave.
- With OS reduced motion on, all content is visible and nothing is pinned or animated.
- Tabbing through the whole home page and one case study works, and the mobile menu traps and releases focus.
- Lighthouse mobile: Performance at least 90, and Accessibility, Best Practices and SEO each at least 95.
- Screenshots of each section are captured for review.

## 9. Out of scope

Blog or writing section, CMS, light theme, contact form backend (`mailto` and copy are enough), Mints and Ball-E case-study pages, analytics changes, terminal easter egg.

## 10. Open items (do not block the build)

- Spyne screenshots: drop in when the Figma files are found.
- Final case-study copy: drafted by Claude, then corrected by Nischal.
