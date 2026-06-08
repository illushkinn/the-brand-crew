# The Brand Crew — Design System & AI Agent Rules

## Design System Rules

Before writing or modifying any UI code, read the relevant spec file in `site/specs/`.

Use only tokens from `site/tokens.css`. Components MUST reference Layer 2 semantic tokens (`--color-*`, `--space-*`, `--shadow-*`, etc.), NEVER Layer 1 primitives (`--ds-*`) or raw values.

Run `node site/scripts/token-audit.js` before committing. Zero errors required.

## Token Architecture

The design system uses a 3-layer indirection (Hardik Pandya LLM Design Systems methodology):

```
Layer 1: Primitives      site/tokens.css    --ds-gray-0, --ds-terracota, etc.
Layer 2: Semantics       site/tokens.css    --color-text, --space-md, etc.
Layer 3: Components      index.html         Reference Layer 2 ONLY
```

Never bypass layers. Never hardcode values.

## Spec Files

| Path | Content |
|------|---------|
| `site/specs/foundations/color.md` | Color system with OKLCH values |
| `site/specs/foundations/typography.md` | Font families, sizes, weights |
| `site/specs/foundations/spacing.md` | 8-step spacing scale |
| `site/specs/foundations/radius.md` | Border radius tokens |
| `site/specs/foundations/motion.md` | Transitions, animations, scroll-reveal |
| `site/specs/foundations/elevation.md` | Shadows and z-index |
| `site/specs/tokens/token-reference.md` | Master map of every CSS variable |
| `site/specs/components/*.md` | Component specs (navbar, hero, button, etc.) |

## LLM Design Systems Standard
See `docs/llm-design-systems-standard.md` — this is the required architecture for ALL projects.
Every project MUST have: tokens.css (3-layer), specs/ (foundations + components), and token-audit.js.

## Before Committing

1. Run `node site/scripts/token-audit.js` from the project root
2. Fix any ERROR-level issues
3. Review WARNING-level issues and decide if they need fixing
4. Verify zero errors before commit

## Key Facts

- Default theme: dark (`<html data-theme="dark">`)
- Primary brand color: Terracota (OKLCH `oklch(0.58 0.18 32)`, approx #DD614C)
- The OLD `rgba(226,92,58,...)` terracota shadow values are WRONG — use canonical OKLCH terracota
- Canvas: Single-page landing page at `site/index.html`
- Stack: Vanilla HTML/CSS/JS, no framework
- Icons: Lucide + Phosphor
- Hosting: Vercel
