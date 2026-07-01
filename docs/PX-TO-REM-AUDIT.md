# Auditoría: px → rem/em Conversión

## 🔍 Análisis Línea por Línea

### ✅ MANTENER en px (Correctos)

| Propiedad | Valor | Razón |
|-----------|-------|-------|
| `border` | `1px`, `2px` | Precisión visual, no afecta accesibilidad |
| `outline` | `2px` | Visual feedback, precisión importante |
| `scrollbar width` | `8px` | System element, precisión necesaria |
| `border-radius` (scrollbar) | `4px` | Small visual detail |
| `filter: blur()` | `22px`, `24px`, `32px`, etc. | Performance + efecto visual |
| `backdrop-filter: blur()` | `12px`, `20px` | Performance + efecto visual |
| `box-shadow` offsets | `0 2px 4px`, `0 8px 24px` | Precisión visual |
| `transform` offsets | `translateY(8px)` | Animación, precisión |
| Media queries | `767px`, `768px` | Breakpoints estándar |

**Total correctos:** ~30 usos

---

### ❌ CAMBIAR a rem/em (Problemas de accesibilidad)

#### 🔴 Alta Prioridad (Afectan accesibilidad)

| Línea | Actual | Debería ser | Impacto |
|-------|--------|-------------|---------|
| 68 | `scroll-padding-top: 56px` | `3.5rem` | Accesibilidad scroll |
| 357 | `min-height: 56px` (navbar) | `3.5rem` | Layout responsive |
| 370 | `min-height: 52px` (scrolled) | `3.25rem` | Layout responsive |
| 387-388 | `width: 44px; height: 44px` (hamburger) | `2.75rem` | Touch target |
| 391 | `padding: 12px` (hamburger) | `0.75rem` | Spacing |
| 390 | `gap: 6px` (hamburger lines) | `0.375rem` | Spacing |
| 401 | `height: 2px` (hamb-line) | `2px` ✅ | **MANTENER** (visual) |
| 252 | `contain-intrinsic-size: auto 600px` | `37.5rem` | Performance hint |

#### 🟡 Media Prioridad (Shapes - decorativas pero inconsistentes)

| Elemento | Actual | Debería ser | Razón |
|----------|--------|-------------|-------|
| `.faq-shape:nth-child(1)` | `width: 200px; height: 180px` | `12.5rem; 11.25rem` | Consistencia |
| `.faq-shape:nth-child(2)` | `width: 170px; height: 160px` | `10.625rem; 10rem` | Consistencia |
| `.faq-shape:nth-child(3)` | `width: 140px; height: 130px` | `8.75rem; 8.125rem` | Consistencia |
| `.hero-shape:nth-child(1)` | `width: 280px; height: 240px` | `17.5rem; 15rem` | Consistencia |
| (+ más shapes) | Múltiples | Conversión completa | Consistencia |

**Total shapes:** ~18-20 declaraciones

#### 🟢 Baja Prioridad (Variables CSS)

| Variable | Actual | Debería ser | Razón |
|----------|--------|-------------|-------|
| `--radius-sm` | `8px` | `0.5rem` | Consistencia |
| `--radius-md` | `12px` | `0.75rem` | Consistencia |
| `--radius-lg` | `16px` | `1rem` | Consistencia |
| `--radius-full` | `100px` | `6.25rem` | Consistencia |
| `max-width: 680px` | `680px` | `42.5rem` | Layout responsive |

---

## 📊 Resumen de Conversión

| Categoría | px encontrados | Mantener | Cambiar |
|-----------|----------------|----------|---------|
| **Borders/Outlines** | 15 | 15 ✅ | 0 |
| **Blur filters** | 8 | 8 ✅ | 0 |
| **Layout (heights/widths)** | 25 | 0 | 25 ❌ |
| **Spacing (padding/margin)** | 8 | 0 | 8 ❌ |
| **Shapes (decorative)** | 20 | 0 | 20 ❌ |
| **Variables CSS** | 6 | 0 | 6 ❌ |
| **Media queries** | 4 | 4 ✅ | 0 |

**Total:** 86 usos de px  
**Mantener:** 27 (31%) ✅  
**Cambiar:** 59 (69%) ❌

---

## 🔧 Plan de Conversión

### Fase 1: Alta Prioridad (accesibilidad crítica)
1. Navbar heights → rem
2. Hamburger button sizing → rem
3. scroll-padding-top → rem
4. Touch targets → rem

**Impacto:** Mejora accesibilidad inmediata

### Fase 2: Media Prioridad (consistencia)
5. Shape widths/heights → rem
6. contain-intrinsic-size → rem

**Impacto:** Código más mantenible

### Fase 3: Baja Prioridad (polish)
7. Variables CSS → rem
8. max-width constraints → rem

**Impacto:** Consistencia completa

---

## 💡 Regla de Conversión

**16px = 1rem** (base del browser)

```
px ÷ 16 = rem

56px ÷ 16 = 3.5rem
44px ÷ 16 = 2.75rem
12px ÷ 16 = 0.75rem
8px ÷ 16 = 0.5rem
```

---

## 🎯 Antes vs Después

### Antes (px):
```css
.navbar {
  min-height: 56px;
  padding: 12px;
}
.hamburger-btn {
  width: 44px;
  height: 44px;
  gap: 6px;
}
```

### Después (rem):
```css
.navbar {
  min-height: 3.5rem;  /* Escala con user settings */
  padding: 0.75rem;
}
.hamburger-btn {
  width: 2.75rem;   /* Touch target accesible */
  height: 2.75rem;
  gap: 0.375rem;
}
```

---

**Estado:** Listo para implementar cambios

