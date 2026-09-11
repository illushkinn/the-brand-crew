# The Brand Crew

> Websites that actually work. For businesses that mean business.

Modern web design and development for businesses in Argentina.

[**Live Site →**](https://thebrandcrew.lat)

---

## Tech Stack

- **Framework:** Astro 5 (static, i18n ES/EN)
- **Animations:** GSAP (hero typewriter + landing cascade)
- **Styling:** Vanilla CSS — [Atomic Design](https://atomicdesign.bradfrost.com/) methodology
- **Color:** OKLCH 3-Layer Design Tokens
- **Testing:** Playwright + Vitest
- **Deploy:** Vercel (auto-deploy on `master` push)
- **Analytics:** Vercel Analytics + Speed Insights

---

## Architecture

### Atomic Design CSS

CSS organized in 5 progressive layers (Brad Frost methodology):

| Layer | Files | Contents |
|-------|-------|----------|
| Atoms | `tokens.css`, `base.css` | OKLCH primitives, semantic tokens, reset, typography |
| Molecules | `components.css` | `.btn`, `.glass-card`, `.tag`, `.pricing-card`, `.faq-item` |
| Organisms | `components.css` | `.navbar`, `.hero`, `.pricing`, `.mobile-menu` |
| Templates | `responsive.css` | Breakpoints, grid, container constraints |
| Pages | `responsive.css` | Instance-specific overrides |

### 3-Layer OKLCH Tokens

```
Layer 1: OKLCH primitives  →  --oklch-terracota: oklch(0.58 0.18 32)
Layer 2: Semantic tokens    →  --accent: var(--oklch-terracota)
Layer 3: Components         →  --radius-lg: 16px; --space-lg: 2rem
```

### Key Principles

- **Mobile first** — `100dvh` with fallback, `safe-area-inset-*`, no sticky hover on touch (`@media (hover: hover)`)
- **Performance** — CSS transitions for isolated states, GSAP only for coordinated sequences
- **Accessibility** — `prefers-reduced-motion` support, focus-visible, aria labels, skip link
- **Typography** — `clamp()` fluid type, `text-wrap: pretty`

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
pnpm test          # headless (Playwright)
pnpm test:headed   # with browser UI
```

---

## Project Structure

```
src/
├── components/       # Astro components (organisms + molecules)
│   ├── Hero.astro        # GSAP typewriter + landing cascade
│   ├── Navbar.astro      # Desktop nav + lang switcher
│   ├── MobileMenu.astro  # Hamburger menu (clip-path anim)
│   ├── Pricing.astro     # Kit 1 pricing section
│   ├── PricingKit1.astro # Web design cards
│   ├── PricingKit2.astro # Growth partner cards
│   ├── Logo.astro        # CorelDRAW SVG export
│   └── ...               # FAQ, CTA, Footer, CaseStudies, etc.
├── layouts/
│   └── BaseLayout.astro  # SEO, OG tags, JSON-LD schema
├── pages/
│   ├── index.astro       # Home (ES)
│   ├── pricing.astro     # Kit 1 (ES)
│   ├── pricing/growth-partner.astro  # Kit 2 (ES)
│   ├── privacy.astro / terms.astro / 404.astro
│   └── en/               # Full English mirror
├── i18n/
│   └── ui.ts             # ES/EN dictionaries (243 keys each)
├── lib/
│   └── constants.ts      # DOMAIN, WHATSAPP_NUMBER
├── scripts/              # Vanilla client-side JS
└── styles/               # Atomic Design CSS (6 files)
```

---

## i18n

- Home page + pricing in **ES** (`/`) and **EN** (`/en/`)
- Language switcher in navbar (ES | EN)
- Both dictionaries must stay in sync (243 leaf keys each)

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