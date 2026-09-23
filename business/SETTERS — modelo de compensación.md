# MODELO DE COMPENSACIÓN — SETTERS

**Estado:** Borrador — pendiente tu OK en los puntos marcados `[DECISIÓN]`
**Fecha:** 22/09/2026
**Contexto:** 2 amigos se suman como setters. Generan tickets de venta para TBC. Compensación basada en revenue closed.

---

## Estructura propuesta

### Tier 1 — Kits ($300 / $700 / $1.500)
**Comisión:** 10% del valor del ticket cerrado

| Kit | Precio | Comisión del setter |
|-----|--------|---------------------|
| Arrancá | $300 USD | $30 USD |
| Crecé | $700 USD | $70 USD |
| Escalá | $1.500 USD | $150 USD |

**Razonamiento:** Kits son el entry point. El setter cierra rápido, el margen de TBC es alto en estos tiers (el deliverable está estandarizado). 10% es generoso pero justificable porque el LTV potencial ( upgrade a Growth Partner) es alto.

### Tier 2 — High-Ticket ($5.000+)
**Comisión:** 2-3% del valor del ticket

| Rango | Comisión estimada |
|-------|-------------------|
| $5.000 - $10.000 | $100 - $300 |
| $10.000 - $25.000 | $200 - $750 |
| $25.000+ | Negociar por caso |

**Razonamiento:** High-ticket = ciclo de venta largo, más involved. La comisión es menor en % pero mayor en $. El setter no entrega el proyecto — solo abre la puerta. El valor está en el relationship, no en el follow-through.

### Tier 3 — Retainer / Growth Partner ($250 / $500 / $1.000)
**Comisión:** 10% del primer mes del retainer

| Retainer mensual | Comisión del setter (1er mes) |
|------------------|-------------------------------|
| $250/mes | $25 |
| $500/mes | $50 |
| $1.000/mes | $100 |

**Razonamiento:** El primer mes es el que necesita "sell". Después el relationship lo mantiene TBC. 10% del primer mes premia el cierre sin crear dependencia de por vida.

**Market context (Argentina 2026):**
- Mantenimiento web puro: $150-250 USD/mes (agencia)
- Redes/community management: $300-700 USD/mes
- Agencia integral: $800-5.000 USD/mes
- **TBC Growth Partner ($250):** arriba del commodity (mantenimiento solo), abajo de agencias de redes. Encaja con cliente que ya invirtió $300-1.500 en la web y quiere que siga funcionando + contenido + soporte.

### [DECISIÓN] — Base fija mensual
**Opción A (recomendada):** Sin base fija. 100% commission-only.
**Opción B:** Base de $500-800 USD/mes que se descuenta de las comisiones.
**Opción C:** Base de $1.000 USD/mes cuando el funnel demuestre >3 cierres/mes consistentes.

**Mi recomendación:** Arrancar sin base (Opción A) por 2-3 meses. Si el funnel funciona → subir a Opción C como retainer. Razón: LATAM data muestra que commission-only sin base genera mejor performance que commission + base baja (el setter se relaja con la base). La base solo tiene sentido cuando el volume justifica el costo fijo.

### [DECISIÓN] — Pago de comisiones
**Opción A (recomendada):** Pago al confirmar pago del cliente (no al cerrar trato).
**Opción B:** Pago 30 días después del cierre.

**Mi recomendación:** Opción A. El setter cobra cuando TBC cobra. Esto alinea incentivos y evita problemas de cash flow.

---

## Quality Gates

Para que una comisión se active, la oportunidad debe pasar estos filtros:

1. **Show rate >70%:** Si el setter agenda 10 calls, al menos 7 deben concretarse. Si baja de 70%, TBC puede pausar la relación.
2. **Lead calificado:** El prospecto debe tener presupuesto real + timeline definido + decisión real (no "estoy viendo opciones").
3. **No cannibalización:** Si el prospecto ya estaba en el pipeline de TBC (contacto previo), no aplica comisión.

### [DECISIÓN] — Attribution window
**Opción A (recomendada):** 30 días. Si el prospecto cierra dentro de 30 días del primer contacto del setter → comisión aplica.
**Opción B:** 60 días.

**Mi recomendación:** 30 días. Más de 30 es ruido. Si no cierra en 30, el prospecto no era del setter.

---

## Gamma Playbook (herramienta del setter)

Cada setter recibe un **Gamma.app deck branded** como manual de ventas. El playbook incluye:

1. **Quiénes somos** — slides 1-3 (problema → solución → propuesta de valor)
2. **Los 3 kits** — slides 4-8 (copy del proposal: features por tier, pricing, CTA)
3. **Casos de éxito** — slides 9-11 (testimonios, métricas, before/after)
4. **Proceso de venta** — slides 12-14 (cómo presentar, objeciones comunes,何时 enviar al closer)
5. **Scripts de outreach** — slides 15-17 (DM, email, WhatsApp templates)
6. **FAQ del setter** — slides 18-20 (preguntas frecuentes del prospecto)

**Generación:** Gamma API REST v1.0 con `themeId` de TBC (brand lock). Contenido estructurado desde los copies del proposal. Export a PPTX para sharing offline.

### [DECISIÓN] — Frecuencia de actualización del playbook
**Opción A:** Quarterly (cada 3 meses).
**Opción B:** Cuando cambien los kits/pricing.

---

## Reglas de oro para setters

1. **No inventar precios.** Si el prospecto pregunta por descuento → escalar a TBC (nunca ofrecer).
2. **No prometer plazos.** "Te conecto con el equipo para confirmar timelines."
3. **Capturar datos.** Nombre, empresa, qué necesita, presupuesto aproximado, timeline.
4. **Follow-up 24h.** Si el prospecto no responde en 24h, un segundo toque. Si no responde en 48h, cerrar el lead como "no interesado por ahora".
5. **Attribution first-touch.** Primer setter en contactar = dueño del lead (no racing).

---

## Flujo de dinero

```
Setter contacta → Prospecto interesa → Setter agenda call con TBC
→ TBC cierra → Cliente paga → TBC paga comisión al setter
```

**Timing:** Comisión se paga dentro de 48h hábiles de confirmar pago del cliente.

**Tracking:** Cada oportunidad se registra en el CRM (engram) con:
- Nombre del prospecto
- Setter que lo trajo
- Fecha de primer contacto
- Stage actual (contactado → calificado → propuesta → cerrado/perdido)
- Ticket final
- Comisión generada
