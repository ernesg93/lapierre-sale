# Apply Progress: quality-gates-recovery

## Mode

- Strict TDD (from `openspec/config.yaml`)

## Completed Tasks

- [x] 1.1 Baseline lint ejecutado y scope confirmado.
- [x] 1.2 Baseline type-check ejecutado y falla tipada documentada.
- [x] 1.3 Strictness preservada (sin cambios en `tsconfig*`, `eslint*`, `package.json`, lockfiles).
- [x] 2.1–2.3 `CameraScroll.test.tsx` tipado de mocks `useScroll`/`useTransform` + `MockMotionValue` local.
- [x] 2.4–2.6 `StickyHeader.test.tsx` reemplazo de `any` por props tipadas y contratos de mock acotados.
- [x] 2.7–2.8 `useActiveSection.test.ts` callback tipado `IntersectionObserverCallback` + factory de entries.
- [x] 3.1 Eliminado estado no usado `framesUrls` en `CameraScroll.tsx`.
- [x] 3.2 Eliminado import no usado `AnimatePresence` en `StickyHeader.tsx`.
- [x] 3.3 Eliminado binding no usado `observers` en `useActiveSection.ts`.
- [x] 4.1 `npm run lint` en verde (0 errores / 0 warnings).
- [x] 4.2 `npx tsc --noEmit` en verde (0 errores).
- [x] 4.3 Tests focalizados en verde.
- [x] 4.4 Diff auditado: cambio técnico acotado, sin cambios de producto/contenido.

## Verification Evidence

- Safety net pre-cambio: `npx vitest run components/__tests__/CameraScroll.test.tsx components/__tests__/StickyHeader.test.tsx hooks/__tests__/useActiveSection.test.ts` → **3 files / 15 tests passing**.
- Post-cambio:
  - `npm run lint` → **pass**
  - `npx tsc --noEmit` → **pass**
  - `npx vitest run components/__tests__/CameraScroll.test.tsx components/__tests__/StickyHeader.test.tsx hooks/__tests__/useActiveSection.test.ts` → **3 files / 15 tests passing**

## TDD Cycle Evidence

| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|------|-----------|-------|------------|-----|-------|-------------|----------|
| 2.1–2.3 | `components/__tests__/CameraScroll.test.tsx` | Integration | ✅ 6/6 | ✅ Baseline failure captured (`lint` + `tsc`) | ✅ Pass | ✅ Existing multi-case suite | ✅ Typed helper extraction |
| 2.4–2.6 | `components/__tests__/StickyHeader.test.tsx` | Integration | ✅ 7/7 | ✅ Baseline lint failures captured | ✅ Pass | ✅ Existing multi-case suite | ✅ Narrow typed mock contracts |
| 2.7–2.8 | `hooks/__tests__/useActiveSection.test.ts` | Unit | ✅ 3/3 | ✅ Baseline lint failures captured | ✅ Pass | ✅ 2+ scenarios already covered | ✅ Entry factory + typed callback |

## Notes

- No deviations from spec/design.
- No changes to product behavior, copy, pricing, metadata, or scrollytelling output.
