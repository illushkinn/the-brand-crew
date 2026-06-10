<div align="center">
  <h1>The Brand Crew</h1>
  <p><strong>Páginas web que garpan, para comercios que laburan.</strong></p>
</div>

---

### 🧠 Qué es

Landing page de una agencia de diseño web boutique. Construida con **HTML/CSS vanilla**, **OKLCH 3-layer design tokens**, y deploy instantáneo en **Vercel**.

**0 errores de token audit.** Cada color, cada sombra, cada espacio está tokenizado en 3 capas: primitives → semantics → components.

---

### 🛠️ Stack

```
HTML/CSS   · OKLCH Design Tokens 3-Layer
Vercel     · Lucide Icons · Phosphor Icons
Google Fonts (Prata, Lato, Grand Hotel, JetBrains Mono)
```

---

### 🎨 Design System

| Capa | Archivo | Contenido |
|------|---------|-----------|
| Layer 1 — Primitives | `tokens.css` | Raw OKLCH values (`--ds-gray-0`, `--ds-terracota`) |
| Layer 2 — Semantics | `tokens.css` | Meaningful names (`--color-bg`, `--color-text`) |
| Layer 3 — Components | `index.html` | References Layer 2 only |

---

### 📋 Casos reales

- **Luisito Playa Grande** — Rotisería 1955, menú digital + pedidos WhatsApp
- **Apolonia** — Verdulería de estación, catálogo 122 páginas, PWA

---

### 🚀 Deploy

```bash
vercel --prod
```
