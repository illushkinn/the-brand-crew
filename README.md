<div align="center">
  <h1>The Brand Crew</h1>
  <p><strong>Páginas que venden. Para comercios que laburan.</strong></p>
  <br>
</div>

---

## 🎬 Experiencia

Preloader 3D con **Three.js** — estrella de diamante con materiales físicos (clearcoat, reflectividad), partículas y GSAP. Animación cinematográfica que se disuelve para revelar la landing.

---

## 🧠 Design System — OKLCH 3-Layer

| Capa | Contenido |
|------|-----------|
| **Primitives** | Raw OKLCH values (`--ds-gray-0`, `--ds-terracota`) |
| **Semantics** | Meaningful names (`--color-bg`, `--color-text`, `--verde`) |
| **Components** | Solo referencian Layer 2 |

```css
--terracota: oklch(0.55 0.195 30);
--verde: oklch(0.82 0.2 125);
--bg: oklch(0.05 0.005 260);
```

---

## 📋 Casos Reales

| Proyecto | Cliente | Stack |
|----------|---------|-------|
| **Luisito Playa Grande** | Rotisería · 1955 | Astro · Cart Modal · WhatsApp |
| **Apolonia** | Verdulería de estación | Astro · React · PWA · 122 páginas |
| **Catálogo Hoco** | Mayorista accesorios | React · Tailwind · shadcn/ui |

Cada caso tiene brandbook propio y página de detalle.

---

## 🛠️ Stack

```
Three.js · GSAP · HTML/CSS Vanilla · OKLCH 3-Layer
Vercel · Lucide Icons · Phosphor Icons · Google Fonts (Sora, Prata, Grand Hotel)
```

---

## ✨ Detalles Técnicos

- **0 dependencias de framework** — HTML/CSS vanilla + Three.js para el preloader
- **100% tipográfico** — text-wrap: balance en headings, pretty en párrafos
- **Mobile-first** — dvh cascade, safe-area insets, overscroll-behavior
- **CSS audit** — 0 errores de tokens
- **Glassmorphism** — navbar y menú mobile
- **Animaciones** — scroll-reveal, fade-in, cortina GSAP
- **Tracking** — Vercel Speed Insights, Meta Pixel, GA4

---

## 🚀 Deploy

```bash
vercel --prod
```

[thebrandcrew.lat](https://thebrandcrew.lat)
