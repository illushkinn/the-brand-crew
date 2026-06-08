# Component: Footer

## Metadata
- **Category**: organism
- **Status**: stable

## Overview
Footer card inside the CTA section with brand name, CUIT, social links, and credit line. Sits at the bottom of the CTA final section.

**When to use**: Bottom of every page (currently within CTA section).
**When not to use**: Standalone (it's always paired with CTA).

## Anatomy
```
┌──────────────────────────────────────┐
│  Dale, empecemos.                    │  ← .cta-heading (hidden on mobile)
│                                      │
│  The Brand Crew                      │  ← .footer-brand
│  CUIT 20-19025451-9                  │  ← .footer-cuit
│  LinkedIn · Beacons                  │  ← .footer-social
│                                      │
│  Hecho con ♥ e Illya                │  ← .footer-credit
└──────────────────────────────────────┘
```

## Tokens Used
- `--color-bg-card` — footer card background
- `--color-border` — card border, credit top border
- `--color-headline` — brand text
- `--color-text-dim` — CUIT, credit text
- `--color-brand` — social links, heart icon, separator dots
- `--font-body` — brand name + credit text
- `--font-mono` — CUIT
- `--ds-weight-black` — brand weight (900, Lato)
- `--space-lg`, `--space-xs`, `--space-sm` — spacing
- `--radius-lg` — card radius
- `--duration-base` — link hover

## States

### Social Links
| State | Behavior |
|-------|----------|
| Default | `--color-brand` text, no underline |
| Hover | `text-decoration: underline` |
| Focus-visible | outline brand |

## Code Example
```html
<footer class="footer" role="contentinfo">
  <div class="footer-card reveal">
    <h2 class="cta-heading">Dale, <span class="text-terracota">empecemos</span>.</h2>
    <div class="footer-card-content">
      <p class="footer-brand"><span>T</span>he Brand Crew</p>
      <p class="footer-cuit">CUIT 20-19025451-9</p>
      <div class="footer-social">
        <a href="https://www.linkedin.com/in/illya-grytsyk/">LinkedIn</a>
        <span class="footer-sep">·</span>
        <a href="https://beacons.page/illya_studio">Beacons</a>
      </div>
    </div>
    <p class="footer-credit">Hecho con <i data-lucide="heart" style="color:var(--terracota);width:1.1em;height:1.1em;display:inline;vertical-align:middle;"></i> e <strong>Illya</strong></p>
  </div>
</footer>
```

## Cross-References
- CTA section wrapper → [Section Base](section-base.md)
- Button (not in footer currently, but CTA heading links to WhatsApp via parent section)
