## Exploration: a11y-and-polish

### Current State
La landing tiene buena base semántica en partes (FAQ usa `aria-expanded`/`aria-controls`, CTAs externas usan `rel="noopener noreferrer"`, anchors internos principales existen: `config/specs/trust/faq`). Sin embargo, hay huecos concretos de accesibilidad y polish de bajo riesgo: varios controles interactivos no exponen foco visible consistente (`StickyHeader`, `Footer`, CTA secundarios de `CameraScroll`, toggles de `FAQ`), navegación interna basada en `button + scrollIntoView` sin fallback de enlace ni manejo de foco post-scroll, y elementos animados/canvas sin señales para usuarios con `prefers-reduced-motion`.

### Affected Areas
- `components/StickyHeader.tsx` — navegación interna hecha con `<button>` sin estilos focus explícitos y CTA animada que puede quedar visualmente oculta pero focusable.
- `components/FAQ.tsx` — botón del acordeón con `focus:outline-none` y sin reemplazo de foco visible; panel colapsado sigue presente en DOM sin `hidden`/`aria-hidden`.
- `components/Footer.tsx` — navegación interna por `<button>` (no enlaces) y sin tratamiento de hash/foco al destino.
- `components/PurchaseConfig.tsx` — buen `focus:ring`, pero falta armonizar criterio en todos los CTAs de la página.
- `components/CameraScroll.tsx` — fuerte dependencia de motion/canvas, sin ruta explícita de reducción de movimiento ni landmarks para orientar navegación asistiva.
- `app/page.tsx` — estructura lineal correcta, pero sin “skip link” para saltar bloque scrollytelling pesado.

### Approaches
1. **A11y Patch Quirúrgico (sin rediseño)** — Ajustes semánticos y de foco únicamente en componentes clave.
   - Pros: Bajo riesgo, impacto alto en teclado/lectores, cambios localizados, fácil de testear con RTL.
   - Cons: No resuelve mejoras visuales profundas ni reestructura narrativa.
   - Effort: Low

2. **Refactor Navegación Interna + Motion Governance** — Migrar botones de navegación interna a anchors donde aplique y agregar estrategia global de motion-reduction.
   - Pros: Semántica más robusta, comportamiento más predecible, mejor consistencia futura.
   - Cons: Toca contratos de interacción transversales y puede alterar micro-UX percibida.
   - Effort: Medium

### Recommendation
Adoptar **A11y Patch Quirúrgico** en esta change: foco visible uniforme (`focus-visible` ring/outline), semántica de navegación interna mínima (usar `<a href="#...">` donde sea enlace real o mantener botón pero con manejo explícito de foco destino), exclusión de foco cuando CTA está visualmente oculta, y soporte básico de `prefers-reduced-motion` en `CameraScroll`/transiciones críticas. Es la opción de **alto impacto / bajo riesgo** alineada al objetivo de polish final.

### Risks
- Ajustar navegación interna (button→anchor o foco programático) puede romper tests actuales basados en roles/nombres si no se actualizan en conjunto.
- Cambios sobre animaciones/visibilidad (`opacity` con motion) pueden introducir regresiones de interacción (elementos focusables no esperados) si no se valida tab-order real.

### Ready for Proposal
Yes — proponer alcance mínimo en `sdd-propose` con checklist explícito por componente, criterios de aceptación de teclado/foco/anchors y pruebas RTL dirigidas a accesibilidad observable.
