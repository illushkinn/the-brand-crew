# Foundation: Border Radius

## Overview

Five border-radius tokens: three geometric (sm/md/lg) and two special (full/round). All use `px` values except `--radius-round` (percentage).

## Token Table

| Token | Value | Visual | Usage |
|-------|-------|--------|-------|
| `--radius-sm` | 8px | Slightly rounded | Badges, small UI elements, code blocks, skip link bottom |
| `--radius-md` | 12px | Medium rounded | Buttons, cards, pricing sections, FAQ items |
| `--radius-lg` | 16px | Generous rounded | Glass cards, quote blocks, footer card |
| `--radius-full` | 100px | Pill shape | CTA button "Empecemos", hero badge, nav pills |
| `--radius-round` | 50% | Perfect circle | Hero shapes, progress circle, FAB, dot separators |

## Usage Examples

```css
/* Card */
.glass-card {
  border-radius: var(--radius-lg);
}

/* Button */
.btn {
  border-radius: var(--radius-md);
}

/* Pill button */
.btn-empecemos {
  border-radius: var(--radius-full);
}

/* Circular elements */
.whatsapp-fab {
  border-radius: var(--radius-round);
}
```

## Rules

1. Do not hardcode radius values — always use the token.
2. For square elements (dividers, gradient lines), do not set border-radius at all.
3. `--radius-round` is for circles only (equal width/height).
4. `--radius-full` is for pill shapes on rectangular elements.
5. If a radius doesn't fit any token, consider adding a new step (e.g., `--radius-xs: 4px`).
