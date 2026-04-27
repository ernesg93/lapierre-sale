## Exploration: content-and-metadata-alignment

### Current State
La landing tiene varias fuentes de verdad comerciales en paralelo (`siteConfig`, texto hardcodeado en componentes, specs OpenSpec legacy y tests con copy fija), y hoy no están alineadas.

Inconsistencias verificadas:
- **Nombre del producto**:
  - `siteConfig.name`: `Lapierre Pulsium SAT` (`src/config/site.ts`)
  - UI visible usa `Lapierre Híbrida Carbono` en `CameraScroll` y `Footer`
  - SEO/OG usa `siteConfig.name` en `openGraph.siteName` y `images.alt` (`app/layout.tsx`), por lo que social metadata puede divergir del contenido visible.
- **Pricing comercial**:
  - Precio principal centralizado: `€ 3.200` (`siteConfig.price`, mostrado en `StickyHeader`)
  - `PurchaseConfig` muestra `1.200€`, `1.350€`, `Desde 15€` y badge `Ahorra 15€` hardcodeados, sin vínculo con `siteConfig`.
- **Especificaciones técnicas**:
  - `siteConfig.specs` define ruedas/frenos como `DT Swiss GR 1600` y `Shimano GRX Hidráulico`.
  - `TechSpecs` muestra `DT Swiss G1800 Spline` y `Shimano Hidráulicos MT200` hardcodeados.
  - `siteConfig.specs` no se consume en rendering actual (fuente “muerta”/desconectada).
- **Mensajes comerciales/WhatsApp**:
  - Mensaje default centralizado (`siteConfig.whatsappMessage`) convive con mensajes comerciales hardcodeados por opción en `PurchaseConfig`.
  - No rompe contrato técnico de URL, pero sí mantiene copy comercial duplicada.
- **Tests y specs/docs desalineados con posible futuro ajuste comercial**:
  - Tests fijan textos concretos (`Lapierre Híbrida Carbono`, `€ 3.200`, mensajes exactos de opciones), lo que acopla cambios de negocio a snapshots textuales.
  - OpenSpec legacy en `openspec/specs/*.md` todavía define títulos/copy específicos (ej. `Footer.md`, `CameraScroll.md`).
  - `ARCHITECTURE.md` menciona constante superior tipo `WHATSAPP_NUMBER`, pero implementación real usa `siteConfig`.

### Affected Areas
- `src/config/site.ts` — Config central actual (nombre, metadata, precio, specs, WhatsApp).
- `app/layout.tsx` — Metadata SEO/OG/Twitter atada a `siteConfig`.
- `components/StickyHeader.tsx` — Renderiza nombre/precio centralizado parcial.
- `components/CameraScroll.tsx` — Hero con nombre y claims técnicos hardcodeados.
- `components/PurchaseConfig.tsx` — Pricing y mensajes comerciales hardcodeados por opción.
- `components/TechSpecs.tsx` — Specs técnicas hardcodeadas y divergentes de `siteConfig.specs`.
- `components/Footer.tsx` — Título comercial hardcodeado + CTA.
- `components/__tests__/StickyHeader.test.tsx` — Asume precio/copy concreto.
- `components/__tests__/CameraScroll.test.tsx` — Asume título hardcodeado concreto.
- `components/__tests__/Footer.test.tsx` — Asume título hardcodeado concreto.
- `components/__tests__/PurchaseConfig.test.tsx` — Asume mensajes comerciales exactos.
- `openspec/specs/CameraScroll.md` — Requisitos con copy explícita actual.
- `openspec/specs/Footer.md` — Requisitos con nombre comercial explícito.
- `ARCHITECTURE.md` — Narrativa técnica de centralización parcialmente desactualizada.

### Approaches
1. **Alineación mínima sobre fuente existente (`siteConfig` como hub comercial temporal)** — Normalizar nombre, pricing y claims clave en `siteConfig` y consumirlos en componentes/metadata/tests/specs estrictamente afectados.
   - Pros: alcance chico, bajo riesgo, respeta objetivo de “alinear sin mezclar mejoras”.
   - Cons: mantiene mezcla de responsabilidades (metadata + dominio comercial) en el mismo archivo.
   - Effort: Medium.

2. **Separar dominio comercial en `src/content/sale.ts` y dejar `siteConfig` sólo para metadata global** — Refactor de responsabilidades + migración de consumidores.
   - Pros: arquitectura más limpia y escalable.
   - Cons: aumenta superficie de cambio (más refactor, más riesgo, más ajustes de tests/docs), se acerca al cambio `centralize-sales-content` histórico.
   - Effort: High.

### Recommendation
Recomiendo **Approach 1** para este cambio: alinear primero todas las salidas comerciales visibles y metadata con una única fuente temporal (`siteConfig`) y actualizar únicamente componentes/tests/specs/docs que hoy contradicen esa fuente.

Guardrail de alcance: **no** tocar performance/scrollytelling engine, navegación, lint hardening ni refactors estructurales amplios. Si luego se quiere separar responsabilidades (`sale.ts`), hacerlo como cambio SDD aparte.

### Risks
- Riesgo de “falsa alineación” si se corrige UI pero no SEO/OG (o viceversa).
- Riesgo de romper tests por acople a copy literal en múltiples suites.
- Riesgo de deuda semántica si `siteConfig.specs` se actualiza pero siguen quedando strings técnicas sueltas en overlays.
- Riesgo de scope creep hacia refactor arquitectónico completo (fuera de objetivo mínimo).

### Ready for Proposal
Yes — listo para `sdd-propose` con alcance mínimo, criterios de no-regresión comercial y exclusiones explícitas de mejoras no relacionadas.
