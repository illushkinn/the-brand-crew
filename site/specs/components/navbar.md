# Component: Navbar

## Metadata
- **Category**: organism
- **Status**: stable

## Overview
Fixed top navigation bar with links, brand name, and hamburger trigger. Auto-hides on scroll past hero. Used on every page.

**When to use**: Always visible on desktop and mobile.
**When not to use**: N/A (main navigation is required).

## Anatomy
```
┌──────────────────────────────────────────────────┐
│ [Brand Text]     Link  Link  Link  Link  [☰]    │
│                                                │
│  navbar-brand-text    navbar-links   hamburger  │
└──────────────────────────────────────────────────┘
```

## Tokens Used
- `--color-text` — link text
- `--color-headline` — brand text (desktop right)
- `--color-brand` — link hover, underline accent
- `--color-nav-bg` — background (dark: `rgba(18,18,18,0.85)`, light: `rgba(245,240,235,0.9)`)
- `--color-border-glass` — bottom border
- `--font-body` — link text + brand text
- `--font-brand` — brand name
- `--space-sm` — action gap
- `--radius-full` — CTA link (mobile)
- `--z-nav` — stacking (1000)
- `--duration-base` — link color transitions
- `--duration-slow` — hide/show transition
- `--ease-default`

## States

### Navbar
| State | Class | Behavior |
|-------|-------|----------|
| Default | `.navbar` | Fixed top, blurred bg, visible |
| Hidden | `.navbar.is-hidden` | `translateY(-100%)`, pointer-events:none |

### Desktop Links
| State | Behavior |
|-------|----------|
| Default | `--color-text`, underline hidden |
| Hover | `--color-brand`, underline slides in (0→100% width) |
| Focus-visible | `outline: 2px solid var(--brand)` |

### Hamburger Button
| State | Behavior |
|-------|----------|
| Default | `--color-text` icon |
| Hover | `--color-brand` |
| Focus-visible | `outline: 2px solid var(--brand)` |

## Code Example
```html
<nav class="navbar" role="navigation" aria-label="Navegación principal">
  <div class="navbar-links" id="navLinks">
    <a href="#como-funciona">Cómo funciona</a>
    <a href="#precios">Precios</a>
    <a href="#faq">FAQ</a>
    <a href="#contacto">Empecemos</a>
  </div>
  <a href="#" class="navbar-brand" aria-label="The Brand Crew — inicio">
    <span class="navbar-brand-text">The Brand Crew</span>
  </a>
  <div class="navbar-actions">
    <button class="hamburger-btn" id="hamburgerBtn" aria-label="Abrir menú" aria-expanded="false">
      <i data-lucide="menu" id="hamburgerMenuIcon"></i>
      <i data-lucide="x" id="hamburgerCloseIcon" style="display:none"></i>
    </button>
  </div>
</nav>
```

## Cross-References
- Desktop nav links → [Mobile Menu](mobile-menu.md)
- Hamburger → [Mobile Menu](mobile-menu.md) trigger
