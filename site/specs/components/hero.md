# Component: Hero

## Metadata
- **Category**: organism
- **Status**: stable

## Overview
Full-viewport hero section with animated glassmorphism shapes, main headline, subheading, meta info, and CTA. The first thing users see.

**When to use**: Top of the landing page only. One per page.
**When not to use**: Inner pages, blog posts, or admin sections.

## Anatomy
```
┌──────────────────────────────────────────────────┐
│                                                  │
│   [Hero Shapes — animated blurred circles]       │
│                                                  │
│   Páginas web que garpan                         │
│   Para comercios que laburan                     │
│   Diseño + desarrollo · Dominio + hosting · $140K│
│                                                  │
│   [Más info]                                     │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Tokens Used
- `--color-bg-hero` — section background
- `--color-headline` — hero-sub text
- `--color-text-dim` — meta text
- `--color-brand` — highlight spans, dot separator
- `--color-ocre` — secondary highlight
- `--color-verde` — badge text
- `--color-accent-glow` — heading highlight underline
- `--color-inverse` — badge border
- `--font-display` — h1 (overridden by `.hero-title` class)
- `--font-body` — hero-title (Lato, weight 900, oversized statement)
- `--font-body` — hero-sub, meta
- `--font-mono` — badge
- `--space-sm`, `--space-md`, `--space-lg`, `--space-xl` — spacing
- `--radius-full` — badge pill
- `--radius-round` — shapes
- `--z-base` — content z-index

## States
- Static section (no interactive states except buttons within)
- Heading `.highlight` has accent-glow underline decoration

## Code Example
```html
<section class="hero reveal" id="inicio" aria-label="Hero principal">
  <div class="hero-shapes" aria-hidden="true">
    <div class="hero-shape"></div>
    <div class="hero-shape"></div>
    <div class="hero-shape"></div>
    <div class="hero-shape"></div>
  </div>
  <div class="hero-content">
    <h1 class="hero-title">Páginas web que <span class="text-terracota">garpan</span></h1>
    <p class="hero-sub">Para comercios que <span class="text-terracota">laburan</span></p>
    <p class="hero-meta">
      Diseño + desarrollo <span class="dot-sep"></span>
      Dominio + hosting <span class="dot-sep"></span>
      Desde <strong>$140.000</strong>
    </p>
    <div class="hero-actions">
      <a href="#servicios" class="btn btn-secondary btn-lg">Más info</a>
    </div>
  </div>
</section>
```

## Cross-References
- Buttons → [Button System](button-system.md)
- Reveal animation → [Section Base](section-base.md)
