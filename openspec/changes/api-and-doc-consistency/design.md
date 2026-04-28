# Design: API and Doc Consistency

## Technical Approach

Aplicar una remediación mínima y contract-first en dos carriles: (1) canonicalizar `useActiveSection` al contrato que ya consume producción (`useActiveSection(sectionIds)`), dejando la política de visibilidad dentro del hook; (2) cerrar drift de artefactos/testing usando el filesystem y los comandos reales (`package.json`, `vitest.config.mts`, `TESTING.md`, `openspec/config.yaml`) como fuente de verdad para OpenSpec y Engram.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Contrato de `useActiveSection` | Hacer funcional `threshold`; mantener parámetro no usado; removerlo del contrato público | Remover `threshold` del API pública y tratar thresholds como política interna | El único consumidor real (`components/StickyHeader.tsx`) no pasa overrides, y hoy el hook ya opera con thresholds fijos. Volver configurable el runtime abre riesgo de regresión sin necesidad del cambio. |
| Remediación de artefactos faltantes | Reescribir verify/design históricos; crear backfill mínimo | Backfill mínimo en `test-hardening-and-coverage` | El verify ya referencia `apply-progress.md`; crear ese archivo y corregir tablas/referencias mantiene trazabilidad sin reescribir historia archivada. |
| Fuente de verdad de testing | Engram primero; docs primero; runtime primero | Runtime/filesystem primero, luego sincronizar docs y Engram | `package.json`, `vitest.config.mts`, `TESTING.md` y `openspec/config.yaml` ya describen comandos ejecutables; Engram está stale y debe seguir a esa evidencia. |

## Data Flow

```text
IntersectionObserver entries
        -> hooks/useActiveSection.ts (internal thresholds + highest ratio)
        -> activeId
        -> components/StickyHeader.tsx active link state

Runtime truth (package.json / vitest.config.mts / TESTING.md / openspec/config.yaml)
        -> test-hardening-and-coverage backfill artifacts
        -> Engram topic sdd/lapierre-sale/testing-capabilities
```

## File Changes

| File | Action | Description |
|---|---|---|
| `hooks/useActiveSection.ts` | Modify | Remove unused `threshold` parameter, update JSDoc, and keep internal observer threshold array as policy. |
| `hooks/__tests__/useActiveSection.test.ts` | Modify | Assert canonical signature behavior: null before intersections, highest-ratio selection, and observer configured with internal thresholds. |
| `components/StickyHeader.tsx` | Verify/Minimal modify | Preserve `useActiveSection(sectionIds)` call; touch only if needed to clarify canonical contract locally. |
| `components/__tests__/StickyHeader.test.tsx` | Modify | Replace low-signal active-link assertions with observable active-state coverage tied to mocked hook output. |
| `openspec/changes/test-hardening-and-coverage/apply-progress.md` | Create | Backfill missing artifact referenced by verify report with existing TDD evidence summary. |
| `openspec/changes/test-hardening-and-coverage/design.md` | Modify | Align file-change table with actual touched files (`eslint.config.mjs` already called out by verify). |
| `openspec/changes/test-hardening-and-coverage/verify-report.md` | Modify | Remove/adjust stale warnings once backfill and audit-trail corrections are in place. |
| `TESTING.md` / `openspec/config.yaml` | Audit then modify-if-needed | Only update if wording still diverges from executable commands; otherwise leave unchanged and sync Engram only. |

## Interfaces / Contracts

```ts
export default function useActiveSection(sectionIds: string[]): string | null
```

- StickyHeader contract: callers MUST NOT supply visibility overrides.
- Hook policy: active section is the intersecting target with the highest `intersectionRatio`; before any intersection the result is `null`.
- Governance contract: OpenSpec/design/verify/docs MUST reference only files that exist, and testing metadata MUST match runnable commands.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | `useActiveSection` canonical contract | Extend Vitest hook tests for observer setup and highest-ratio behavior. |
| Integration | StickyHeader active-state behavior | Mock hook return values and assert only the intended nav item is rendered active while `#faq` navigation still works. |
| Structural | Artifact/doc consistency | Verify referenced paths exist and compare docs/config commands against `package.json` + `vitest.config.mts`. |

## Migration / Rollout

No migration required. Rollout is a single remediation pass: normalize hook contract, backfill active-change artifacts, then refresh Engram testing capabilities from filesystem truth.

## Open Questions

- [ ] None blocking. Archived artifacts such as `premium-header-enhancement` should remain unchanged; only active-change remediation is in scope.
