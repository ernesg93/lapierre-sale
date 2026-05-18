# Proposal: A11y and Polish

## Intent

Corregir huecos de accesibilidad observables en foco, navegación interna y motion-reduction de la landing sin rediseñar la narrativa ni tocar la arquitectura visual principal.

## Scope

### In Scope
- Unificar foco visible en CTAs, nav interna y acordeón FAQ.
- Hacer que la navegación interna use hash real o enfoque programático confiable al destino.
- Agregar skip link y fallback básico para `prefers-reduced-motion` en la zona scrollytelling.

### Out of Scope
- Rediseño visual de secciones, copy o layout.
- Rehacer la experiencia canvas/scrollytelling completa o sumar E2E.

## Capabilities

### New Capabilities
- `landing-accessibility-polish`: foco visible consistente, skip link, reduced-motion y exclusión de foco en CTAs ocultas.

### Modified Capabilities
- `landing-section-navigation`: la navegación interna debe resolver hash válido y dejar al usuario en un destino navegable por teclado.

## Approach

Aplicar un patch quirúrgico: preferir anchors para navegación real (`StickyHeader`, `Footer`, CTA secundaria de `CameraScroll`); donde quede `scrollIntoView`, completar hash + foco destino. En `FAQ`, reemplazar `focus:outline-none` por `focus-visible` claro y ocultar panel colapsado semánticamente. En `app/page.tsx`/`CameraScroll.tsx`, sumar skip link, landmark mínimo y reducción de motion sin eliminar contenido.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/page.tsx` | Modified | skip link y orden de entrada claro al contenido |
| `components/StickyHeader.tsx` | Modified | nav interna semántica + CTA no focusable cuando está oculta |
| `components/CameraScroll.tsx` | Modified | CTA secundaria navegable + reduced-motion básico/landmark |
| `components/FAQ.tsx` | Modified | foco visible y panel colapsado oculto semánticamente |
| `components/Footer.tsx` | Modified | links internos con hash real |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Cambios de rol/button→link rompen tests | Med | actualizar tests RTL por rol/estado observable |
| Motion/opacity deja elementos focusables fuera de vista | Med | validar tab-order y usar hidden/tabIndex/pointer-events según estado |

## Rollback Plan

Revertir los componentes afectados a su navegación y estilos previos; si reduced-motion degrada la UX, mantener foco/skip link y sacar solo ese branch.

## Dependencies

- Specs delta para `landing-section-navigation` y spec nueva `landing-accessibility-polish`.
- Cobertura con Vitest + React Testing Library.

## Success Criteria

- [ ] Header, footer y CTA secundaria navegan a destinos válidos con hash o foco verificable.
- [ ] Todos los controles interactivos clave muestran `focus-visible` consistente.
- [ ] FAQ no expone contenido colapsado como visible/activo para asistencia.
- [ ] Usuarios con `prefers-reduced-motion` reciben una experiencia funcional sin depender del motion pesado.
