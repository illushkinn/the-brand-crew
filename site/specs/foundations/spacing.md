# Foundation: Spacing

## Overview

An 8-step geometric spacing scale. All spacing values use `rem` units for accessibility (respects user font-size settings).

## Scale

| Token | rem | px (approx) | Typical Use |
|-------|-----|-------------|-------------|
| `--space-xs` | 0.25rem | 4px | Tight gaps, icon spacing |
| `--space-sm` | 0.5rem | 8px | Button gaps, compact padding |
| `--space-md` | 1rem | 16px | Default gap/padding |
| `--space-lg` | 1.5rem | 24px | Section gaps, card padding |
| `--space-xl` | 2.5rem | 40px | Large gaps, hero spacing |
| `--space-2xl` | 4rem | 64px | Section padding top/bottom |
| `--space-3xl` | 6rem | 96px | Wide sections |
| `--space-4xl` | 8rem | 128px | Hero/callout padding |

## Gaps in the Original Scale (Filled)

The original CSS defined 6 tokens but used ~40 hardcoded values. Common gaps that were missing:

| Missing Value | Suggested Token |
|-------------|----------------|
| `2rem` (32px) | Use `--space-xl` (2.5rem) or define as custom |
| `0.6rem` (10px) | Between `--space-xs` and `--space-sm` |
| `0.75rem` (12px) | Between `--space-xs` and `--space-sm` |
| `0.4rem` (6px) | Use `--space-xs` (0.25rem) or custom |
| `3rem` (48px) | Between `--space-xl` (2.5rem) and `--space-2xl` (4rem) |

## Usage

### Padding
```css
/* Section padding */
.section {
  padding: var(--space-2xl) var(--space-lg);
}

/* Card padding */
.glass-card {
  padding: var(--space-xl);
}
```

### Gap (Flex/Grid)
```css
/* Flex gaps */
.navbar-actions {
  gap: var(--space-sm);
}

/* Grid gaps */
.problema-grid {
  gap: var(--space-lg);
}
```

### Margin
```css
/* Section title */
.section-title {
  margin-bottom: var(--space-lg);
}

/* Hero meta */
.hero-meta {
  margin-bottom: var(--space-xl);
}
```

## Rules

1. Use the closest token from the 8-step scale. If none fits, add a new token (don't hardcode).
2. Never use raw `px` values for spacing — always `rem` or the token.
3. Padding/margin on sections should use `--space-2xl` or larger for vertical rhythm.
4. Component gaps should use `--space-sm` to `--space-lg`.
5. Tight UI (icons, badges) uses `--space-xs` to `--space-sm`.
