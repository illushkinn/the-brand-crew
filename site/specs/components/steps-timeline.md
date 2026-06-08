# Component: Steps Timeline (Cómo Funciona)

## Metadata
- **Category**: organism
- **Status**: stable

## Overview
Three-step horizontal/vertical timeline showing the process: Conversamos → Diseño → Estás Online. Mobile: vertical stack. Desktop: horizontal with connecting line. Supports interactive "protagonist" mode where clicking a step highlights it and dims others.

**When to use**: Process/explainer sections with 3–4 sequential steps.
**When not to use**: More than 5 steps, or steps without sequential order.

## Anatomy
```
Mobile:                    Desktop:
┌─────┐                    ┌─────┐  ───  ┌─────┐  ───  ┌─────┐
│  1  │  Conversamos       │  1  │       │  2  │       │  3  │
└─────┘                    └─────┘       └─────┘       └─────┘
┌─────┐                      │            │             │
│  2  │  Diseño              ▼            ▼             ▼
└─────┘                    Conversamos  Diseño      Estás Online
┌─────┐
│  3  │  Estás Online
└─────┘
```

## Tokens Used
- `--color-bg` — section background
- `--color-brand` — step number border, text, connecting line
- `--color-border` — connecting line (desktop)
- `--color-headline` — step title
- `--color-text-dim` — step description
- `--font-display` — step number, step title
- `--font-body` — step description
- `--space-lg`, `--space-md` — spacing
- `--radius-md` — step container
- `--radius-sm` — step number (14px)
- `--shadow-step-active` — active glow
- `--z-overlay` — overlay (50)
- `--z-base` — step default
- `--duration-base` — transitions
- `--ease-default`

## States

### Step Card
| State | Class | Behavior |
|-------|-------|----------|
| Default | `.step` | Transparent border, cursor pointer |
| Active | `.step.is-active` | Scale(1.03), brand border, glow shadow, z-index 60 |
| Dimmed | (via overlay) | Opacity 0.3, grayscale 0.5 |

### Overlay
| State | Class | Behavior |
|-------|-------|----------|
| Hidden | `.steps-overlay` | Opacity 0, pointer-events none |
| Visible | `.steps-overlay.is-visible` | Opacity 1, pointer-events all |

## Code Example
```html
<div class="steps-container">
  <div class="steps-overlay" id="stepsOverlay" aria-hidden="true"></div>
  <div class="step fade-in reveal">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Conversamos</h3>
      <p>Me escribís al WhatsApp y me contás tu idea.</p>
    </div>
  </div>
  <div class="step fade-in fade-in-delay-1 reveal">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>Diseño</h3>
      <p>En 48 horas te entrego resultados.</p>
    </div>
  </div>
  <div class="step fade-in fade-in-delay-2 reveal">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Estás Online</h3>
      <p>Hacemos onboarding y consultoría sin cargo.</p>
    </div>
  </div>
</div>
```

## Cross-References
- Section structure → [Section Base](section-base.md)
- Scroll animation → [motion.md](../foundations/motion.md)
