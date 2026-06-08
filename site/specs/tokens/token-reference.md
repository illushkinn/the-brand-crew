# Token Reference — Master Map

## Layer 1: Primitive Tokens (`--ds-*`)

### Colors

| Token | Value | Category |
|-------|-------|----------|
| `--ds-gray-0` | `oklch(0.04 0.008 280)` | Background |
| `--ds-gray-1` | `oklch(0.08 0.012 280)` | Background |
| `--ds-gray-2` | `oklch(0.11 0.015 280)` | Background |
| `--ds-gray-3` | `oklch(0.2 0.018 280)` | Border |
| `--ds-gray-4` | `oklch(0.6 0.012 280)` | Text |
| `--ds-gray-5` | `oklch(0.8 0.008 280)` | Text |
| `--ds-gray-6` | `oklch(0.95 0.004 280)` | Text |
| `--ds-gray-0-lt` | `oklch(0.97 0.005 80)` | Background (light) |
| `--ds-gray-1-lt` | `oklch(0.95 0.008 80)` | Background (light) |
| `--ds-gray-2-lt` | `oklch(0.93 0.01 80)` | Background (light) |
| `--ds-gray-3-lt` | `oklch(0.85 0.01 80)` | Border (light) |
| `--ds-gray-4-lt` | `oklch(0.5 0.01 280)` | Text (light) |
| `--ds-gray-5-lt` | `oklch(0.3 0.015 280)` | Text (light) |
| `--ds-gray-6-lt` | `oklch(0.15 0.01 280)` | Text (light) |
| `--ds-terracota` | `oklch(0.58 0.18 32)` | Brand |
| `--ds-terracota-hover` | `oklch(0.5 0.16 32)` | Brand |
| `--ds-verde` | `oklch(0.82 0.2 125)` | Brand |
| `--ds-verde-hover` | `oklch(0.72 0.18 125)` | Brand |
| `--ds-ocre` | `oklch(0.72 0.12 75)` | Brand |
| `--ds-white` | `#fff` | Static |
| `--ds-black` | `#121212` | Static |
| `--ds-whatsapp` | `#25D366` | Static |

### Spacing

| Token | Value | Step |
|-------|-------|------|
| `--ds-space-xs` | `0.25rem` | 1 |
| `--ds-space-sm` | `0.5rem` | 2 |
| `--ds-space-md` | `1rem` | 3 |
| `--ds-space-lg` | `1.5rem` | 4 |
| `--ds-space-xl` | `2.5rem` | 5 |
| `--ds-space-2xl` | `4rem` | 6 |
| `--ds-space-3xl` | `6rem` | 7 |
| `--ds-space-4xl` | `8rem` | 8 |

### Typography

| Token | Value |
|-------|-------|
| `--ds-font-sans` | `'Lato', sans-serif` |
| `--ds-font-display` | `'Prata', serif` |
| `--ds-font-mono` | `'JetBrains Mono', monospace` |
| `--ds-font-accent` | `'Grand Hotel', cursive` |
| `--ds-weight-light` | `300` |
| `--ds-weight-normal` | `400` |
| `--ds-weight-medium` | `500` |
| `--ds-weight-semibold` | `600` |
| `--ds-weight-bold` | `700` |
| `--ds-weight-extrabold` | `800` |
| `--ds-weight-black` | `900` |

### Border Radius

| Token | Value |
|-------|-------|
| `--ds-radius-sm` | `8px` |
| `--ds-radius-md` | `12px` |
| `--ds-radius-lg` | `16px` |
| `--ds-radius-full` | `100px` |
| `--ds-radius-round` | `50%` |

### Shadows

| Token | Value |
|-------|-------|
| `--ds-shadow-sm` | `0 4px 16px rgba(0,0,0,0.4)` |
| `--ds-shadow-md` | `0 4px 24px rgba(0,0,0,0.4)` |
| `--ds-shadow-lg` | `0 6px 28px rgba(0,0,0,0.45)` |
| `--ds-shadow-terracota` | `0 4px 20px rgba(221,97,76,0.3)` |
| `--ds-shadow-terracota-lg` | `0 6px 28px rgba(221,97,76,0.45)` |
| `--ds-shadow-whatsapp` | `0 4px 16px rgba(37,211,102,0.35)` |
| `--ds-shadow-whatsapp-hvr` | `0 6px 24px rgba(37,211,102,0.5)` |
| `--ds-shadow-step` | `0 0 30px rgba(221,97,76,0.3)` |

### Z-Index

| Token | Value |
|-------|-------|
| `--ds-z-base` | `1` |
| `--ds-z-overlay` | `50` |
| `--ds-z-fab` | `900` |
| `--ds-z-menu` | `999` |
| `--ds-z-nav` | `1000` |
| `--ds-z-skip` | `10000` |

### Motion

| Token | Value |
|-------|-------|
| `--ds-duration-fast` | `0.2s` |
| `--ds-duration-base` | `0.3s` |
| `--ds-duration-slow` | `0.4s` |
| `--ds-duration-reveal` | `0.6s` |
| `--ds-duration-page` | `0.9s` |
| `--ds-ease-default` | `ease` |
| `--ds-ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--ds-ease-reveal` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ds-ease-menu` | `cubic-bezier(0.45, 0.05, 0.25, 1)` |

---

## Layer 2: Semantic Tokens

### Text Colors

| Token | Dark | Light | When to Use |
|-------|------|-------|-------------|
| `--color-text` | `--ds-gray-5` | `--ds-gray-5-lt` | Body paragraphs, nav links, pricing lines |
| `--color-text-dim` | `--ds-gray-4` | `--ds-gray-4-lt` | Meta text, timestamps, secondary info, captions |
| `--color-heading` | `--ds-gray-6` | `--ds-gray-6-lt` | All headings h1–h4 |
| `--color-headline` | `--ds-gray-6` | `--ds-gray-6-lt` | Synonym for heading |
| `--color-inverse` | `#fff` | `#fff` | Text on dark backgrounds |
| `--color-code` | `--ds-gray-4` | `--ds-gray-4-lt` | Code/mono text |

### Background Colors

| Token | Dark | Light | When to Use |
|-------|------|-------|-------------|
| `--color-bg` | `--ds-gray-0` | `--ds-gray-0-lt` | Page body, section bg (problema, pasos, faq) |
| `--color-bg-alt` | `#1A1A1A` | `#EDE8E0` | Alternating sections (solución, pricing) |
| `--color-bg-card` | `--ds-gray-1` | `--ds-gray-1-lt` | Card backgrounds, footer card |
| `--color-bg-elevated` | `--ds-gray-2` | `--ds-gray-2-lt` | Hover/active card states (future use) |
| `--color-bg-hero` | `#0E0E0E` | `#F0EBE3` | Hero section, CTA section |
| `--color-bg-glass` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.03)` | Glassmorphism backgrounds |
| `--color-bg-code` | `#1A1A1A` | `#EDE8E0` | Code block backgrounds |

### Border Colors

| Token | Dark | Light | When to Use |
|-------|------|-------|-------------|
| `--color-border` | `--ds-gray-3` | `--ds-gray-3-lt` | Default separators, card borders, FAQ |
| `--color-border-thick` | `#333` | `#B8AFA6` | Emphasized borders (future) |
| `--color-border-glass` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` | Glass card borders |

### Brand Colors

| Token | Dark | Light | When to Use |
|-------|------|-------|-------------|
| `--color-brand` | `--ds-terracota` | `#C4513E` | Primary call-to-action, accents, selection |
| `--color-brand-hover` | `--ds-terracota-hover` | `#A83D2E` | Button hover, link hover |
| `--color-accent` | `--ds-terracota` | `#C4513E` | Same as brand (alias) |
| `--color-accent-hover` | `--ds-terracota-hover` | `#A83D2E` | Same as brand-hover |
| `--color-accent-glow` | `rgba(221,97,76,0.15)` | `rgba(196,81,62,0.12)` | Highlight underline, glow behind text |
| `--color-verde` | `--ds-verde` | `#7AB800` | Secondary CTA, success, "sin estrés" |
| `--color-verde-hover` | `--ds-verde-hover` | `#5C8C00` | Secondary CTA hover |
| `--color-ocre` | `--ds-ocre` | `#C49032` | Tertiary accent, "frecuentes" |
| `--color-ocre-hover` | `#C49032` | `#A67A28` | Tertiary accent hover |

### Interactive / UI

| Token | Dark | Light | When to Use |
|-------|------|-------|-------------|
| `--color-nav-bg` | `rgba(18,18,18,0.85)` | `rgba(245,240,235,0.9)` | Navbar background |
| `--color-whatsapp` | `#25D366` | `#25D366` | WhatsApp FAB background |

### Semantic Shadows

| Token | Maps To | When to Use |
|-------|---------|-------------|
| `--shadow-card` | `--ds-shadow-md` | Glass cards, pricing card |
| `--shadow-button` | `--ds-shadow-terracota` | "Empecemos" CTA button |
| `--shadow-button-hover` | `--ds-shadow-terracota-lg` | CTA button hover/focus |
| `--shadow-whatsapp` | `--ds-shadow-whatsapp` | WhatsApp FAB |
| `--shadow-whatsapp-hvr` | `--ds-shadow-whatsapp-hvr` | WhatsApp FAB hover |
| `--shadow-step-active` | `--ds-shadow-step` | Active step highlight |

### Semantic Spacing

| Token | Maps To | When to Use |
|-------|---------|-------------|
| `--space-xs` | `--ds-space-xs` | Tight spacing, icon gaps |
| `--space-sm` | `--ds-space-sm` | Button gaps, nav gaps |
| `--space-md` | `--ds-space-md` | Default gap/padding |
| `--space-lg` | `--ds-space-lg` | Card gaps, section gaps |
| `--space-xl` | `--ds-space-xl` | Hero meta, large gaps |
| `--space-2xl` | `--ds-space-2xl` | Section padding |
| `--space-3xl` | `--ds-space-3xl` | Wide section padding |
| `--space-4xl` | `--ds-space-4xl` | Hero/CTA padding |

### Semantic Typography

| Token | Maps To | When to Use |
|-------|---------|-------------|
| `--font-body` | `--ds-font-sans` | Body text, nav, pricing |
| `--font-display` | `--ds-font-display` | Headings, step numbers |
| `--font-mono` | `--ds-font-mono` | Labels, code, badges |
| `--font-brand` | `--ds-font-accent` | Brand name (navbar — signature feel) |
| `--font-accent` | `--ds-font-accent` | Pull quotes, highlights, decorative emphasis |

### Semantic Radii

| Token | Maps To | When to Use |
|-------|---------|-------------|
| `--radius-sm` | `--ds-radius-sm` | Badges, code blocks |
| `--radius-md` | `--ds-radius-md` | Buttons, cards |
| `--radius-lg` | `--ds-radius-lg` | Glass cards, footer |
| `--radius-full` | `--ds-radius-full` | Pill buttons, badges |
| `--radius-round` | `--ds-radius-round` | Circles, FABs |

### Semantic Z-Index

| Token | Maps To | When to Use |
|-------|---------|-------------|
| `--z-base` | `--ds-z-base` | Default content |
| `--z-overlay` | `--ds-z-overlay` | Steps overlay, gradient line |
| `--z-fab` | `--ds-z-fab` | FAB, WhatsApp, progress |
| `--z-menu` | `--ds-z-menu` | Mobile menu |
| `--z-nav` | `--ds-z-nav` | Navbar |
| `--z-skip` | `--ds-z-skip` | Skip link |

### Semantic Motion

| Token | Maps To | When to Use |
|-------|---------|-------------|
| `--duration-fast` | `--ds-duration-fast` | Quick hovers |
| `--duration-base` | `--ds-duration-base` | Default transitions |
| `--duration-slow` | `--ds-duration-slow` | Menu/panel animations |
| `--duration-reveal` | `--ds-duration-reveal` | Scroll reveal |
| `--duration-page` | `--ds-duration-page` | Page/section enters |
| `--ease-default` | `--ds-ease-default` | Simple transitions |
| `--ease-bounce` | `--ds-ease-bounce` | Playful interactions |
| `--ease-reveal` | `--ds-ease-reveal` | Scroll reveals |
| `--ease-menu` | `--ds-ease-menu` | Menu animations |
