# LLM Design Systems — Standard Reference

## Source
Hardik Pandya's LLM Design Systems methodology
https://hvpandya.com/llm-design-systems

## Why This Standard
LLMs (AI coding agents) need structured, predictable design system references to:
- Generate consistent code without hallucinating values
- Understand the relationship between primitives and semantics
- Make correct decisions about which token to use where
- Audit existing code for violations

## Core Architecture

### 3-Layer Token System

Layer 1: Primitives (--ds-*) — Raw values. Never overridden by theme.
Layer 2: Semantics (--color-*, --space-*, etc.) — Meaning-based aliases. Theme overrides happen here.
Layer 3: Components — Reference Layer 2 ONLY. Never Layer 1 or raw values.

### Required File Structure
```
project-root/
├── tokens.css           # Layer 1 + Layer 2 token definitions
├── specs/
│   ├── foundations/     # color.md, typography.md, spacing.md, etc.
│   ├── tokens/          # token-reference.md (master map)
│   └── components/      # One file per component
└── scripts/
    └── token-audit.js   # CI-ready audit script
```

### AI Agent Rules (for CLAUDE.md / AGENTS.md)
```
## Design System Rules
1. Before writing or modifying UI code, read the relevant spec
2. Use only tokens from tokens.css
3. Components reference Layer 2 semantics ONLY (--color-*, --space-*, etc.)
4. NEVER reference Layer 1 primitives (--ds-*) directly
5. NEVER hardcode raw values (colors, spacing, radii, shadows, z-index)
6. Run token-audit.js before committing — zero errors required
```

## When to Apply
- NEW project bootstrap: MUST create this structure
- EXISTING project refactor: Audit first, then create tokens.css + specs + migrate
- CLIENT project: Adapt token names to brand language, keep architecture identical

## Philosophy
"Design systems aren't just for humans. LLMs read tokens better than they read CSS.
A well-structured token file is the difference between an agent that generates
on-brand code and one that hallucinates random values."
