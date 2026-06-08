# Component: WhatsApp FAB

## Metadata
- **Category**: molecule
- **Status**: stable

## Overview
Fixed-position WhatsApp button with shake animation for attention. Lives inside the FAB container. An SVG icon of the WhatsApp logo.

**When to use**: Landing page, always available for contact.
**When not to use**: When inside the FAB container menu (it becomes relative-positioned).

## Anatomy
```
       ┌──────┐
       │  WA  │  ← whatasapp-fab (56×56, circle, green)
       │ icon │
       └──────┘
    Fixed: bottom 24px, right 24px
    z-index: 900
```

## Tokens Used
- `--color-whatsapp` — background (`#25D366`)
- `--color-inverse` — icon fill
- `--radius-round` — circle shape
- `--shadow-whatsapp` — default shadow
- `--shadow-whatsapp-hvr` — hover shadow
- `--z-fab` — stacking (900)
- `--duration-slow` — visibility transition
- `--duration-base` — shadow on hover
- `--duration-fast` — opacity (FAB menu override)

## States

| State | Class | Behavior |
|-------|-------|----------|
| Hidden | `.whatsapp-fab` | Opacity 0, translateY(20), pointer-events none |
| Visible | `.whatsapp-fab.is-visible` | Opacity 1, translateY(0), pointer-events all |
| Hover (visible) | — | `--shadow-whatsapp-hvr`, translateY(-2px) |
| Shake | `.whatsapp-fab.shake` | `fabShake` animation 0.5s (repeats every 30s) |
| Focus-visible | — | outline 2px brand |

## Shake Animation
```
@keyframes fabShake {
  0%, 100% { translateY(0) rotate(0) }
  15%  { translateY(-4px) rotate(-8deg) }
  30%  { translateY(0) rotate(6deg) }
  45%  { translateY(-2px) rotate(-4deg) }
  60%  { translateY(0) rotate(2deg) }
  75%  { translateY(-1px) rotate(-1deg) }
}
```

## Code Example
```html
<a href="https://wa.me/5491124063009"
   target="_blank" rel="noopener"
   class="whatsapp-fab"
   id="whatsappFab"
   aria-label="Contactar por WhatsApp"
   title="Contactar por WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="...WhatsApp SVG path..."/>
  </svg>
</a>
```

## Cross-References
- Container → [FAB Container](fab-container.md)
- Also see: [Progress Circle](progress-circle.md)
