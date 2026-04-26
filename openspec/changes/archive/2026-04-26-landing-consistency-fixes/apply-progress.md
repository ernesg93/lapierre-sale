## Implementation Progress (Remediation)

**Change**: landing-consistency-fixes  
**Mode**: Strict TDD  
**Scope**: verify gaps remediation (FAQ hash contract, ghost-loop test, mínima evidencia lockfile governance)

### Completed Tasks
- [x] R1: Ajustado `StickyHeader` para que navegación a FAQ actualice `location.hash` a `#faq` y mantenga scroll suave al destino.
- [x] R2: Corregido test vacuo en `FAQ.test.tsx` evitando ghost loop (ahora valida colección no vacía y estado observable via `aria-expanded`).
- [x] R3: Agregada evidencia ejecutable mínima para `dependency-lockfile-governance` con unidad pura (`evaluateLockfileGovernance`) y escenarios explícitos de aceptación/reversión.

### Files Changed
| File | Action | What was done |
|---|---|---|
| `components/StickyHeader.tsx` | Modified | `scrollToSection` ahora actualiza hash (`#id`) luego de `scrollIntoView` |
| `components/__tests__/StickyHeader.test.tsx` | Modified | Se agregó test de contrato: click en “Preguntas” ⇒ `window.location.hash === #faq` |
| `components/FAQ.tsx` | Modified | Se agregaron `aria-expanded`/`aria-controls` para estados observables del acordeón |
| `components/__tests__/FAQ.test.tsx` | Modified | Se eliminó patrón ghost-loop y se validó colapso inicial por atributos accesibles |
| `src/config/lockfileGovernance.ts` | Added | Función pura para decisión de gobernanza lockfile |
| `src/config/__tests__/lockfileGovernance.test.ts` | Added | Escenarios ejecutables para lockfile con y sin intención de dependencias |

### TDD Cycle Evidence
| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|---|---|---|---|---|---|---|---|
| R1 FAQ hash contract | `components/__tests__/StickyHeader.test.tsx` | Integration | ✅ baseline `FAQ + StickyHeader`: 11/11 | ✅ Written | ✅ Passed | ✅ Added hash + scroll assertion | ✅ Mock cleanup menor |
| R2 Ghost loop removal | `components/__tests__/FAQ.test.tsx` | Integration | ✅ baseline `FAQ + StickyHeader`: 11/11 | ✅ Written | ✅ Passed | ✅ Non-empty + aria state assertions | ✅ Replaced vacuous loop |
| R3 Lockfile governance evidence | `src/config/__tests__/lockfileGovernance.test.ts` | Unit | N/A (new) | ✅ Written | ✅ Passed | ✅ 3 casos (allow/revert/no-diff) | ➖ None needed |

### Test Summary
- **Command**: `npx vitest run "components/__tests__/FAQ.test.tsx" "components/__tests__/StickyHeader.test.tsx" "src/config/__tests__/lockfileGovernance.test.ts"`
- **Result**: 3 files passed, 15 tests passed, 0 failed

### Remaining
- [ ] Re-run `sdd-verify` para confirmar cierre de gaps CRITICAL en reporte.

### Status
Remediation implementada para el scope solicitado. Lista para verify.
