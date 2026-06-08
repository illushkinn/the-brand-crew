# Component: Pricing Card

## Metadata
- **Category**: molecule
- **Status**: stable

## Overview
Single pricing card inside a glass container, showing price breakdown, payment split, included features, and CTA. Uses the glass-card base.

**When to use**: Pricing section with one plan (single-offer model).
**When not to use**: Multiple plan comparisons (would need a different layout).

## Anatomy
```
┌──────────────────────────────────────┐
│ ─── Gradient bar (terracota→ocre→verde)
│ Diseño + Desarrollo          $140.000│
│ Dominio (2 años)              $20.000│
│                                      │
│ ┌──────────┐  ┌──────────┐          │
│ │ $70.000  │  │ $70.000  │          │
│ │ Al arranq│  │ A la ent.│          │
│ └──────────┘  └──────────┘          │
│                                      │
│ Incluye: [list of features]          │
│                                      │
│ [Quiero mi página — pill CTA]        │
└──────────────────────────────────────┘
```

## Tokens Used
- `--color-bg-alt` — section background
- `--color-bg-glass` — split-item background
- `--color-border-glass` — pricing lines separator
- `--color-headline` — amounts, labels
- `--color-text` — feature list, compare text
- `--color-text-dim` — small labels, not-includes
- `--color-brand` — gradient bar (1st color), compare strong, CTA
- `--color-ocre` — gradient bar (2nd color)
- `--color-verde` — gradient bar (3rd color), check icons
- `--color-accent-glow` — compare background
- `--color-border` — not-includes dashed border
- `--font-body` — labels, features
- `--font-body` — amounts (900 weight, Lato)
- `--space-md`, `--space-lg`, `--space-sm` — spacing
- `--radius-md`, `--radius-lg` — radii
- `--shadow-card` — glass card elevation

## States
Static card with interactive CTA button inside. No card-level states.

## Code Example
```html
<section class="section pricing reveal" id="precios" aria-label="Precios">
  <h2 class="section-title"><span class="text-verde">Precio justo</span>.</h2>
  <div class="glass-card pricing-card fade-in">
    <!-- Gradient bar via ::before -->
    <div class="pricing-line">
      <span class="pricing-line-label">Diseño + Desarrollo</span>
      <span class="pricing-line-price">$140.000</span>
    </div>
    <div class="pricing-line pricing-line-domain">
      <span class="pricing-line-label">Dominio <small>(2 años)</small></span>
      <span class="pricing-line-price">$20.000</span>
    </div>
    <div class="pricing-split">
      <div class="pricing-split-item">
        <div class="amount">$70.000</div>
        <div class="label">Al arranque</div>
      </div>
      <div class="pricing-split-item">
        <div class="amount">$70.000</div>
        <div class="label">A la entrega</div>
      </div>
    </div>
    <div class="pricing-includes">
      <h4>Incluye</h4>
      <ul>...</ul>
    </div>
    <a href="https://wa.me/5491124063009" class="btn btn-empecemos btn-lg" style="width:100%;justify-content:center;">
      Quiero mi página
    </a>
  </div>
</section>
```

## Cross-References
- Card container → [Glass Card](glass-card.md)
- CTA → [Button System](button-system.md)
- Section layout → [Section Base](section-base.md)
