# Component: Section Base

## Metadata
- **Category**: organism
- **Status**: stable

## Overview
Standard page section pattern used across the landing page: label + title + subtitle + content. Each section has consistent padding, optional divider, and scroll-reveal animation.

**When to use**: Every content section on the page.
**When not to use**: Hero, CTA (they have custom layout).

## Anatomy
```
┌──────────────────────────────────────┐
│  EL PROBLEMA              ← .section-label (mono, brand color)
│                                      │
│  El negocio que no está             │
│  en internet, no existe.  ← .section-title (h2)
│                                      │
│  (optional subtitle)      ← .section-sub
│                                      │
│  ┌────┐ ┌────┐ ┌────┐    ← content  │
│  │    │ │    │ │    │     (grid/flex)│
│  └────┘ └────┘ └────┘               │
└──────────────────────────────────────┘

<div class="section-divider"></div>  ← optional separator
```

## Variants
Sections use alternating backgrounds:
- `--color-bg` (default): Problema, Cómo Funciona, FAQ, Por Qué Yo
- `--color-bg-alt`: Solución, Pricing
- `--color-bg-hero`: Hero, CTA Final (custom padding)

## Tokens Used
- `--font-mono` — section label
- `--font-display` — section title
- `--font-body` — section subtitle
- `--color-brand` — label text (terracota)
- `--color-text-dim` — subtitle, body text
- `--color-headline` — title text
- `--color-border` — divider line
- `--space-2xl` — section padding top/bottom
- `--space-lg` — section padding sides
- `--space-lg` — title bottom margin
- `--duration-page` — reveal animation
- `--ease-reveal` — reveal easing

## States
- Scroll reveal: `.reveal` → `.reveal.visible` (IntersectionObserver, 15% threshold)

## Code Example
```html
<section class="section problema reveal" id="servicios" aria-label="El problema que resolvemos">
  <span class="section-label mono text-terracota">El problema</span>
  <h2 class="section-title">El negocio que no está en internet,<br><span class="text-terracota">no existe</span>.</h2>
  <p class="section-sub">Descripción opcional del problema...</p>
  <!-- Content -->
</section>

<div class="section-divider" role="separator" aria-hidden="true"></div>
```

## Section Padding
```css
.section {
  padding: clamp(4rem, 10vw, 8rem) clamp(1.25rem, 5vw, 4rem);
  /* = --space-2xl to --space-4xl, responsive */
}
```

## Cross-References
- Label → color utility class `.text-terracota`
- Title → `h2` heading style
- Divider → Section Divider
- Reveal → [motion.md](../foundations/motion.md)
