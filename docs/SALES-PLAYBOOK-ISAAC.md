# Sales Playbook para Isaac

> De DevOps & Backend → Socio de ventas técnicas
> Traducción: conceptos de venta para un ingeniero

---

## 0. Mentalidad: No estás "vendiendo", estás "diagnosticando"

En backend, cuando un cliente te dice "mi app anda lenta", no le vendés un servidor nuevo. Primero hacés:

1. Escuchás el síntoma
2. Revisás logs
3. Encontrás el bottleneck
4. Proponés la solución

**Vender es EXACTAMENTE lo mismo.** Solo cambiás "log" por "conversación", y "bottleneck" por "problema de negocio".

---

## 1. El Pipeline (como CI/CD pero con clientes)

```
LEAD ENTRANTE (de contenido/redes/referido)
    │
    ▼
1. DIAGNÓSTICO GRATUITO (30 min call)
    Illya hace la call, vos escuchás al fondo si querés
    Salida: Growth Diagnosis Report
    │
    ▼
2. PROPÓSAL STAGE
    Illya arma: KIT recomendado + presupuesto
    Isaac revisa: ¿es técnicamente viable? ¿cuántas horas? ¿cuesta algo?
    │
    ▼
3. CIERRE
    Illya presenta, Isaac responde dudas técnicas si aparecen
    │
    ▼
4. DELIVERY
    Isaac construye, Illya testea + entrega + contenido
    │
    ▼
5. POST-VENTA
    Métricas al mes 1 → Illya escribe caso de estudio
    → Referidos → Vuelta al paso 1
```

### Tu rol en cada etapa:

| Etapa | Illya | Isaac |
|-------|-------|-------|
| Diagnóstico | Escucha, diagnostica, genera confianza | Disponible para preguntas técnicas |
| Propuesta | Arma el KIT + precio | Validás esfuerzo técnico |
| Cierre | Presenta, negocia, cierra | Solo entrás si hay duda técnica |
| Delivery | Frontend + QA + contenido | Backend + infra + automatización |
| Post-venta | Caso de estudio + referido | Solo si hay soporte técnico |

---

## 2. El Lead Magnet (para ingenieros)

**Definición para no-ingenieros:** "Un regalo gratis que das a cambio de un email."

**Definición para VOS:** "Una función gratuita que recibe un visitante → ejecuta un callback (email) → devuelve valor inmediato."

### Lo que construimos como lead magnet:

| Recurso | Para qué público | Captura |
|---------|-----------------|---------|
| **Navaja Suiza Digital** (356 herramientas) | Dueños de negocio, emprendedores | Email + segmento |
| **Checklist de accesibilidad gratis** | Pymes, locales | Email |
| **Diagnóstico de marca 360 (30 min)** | Dueños que quieren resultados YA | WhatsApp/Email |

### Cómo funciona el flujo:

```
VISITANTE → LLEGA A LA LANDING
    → VE UN PREVIEW DE 5 HERRAMIENTAS GRATIS (valor)
    → PARA VERLAS TODAS: INGRESA EMAIL + SELECCIONA CATEGORÍA
    → LE LLEGA UN EMAIL AUTOMÁTICO CON LA LISTA COMPLETA
    → A LOS 3 DÍAS: OTRO EMAIL "¿Querés que te ayude a elegir?"
    → SI RESPONDE: LO DERIVAMOS A DIAGNÓSTICO GRATUITO
```

**Como infraestructura, pensalo así:**
- Landing = frontend estático (Netlify/Vercel, $0)
- Captura = formulario → n8n → Google Sheets o Supabase
- Email automático = n8n → cualquier SMTP
- Seguimiento = n8n workflow con delay de 3 días

---

## 3. La Call de Diagnóstico (guión interno)

**Nunca vendas en la primera call.** Solo diagnosticá. Es como un Code Review pero del negocio.

### Preguntas que hace Illya (y por qué):

| Pregunta | Por qué la hace | Qué escucha |
|----------|----------------|-------------|
| "¿A qué te dedicás exactamente?" | Entender el negocio | Industria, tamaño |
| "¿Cuál es tu mayor dolor hoy?" | Encontrar el bottleneck | El problema REAL vs el que menciona |
| "¿Qué intentaste hasta ahora?" | Saber qué no funciona | Evitar repetir errores |
| "¿Cuánto estás gastando en [publicidad/software/personal]?" | Entender presupuesto | Budget real |
| "¿Qué expectativa tenés de este cambio?" | Alinear expectativas | Que no espere magia |
| "¿Para cuándo necesitás resultados?" | Timeline | Urgencia real |

### Si te toca responder algo técnico (a pedido de Illya):

```
Cliente: "¿Pueden integrar con mi sistema de facturación?"
VOS: "Decime cuál usás y qué necesitás que haga.
      Si tiene API, lo conectamos. Si no, vemos alternativas.
      Te confirmo en 24hs con una estimación."
```

NUNCA digas:
- ❌ "Sí, lo puedo hacer en 2 horas" (te van a exigir deadlines imposibles)
- ❌ "No, eso no se puede" (sin analizarlo antes)
- ❌ Un precio sin consultar con Illya

Siempre:
- ✅ "Dame 24hs y te vuelvo con una respuesta concreta."

---

## 4. Objectiones Técnicas (y cómo responderlas)

| Objeción | Respuesta |
|----------|-----------|
| "¿Esto funciona sin internet?" | Depende del KIT. Algunos sí (PWA offline), otros no. Te explico en 2 min. |
| "¿Mis datos están seguros?" | Sí. Infraestructura propia, cifrado, sin datos en servidores externos. | 
| "¿Puedo ver un ejemplo funcionando?" | Te mostramos un caso real. ¿Tenés 5 min para verlo? |
| "Ya tengo desarrollador" | Perfecto, trabajamos con tu equipo. Nosotros hacemos la estrategia + diseño, tu equipo ejecuta. |
| "¿Cuánto cuesta?" | Depende del alcance. Te doy 3 opciones: básica, completa, premium. |

---

## 5. Handoff Illya ↔ Isaac (cómo pasamos la posta)

### Template de handoff:

```
--- HANDOFF: [CLIENTE] ---
PROYECTO: [nombre]
TIPO: [landing / app / asistente / automatización]
URGENCIA: [baja / media / alta]

QUÉ QUIERE EL CLIENTE:
[en lenguaje del cliente, textual]

QUÉ NECESITA REALMENTE (Illya):
[traducción a solución técnica]

STACK SUGERIDO:
- Frontend: [Astro / vanilla / PWA]
- Backend: [n8n / API / Supabase]
- Extra: [VAPI / WhatsApp / ElevenLabs / etc.]

PRESUPUESTO: $XXX
TIMELINE: [X] días/semanas
LO QUE YO (Illya) ENTREGO: [landing / diseño / contenido]
LO QUE VOS (Isaac) ENTREGÁS: [API / n8n flow / infra]

OBSERVACIONES:
[dudas, riesgos, notas]
```

---

## 6. Post-Venta: Cómo generar referidos

El mejor cliente es el que ya te compró. Después de entregar:

| Día 1 | Día 7 | Día 30 | Día 60 |
|-------|-------|--------|--------|
| "¿Anda todo bien?" | Pedir testimonio corto | "¿Viste mejora en X?" + caso de estudio | "¿Conocés a alguien que necesite lo mismo?" |

**Sistema de referidos:** si un cliente nos presenta a otro, su próximo mantenimiento tiene 20% descuento.

---

## 7. Glosario (lo que significan las palabras raras)

| Término | Traducción para ingeniero |
|---------|--------------------------|
| **Lead** | Un potencial cliente que ya dejó su email o WhatsApp |
| **Lead magnet** | Un gancho gratis (PDF, checklist, herramienta) para capturar leads |
| **Funnel** | Pipeline de conversión: visitante → lead → prospecto → cliente |
| **Landing page** | Una página con 1 solo objetivo: capturar el lead |
| **CTA** | Call To Action — el botón que querés que aprieten |
| **Conversión** | El % de personas que hacen lo que querés que hagan |
| **Retargeting** | Mostrarle anuncios a los que no convirtieron |
| **MRR** | Monthly Recurring Revenue — plata que entra todos los meses |
| **LTV** | Cuánto paga un cliente en toda su vida con nosotros |
| **CAC** | Cuánto gastamos en conseguir UN cliente |
| **Upsell** | Ofrecerle más al que ya compró |
| **Cross-sell** | Ofrecerle otro producto relacionado |
| **Lead segmentado** | Saber qué tipo de cliente es antes de venderle |

---

## Bonus: Las 3 reglas de oro para vender (para un ingeniero)

1. **No hables de lo que hacés, hablá del problema que resolvés.** Al cliente no le importa que usás n8n con Python; le importa que sus clientes van a poder sacar turno por WhatsApp sin llamar.

2. **El "no" es dato, no rechazo.** Si un cliente dice que no, tenés más información sobre el mercado. Se llama "validación negativa" y es tan valiosa como la positiva.

3. **Vender es como debuggear:** escuchás, encontrás el error, proponés la solución, verificás que funcione. Misma skill set, distinto contexto.

---

*"Un backend que entiende de ventas es un backend que construye lo que realmente se necesita."*
