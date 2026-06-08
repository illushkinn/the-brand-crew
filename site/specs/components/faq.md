# Component: FAQ

## Metadata
- **Category**: organism
- **Status**: stable

## Overview
Accordion-style FAQ with expandable questions. Only one item open at a time. Uses Lucide `plus` icon that rotates 45° on open.

**When to use**: Frequently asked questions, support docs.
**When not to use**: Long content (more than 2 paragraphs per answer).

## Anatomy
```
┌─────────────────────────────────────────┐
│ ¿Qué pasa si no me gusta?          [+]  │
├─────────────────────────────────────────┤
│ ¿Me van a robar la plata?          [+]  │
│ ┌─────────────────────────────────────┐ │
│ │ Para empezar pagás $70.000...       │ │
│ │ (expanded content)                  │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ¿Puedo actualizarlo después?       [+]  │
└─────────────────────────────────────────┘
```

## Tokens Used
- `--color-bg` — section background
- `--color-border` — item separators, answer border
- `--color-headline` — question text
- `--color-text-dim` — answer text
- `--color-brand` — question hover, plus icon, divider
- `--font-body` — questions, answers
- `--ds-weight-semibold` — question weight
- `--space-md` — question padding, gap between text and icon
- `--duration-base` — question color transition
- `--duration-slow` — max-height animation
- `--ease-bounce` — plus icon rotation
- `--ease-default` — max-height

## States

### Question Button
| State | Behavior |
|-------|----------|
| Default | `--color-headline` text |
| Hover | `--color-brand` text |
| Focus-visible | outline brand |
| Expanded | `aria-expanded="true"` → plus icon rotates 45° |

### Answer Panel
| State | Behavior |
|-------|----------|
| Closed | `max-height: 0`, padding 0, overflow hidden |
| Open | `.is-open` class → `max-height: scrollHeight`, padding added |

## Code Example
```html
<div class="faq-list">
  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">
      ¿Qué pasa si no me gusta?
      <i data-lucide="plus"></i>
    </button>
    <div class="faq-answer">
      <p>Trabajamos hasta que te guste...</p>
    </div>
  </div>
</div>
```

## Interactive Behavior (JavaScript)
- Clicking a question closes all other items, then toggles current
- `aria-expanded` toggles between `"true"` and `"false"`
- Answer max-height is set via JS: `answer.scrollHeight + 'px'`
- Keyboard: Enter/Space triggers click

## Cross-References
- Section layout → [Section Base](section-base.md)
- Plus icon → Lucide `plus` icon
