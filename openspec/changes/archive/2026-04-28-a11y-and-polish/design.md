# Design: A11y and Polish

## Technical Approach

Aplicar un patch quirúrgico sobre la landing actual: mantener la narrativa visual, pero volver confiables tres contratos de accesibilidad: navegación interna, foco visible y experiencia usable con reduced motion. La implementación se concentra en reutilizar componentes existentes, sumar un helper liviano de navegación/foco y agregar un branch mínimo en scrollytelling para usuarios con `prefers-reduced-motion`.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Navegación interna | Mantener `button + scrollIntoView`; usar `<a href="#id">`; helper global | Preferir anchors y completar con helper de foco cuando haga falta | Conserva semántica web real, actualiza hash y reduce lógica ad hoc; el helper cubre foco programático en destinos. |
| Reduced motion | Desactivar solo smooth scroll; mantener canvas animado; render alternativo estático | Render alternativo mínimo en `CameraScroll` | Es el único modo de no depender del scroll/motion pesado sin rediseñar toda la landing. |
| Foco visible | Ajustes por componente; utilidad compartida CSS | Tokens/clases compartidas en `globals.css` | Evita divergencia visual entre header, CTA, footer y FAQ con un patch pequeño. |

## Data Flow

```text
Skip link / nav anchor / CTA secundaria
  -> resolve target id
  -> set hash (native o replaceState)
  -> focus target section/heading (tabIndex=-1)
  -> user continúa con Tab desde el destino

prefers-reduced-motion = true
  -> CameraScroll evita timeline sticky/canvas
  -> render hero estático + CTAs + copy clave
  -> resto de secciones permanece igual
```

## File Changes

| File | Action | Description |
|---|---|---|
| `openspec/changes/a11y-and-polish/design.md` | Create | Diseño técnico del cambio. |
| `app/page.tsx` | Modify | Agregar skip link, `main` etiquetado y punto de entrada claro al contenido. |
| `app/globals.css` | Modify | Definir estilos compartidos para skip link y `focus-visible`. |
| `components/StickyHeader.tsx` | Modify | Reemplazar nav por anchors same-page, mantener estado activo y volver no focusable el CTA oculto. |
| `components/CameraScroll.tsx` | Modify | CTA secundaria con destino confiable y branch de reduced motion sin scrollytelling pesado. |
| `components/FAQ.tsx` | Modify | Foco visible consistente y panel colapsado semánticamente oculto. |
| `components/Footer.tsx` | Modify | Navegación rápida con hash real en lugar de botones imperativos. |
| `app/__tests__/page.test.tsx` | Modify | Verificar skip link / landmark y contrato de navegación. |
| `components/__tests__/StickyHeader.test.tsx` | Modify | Ajustar asserts de `button` a `link` y foco/hash observable. |
| `components/__tests__/CameraScroll.test.tsx` | Modify | Cubrir branch `prefers-reduced-motion` y CTA secundaria. |
| `components/__tests__/FAQ.test.tsx` | Modify | Verificar `hidden`/estado colapsado además de `aria-expanded`. |
| `components/__tests__/Footer.test.tsx` | Modify | Ajustar navegación rápida a links same-page. |

## Interfaces / Contracts

```ts
type SectionTargetId = "config" | "specs" | "trust" | "faq";

type NavigateToSectionOptions = {
  updateHash?: boolean;
  focusTarget?: boolean;
  smooth?: boolean;
};
```

Si se extrae helper, debe resolver `document.getElementById(id)`, aplicar `tabIndex={-1}` al destino si no es naturalmente focusable y hacer `focus({ preventScroll: true })` después de navegar.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | Hash/foco en navegación interna | RTL: click en header/footer/CTA secundaria, assert de `location.hash` y `focus`/destino. |
| Integration | Reduced motion | Mock de `matchMedia` o `useReducedMotion`, assert del branch estático y ausencia de dependencia del timeline sticky. |
| Integration | FAQ accesible | Assert de `aria-expanded`, `aria-controls` y `hidden`/no visibilidad del panel colapsado. |
| Integration | Focus polish | Assert de clases/atributos `focus-visible` en controles clave. |

## Migration / Rollout

No migration required.

## Open Questions

- [ ] Confirmar si el target de foco será la `section` completa o su heading interno; la opción preferida es heading si evita alterar layout/sticky offsets.
