# Component: Mobile Menu

## Metadata
- **Category**: organism
- **Status**: stable

## Overview
Full-screen overlay menu with circular clip-path reveal animation. Triggered by hamburger button. Links stagger in with delays. Uses `inert` attribute for accessibility when closed.

**When to use**: Mobile navigation (<768px). Desktop uses inline navbar links.
**When not to use**: Desktop viewport (hidden via media query).

## Anatomy
```
┌──────────────────────┐
│                      │
│   Cómo funciona      │  ← .mobile-link
│                      │
│      Precios         │
│                      │
│       FAQ            │
│                      │
│    [Empecemos]       │  ← .mobile-link-empecemos (pill)
│                      │
└──────────────────────┘
  Clip-path: circle(0% → 150%)
  BG: #0a0a0f (dark) / #F5F0EB (light)
```

## Tokens Used
- `--color-bg` dark — background (#0a0a0f)
- `--color-headline` — link text
- `--color-brand` — link hover, pill bg
- `--color-inverse` — pill text
- `--color-bg-glass` — (light theme override bg)
- `--font-body` — link text (Lato)
- `--ds-weight-black` — link weight (900)
- `--space-sm` — gap, pill margin-top
- `--radius-full` — pill CTA
- `--z-menu` — stacking (999)
- `--duration-slow` — stagger animation
- `--duration-menu` — clip-path reveal (0.5s)
- `--ease-menu` — clip-path + stagger easing

## States

### Menu Overlay
| State | Class | Behavior |
|-------|-------|----------|
| Closed | `.mobile-menu` | clip-path circle(0%), pointer-events none, inert |
| Open | `.mobile-menu.is-open` | clip-path circle(150%), pointer-events all, inert removed |

### Links
| State | Behavior |
|-------|----------|
| Closed | Opacity 0, translateY(20px) |
| Open | Opacity 1, translateY(0) with staggered delays (80–330ms) |
| Hover | Color → `--color-brand` |
| Focus-visible | Outline brand |

### Stagger Delays
| Link | Delay |
|------|-------|
| 1st | 80ms |
| 2nd | 130ms |
| 3rd | 180ms |
| 4th | 230ms |
| 5th | 280ms |
| 6th | 330ms |

## Code Example
```html
<div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menú de navegación" inert>
  <a href="#como-funciona" class="mobile-link">Cómo funciona</a>
  <a href="#precios" class="mobile-link">Precios</a>
  <a href="#faq" class="mobile-link">FAQ</a>
  <a href="#contacto" class="mobile-link mobile-link-empecemos">Empecemos</a>
</div>
```

## Accessibility
- `inert` attribute prevents focus when closed
- `aria-modal="true"` when open
- Focus moves to first link on open, returns to hamburger on close
- Escape key closes menu
- Clicking outside (on overlay) closes menu

## Cross-References
- Trigger → [Navbar](navbar.md) hamburger button
- Link styles → [Navbar](navbar.md)
- Animation → [motion.md](../foundations/motion.md)
