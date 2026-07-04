# The Brand Crew

> Websites that actually work. For businesses that mean business.

Modern web design and development for businesses in Argentina.

[**Live Site →**](https://thebrandcrew.lat)

---

## Tech Stack

- **Framework:** Astro 5
- **Styling:** Vanilla CSS — [Atomic Design](https://atomicdesign.bradfrost.com/) methodology
- **Color:** OKLCH 3-Layer Design Tokens
- **Testing:** Playwright
- **Deploy:** Vercel (auto-deploy on `master` push)
- **Analytics:** Vercel Analytics + Speed Insights

---

## Atomic Design Architecture

The CSS follows Brad Frost's Atomic Design methodology, organized in 5 progressive layers:

### 🧬 Atoms
Base styles, CSS custom properties, reset, typography tokens, atomic classes (`.mono`, `.text-terracota`, `.section-label`)

### 🔬 Molecules
Composite UI primitives: `.btn`, `.glass-card`, `.tag`, `.resultado-card`, `.pricing-card`, `.faq-item`, `.step`

### 🧠 Organisms
Complex sections built from molecules: `.navbar`, `.hero`, `.pricing`, `.faq`, `.cta`, `.footer`, `.mobile-menu`, `.preloader`

### 📐 Templates
Page-level layout: `.section` grid, container constraints

### 📄 Pages
`index.astro`, `privacy.astro`, `terms.astro` — instance-specific overrides only

---

## Key Principles

### CSS Architecture (3-Layer OKLCH)

```
Layer 1: OKLCH primitives  →  --oklch-terracota: oklch(0.58 0.18 32)
Layer 2: Semantic tokens    →  --accent: var(--oklch-terracota)
Layer 3: Components         →  --radius-lg: 16px; --space-lg: 2rem
```

### Button Hierarchy

| Type | Style | Use |
|------|-------|-----|
| Primary CTA | Filled background, high contrast, no border | Main action |
| Secondary CTA | 2px outline, hover fill animation | Secondary action |
| Border radius | `10px` — friendly and tactile | All buttons |

### Mobile First
- `touch-action: manipulation` on all interactive elements
- `safe-area-inset-*` for notched devices
- `100dvh` with `100vh` fallback
- `(@media hover: hover)` for hover effects — prevents sticky hover on touch

---

## Quick Start

```fish
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # production build
pnpm preview    # preview production
```

### Testing

```fish
pnpm test          # headless
pnpm test:headed   # with browser UI
```

---

## Project Structure

```
src/
├── components/     # Astro components (organisms)
│   ├── Hero.astro
│   ├── Pricing.astro
│   ├── FAQ.astro
│   ├── CTA.astro
│   ├── Footer.astro
│   ├── Navbar.astro
│   ├── MobileMenu.astro
│   ├── Preloader.astro
│   ├── About.astro
│   ├── Problema.astro
│   ├── ComoFunciona.astro
│   ├── CaseStudies.astro
│   ├── ScrollToTop.astro
│   └── Blog.astro
├── layouts/
│   └── BaseLayout.astro   # SEO, preloader, shared markup
├── pages/
│   ├── index.astro        # Home page
│   ├── privacy.astro      # Privacy policy
│   └── terms.astro        # Terms of service
├── scripts/         # Client-side JS
│   ├── navigation.js      # Mobile menu
│   ├── preloader.js        # Loading animation
│   ├── scroll.js           # Scroll-to-top + navbar
│   ├── faq.js              # FAQ accordion
│   ├── reveal.js           # Scroll-triggered reveals
│   └── carousel.js         # Case studies carousel
└── styles/
    └── global.css          # Atomic Design CSS
```

---

## Deployment

Push to `master` → auto-deploys to Vercel:

```fish
git add .
git commit -m "feat: description"
git push origin master
```

---

## License

Proprietary — © 2026 The Brand Crew. All rights reserved.

---

## Contact

- [thebrandcrew.lat](https://thebrandcrew.lat)
- hello@thebrandcrew.lat
- WhatsApp: +54 9 11 2406-3009
- Dev: [Illya Grytsyk](https://illushkinn.github.io)

---

## Documentation

- `POST-MIGRATION-CHECKLIST.md` — Post-deployment guide
