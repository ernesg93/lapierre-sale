# Verification Report

**Change**: landing-consistency-fixes  
**Version**: N/A  
**Mode**: Strict TDD

---

### Scope Notes
- `public/frames/manifest.json` está modificado fuera de scope y fue excluido de esta verificación.
- No se ejecutó build por instrucción explícita del usuario.

---

### Completeness
| Metric | Value |
|--------|-------|
| Tasks total | 16 |
| Tasks complete | 16 |
| Tasks incomplete | 0 |

Todas las tareas de `openspec/changes/landing-consistency-fixes/tasks.md` están marcadas como completas.

---

### Build & Tests Execution

**Build**: ➖ Skipped  
Motivo: instrucción explícita “No ejecutar build”.

**Tests**: ✅ 40 passed / ❌ 0 failed / ⚠️ 0 skipped  
Command: `npm run test:run`
```text
RUN  v4.1.4 D:/Trabajo/store/lapierre-sale
Test Files  11 passed (11)
Tests  40 passed (40)
Duration  56.17s
```

**Relevant targeted tests**: ✅ 25 passed / ❌ 0 failed / ⚠️ 0 skipped  
Command: `npx vitest run "components/__tests__/FAQ.test.tsx" "components/__tests__/Footer.test.tsx" "components/__tests__/PurchaseConfig.test.tsx" "components/__tests__/StickyHeader.test.tsx" "src/config/__tests__/site.test.ts" "src/config/__tests__/lockfileGovernance.test.ts" --reporter=verbose`

**Coverage**: ➖ Not available
```text
MISSING DEPENDENCY  Cannot find dependency '@vitest/coverage-v8'
```

---

### TDD Compliance
| Check | Result | Details |
|-------|--------|---------|
| TDD Evidence reported | ✅ | `apply-progress` incluye tabla `TDD Cycle Evidence` para la remediación verificada |
| All tasks have tests | ✅ | 3/3 filas del `apply-progress` apuntan a archivos de test existentes |
| RED confirmed (tests exist) | ✅ | `StickyHeader.test.tsx`, `FAQ.test.tsx` y `lockfileGovernance.test.ts` existen |
| GREEN confirmed (tests pass) | ✅ | 3/3 archivos reportados pasaron en la ejecución dirigida |
| Triangulation adequate | ✅ | R1 cubre hash + scroll; R2 cubre colección no vacía + estado observable; R3 cubre allow/revert/no-diff |
| Safety Net for modified files | ✅ | R1/R2 declaran baseline en archivos modificados; R3 es archivo nuevo y coincide con `N/A (new)` |

**TDD Compliance**: 6/6 checks passed

---

### Test Layer Distribution
| Layer | Tests | Files | Tools |
|-------|-------|-------|-------|
| Unit | 6 | 2 | Vitest |
| Integration | 19 | 4 | React Testing Library + Vitest |
| E2E | 0 | 0 | not installed |
| **Total** | **25** | **6** | |

---

### Changed File Coverage
Coverage analysis skipped — `openspec/config.yaml` declara cobertura, pero el entorno no tiene instalado `@vitest/coverage-v8`.

---

### Assertion Quality
| File | Line | Assertion | Issue | Severity |
|------|------|-----------|-------|----------|
| `components/__tests__/FAQ.test.tsx` | 48 | `expect(container).toHaveClass('grid-rows-[1fr]')` | Acople a clase CSS / detalle de implementación | WARNING |
| `components/__tests__/FAQ.test.tsx` | 76 | `expect(firstAnswer).toHaveClass('grid-rows-[0fr]')` | Acople a clase CSS / detalle de implementación | WARNING |
| `components/__tests__/PurchaseConfig.test.tsx` | 31 | `expect(buildSpy).toHaveBeenCalledTimes(3)` | Assertion sobre detalle de implementación | WARNING |
| `components/__tests__/StickyHeader.test.tsx` | 107 | `expect(header).toBeInTheDocument()` | Smoke assertion: el nombre del test promete visibilidad inicial pero sólo verifica presencia | WARNING |
| `components/__tests__/StickyHeader.test.tsx` | 130 | `expect(header).toBeInTheDocument()` | Smoke assertion: no valida el cambio de transformación anunciado por el test | WARNING |

**Assertion quality**: 0 CRITICAL, 5 WARNING

---

### Quality Metrics
**Linter**: ⚠️ 8 errors, 1 warning en archivos del change  
- `components/StickyHeader.tsx`: `AnimatePresence` importado y no usado.
- `components/__tests__/StickyHeader.test.tsx`: 8 errores `@typescript-eslint/no-explicit-any`.

**Type Checker**: ✅ Sin errores en archivos del change; el comando repo-level `npx tsc --noEmit` sigue fallando fuera de scope en `components/__tests__/CameraScroll.test.tsx`.

---

### Spec Compliance Matrix

| Requirement | Scenario | Test | Result |
|-------------|----------|------|--------|
| FAQ anchor target MUST exist | Header FAQ link reaches FAQ section | `components/__tests__/StickyHeader.test.tsx > updates hash to #faq when clicking Preguntas navigation` + `components/__tests__/FAQ.test.tsx > exposes exactly one visible faq anchor destination` | ✅ COMPLIANT |
| FAQ anchor target MUST exist | No broken anchor for FAQ | `components/__tests__/StickyHeader.test.tsx > updates hash to #faq when clicking Preguntas navigation` + `components/__tests__/FAQ.test.tsx > exposes exactly one visible faq anchor destination` | ✅ COMPLIANT |
| WhatsApp CTAs MUST use centralized configuration | Footer CTA uses centralized WhatsApp source | `components/__tests__/Footer.test.tsx > uses centralized whatsapp url contract for CTA links` | ✅ COMPLIANT |
| WhatsApp CTAs MUST use centralized configuration | Purchase CTA supports dynamic prefilled message with centralized channel | `components/__tests__/PurchaseConfig.test.tsx > builds CTA whatsapp links from centralized base and dynamic messages` | ✅ COMPLIANT |
| Incidental lockfile churn MUST be reverted | Lockfile change accepted with explicit dependency intent | `src/config/__tests__/lockfileGovernance.test.ts > allows lockfile diff when dependency intent is explicit` | ✅ COMPLIANT |
| Incidental lockfile churn MUST be reverted | Lockfile churn rejected without dependency intent | `src/config/__tests__/lockfileGovernance.test.ts > reverts lockfile diff when there is incidental churn` | ⚠️ PARTIAL |

**Compliance summary**: 5/6 scenarios compliant

Notes:
- El gap CRITICAL previo sobre hash `#faq` quedó resuelto: `StickyHeader.tsx` ahora actualiza `window.location.hash` y el test dirigido lo valida.
- El gap CRITICAL previo del ghost loop en `FAQ.test.tsx` quedó resuelto: ahora se valida colección no vacía y `aria-expanded`.
- El gap CRITICAL previo de escenarios lockfile completamente `UNTESTED` mejoró con `evaluateLockfileGovernance()`, pero el sub-criterio procedural “review notes MUST classify it as incidental churn” sigue documentado sólo en artefactos, no automatizado.

---

### Correctness (Static — Structural Evidence)
| Requirement | Status | Notes |
|------------|--------|-------|
| FAQ anchor target MUST exist | ✅ Implemented | `FAQ.tsx` expone `section#faq`; `StickyHeader.tsx` navega al id y actualiza hash a `#faq`; `app/page.tsx` renderiza ambos componentes en la landing. |
| WhatsApp CTAs MUST use centralized configuration | ✅ Implemented | `Footer.tsx` usa `whatsappUrl`; `PurchaseConfig.tsx` usa `buildWhatsAppUrl(opt.message)`; `Footer.tsx`/`PurchaseConfig.tsx` no contienen `wa.me` ni número hardcodeado. |
| Incidental lockfile churn MUST be reverted | ⚠️ Partial | `package-lock.json` no aparece en diff actual y `evaluateLockfileGovernance()` cubre allow/revert/no-diff, pero la clasificación de review notes sigue sin enforcement automatizado. |

---

### Coherence (Design)
| Decision | Followed? | Notes |
|----------|-----------|-------|
| `FAQ.tsx` agrega `id="faq"` en su `<section>` | ✅ Yes | Coincide con `components/FAQ.tsx`. |
| `site.ts` exporta `buildWhatsAppUrl(message?)` y mantiene `whatsappUrl` | ✅ Yes | Coincide con `src/config/site.ts` y su uso en `Footer`/`PurchaseConfig`. |
| Lockfile governance documental + revert manual si no hay intención | ⚠️ Deviated | Se agregó `src/config/lockfileGovernance.ts` + tests para hacer ejecutable la decisión. La desviación mejora verificabilidad, pero `design.md` y su tabla `File Changes` no fueron actualizados para reflejarla ni para incluir `StickyHeader.tsx` / `StickyHeader.test.tsx`. |

---

### Issues Found

**CRITICAL** (must fix before archive):
None.

**WARNING** (should fix):
- `components/StickyHeader.tsx` y `components/__tests__/StickyHeader.test.tsx` no pasan lint limpio (1 warning + 8 errors) en archivos del change.
- La cobertura sigue no ejecutable en este entorno porque falta `@vitest/coverage-v8`, aunque `openspec/config.yaml` la declara disponible.
- `components/__tests__/FAQ.test.tsx`, `PurchaseConfig.test.tsx` y `StickyHeader.test.tsx` todavía tienen assertions acopladas a implementación o demasiado débiles.
- El escenario procedural completo `Lockfile churn rejected without dependency intent` quedó sólo parcialmente automatizado: falta enforcement explícito para la clasificación de review notes.
- `design.md` quedó desalineado con la implementación final (nuevos archivos y cambios adicionales de remediación no documentados).

**SUGGESTION** (nice to have):
- Agregar un test de integración de `app/page.tsx` que renderice `StickyHeader` + `FAQ` juntos para cerrar el contrato end-to-end de navegación interna en una sola prueba.
- Reemplazar assertions de clases/spy counts por assertions observables de accesibilidad o URL final.
- Si quieren sostener Strict TDD también para gobernanza procedural, mover la clasificación de incidental churn a una regla/script verificable.

---

### Verdict
PASS WITH WARNINGS

Los CRITICAL previos del hash FAQ y del ghost loop quedaron resueltos, y la gobernanza de lockfile ahora tiene evidencia ejecutable parcial. El change ya no muestra bloqueantes CRITICAL, pero todavía arrastra warnings de lint, calidad de tests, cobertura no operativa y desalineación menor entre diseño e implementación.
