# Proposal: API and Doc Consistency

## Intent

Eliminar drift entre APIs internas, navegación observable y artefactos de verdad para que `useActiveSection`, `StickyHeader` y la documentación/testing metadata describan el comportamiento real del repo.

## Scope

### In Scope
- Canonicalizar el contrato de `useActiveSection`: decidir si `threshold` sigue siendo parámetro público o pasa a política fija, y reflejarlo en código, tests y specs.
- Corregir la trazabilidad del cambio `test-hardening-and-coverage`: completar el artefacto faltante o ajustar referencias OpenSpec/verify/design para que apunten sólo a archivos reales.
- Sincronizar metadata y documentación de testing con la realidad ejecutable actual, incluyendo el tópico Engram de capacidades de testing.

### Out of Scope
- Rediseñar la lógica de scroll/intersection o introducir un nuevo sistema de detección de secciones.
- Expandir la suite hacia validación visual/canvas o reescribir artefactos históricos fuera de los deltas mínimos necesarios.

## Capabilities

### New Capabilities
- `artifact-consistency-governance`: docs, OpenSpec y metadata persistida MUST referenciar archivos existentes y comandos de testing ejecutables.

### Modified Capabilities
- `StickyHeader`: clarificar el contrato observable de resaltado de sección activa según la política real de detección.
- `landing-section-navigation`: preservar el contrato de navegación `#faq` mientras se alinean tests y documentación asociados.

## Approach

Aplicar remediación contract-first: alinear firmas, specs y artefactos al runtime actual antes de agregar comportamiento nuevo. Sólo si la auditoría muestra dependencia real del parámetro `threshold`, volverlo contrato probado dentro del mismo cambio.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `hooks/useActiveSection.ts` | Modified | Alinear firma/comentarios con comportamiento real. |
| `hooks/__tests__/useActiveSection.test.ts` | Modified | Probar el contrato canónico decidido. |
| `components/StickyHeader.tsx` | Modified | Ajustar consumo si cambia el contrato del hook. |
| `openspec/changes/test-hardening-and-coverage/*` | Modified | Cerrar drift entre design/apply/verify y archivos reales. |
| `TESTING.md`, `openspec/config.yaml`, Engram testing topic | Modified | Sincronizar verdad operativa de testing/cobertura. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Cambio de firma rompa expectativas implícitas | Med | Preferir documentar/remover el parámetro no usado antes que expandir comportamiento. |
| Backfill de artefactos genere ambigüedad histórica | Med | Marcar toda corrección como remediación de consistencia y limitarla al change afectado. |
| Metadata vuelva a desalinearse | Low | Usar comandos/archivos ejecutables como única fuente para actualizar docs y Engram. |

## Rollback Plan

Revertir los archivos tocados del hook/tests/docs/OpenSpec y restaurar el tópico Engram previo si la remediación introduce regresiones o deja la trazabilidad menos clara.

## Dependencies

- Evidencia ya capturada en `sdd/api-and-doc-consistency/explore` y `openspec/changes/api-and-doc-consistency/exploration.md`.

## Success Criteria

- [ ] No queda ninguna API documentada que contradiga su implementación real en el alcance del cambio.
- [ ] OpenSpec/verify/design/docs referencian sólo artefactos existentes y comandos de testing verificables.
- [ ] El contrato de navegación resaltada/`#faq` queda cubierto por specs y tests coherentes.
