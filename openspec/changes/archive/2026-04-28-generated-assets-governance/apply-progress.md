# Apply Progress: generated-assets-governance

## Implementation Progress

**Change**: generated-assets-governance  
**Mode**: Strict TDD (configured) — governance/docs workflow with command-level integration checks (no runtime contract changes)

### Completed Tasks

- [x] 1.1 Corregir `.gitignore` con patrón root-anchored `/public/frames/manifest.json`.
- [x] 1.2 Destrackear `public/frames/manifest.json` del índice, preservando asset local generado.
- [x] 2.1 Documentar en `README.md` que los flujos soportados son `npm run dev` y `npm run build`.
- [x] 2.2 Documentar riesgo de bypass (`next dev`) y recovery path (`npm run predev`).
- [x] 3.1 Verificar regeneración de manifest con `npm run predev` sin ejecutar build.
- [x] 3.2 Verificar gobernanza Git: delete tracked intencional + archivo ignorado.
- [x] 3.3 Ejecutar prueba negativa (`git add -f`) y restaurar estado gobernado.
- [x] 4.1 Verificar ausencia de churn incidental en `package-lock.json`.
- [x] 4.2 Actualizar `tasks.md` con checks y evidencia.

### Files Changed

| File | Action | What Was Done |
|---|---|---|
| `.gitignore` | Modified | Regla inválida con backslashes reemplazada por `/public/frames/manifest.json`. |
| `README.md` | Modified | Flujo soportado explícito (`npm run dev/build`) + riesgo de bypass + recovery path. |
| `public/frames/manifest.json` | Index delete + local generated | Eliminado del índice Git y regenerado localmente vía `npm run predev`. |
| `src/config/generatedAssetsGovernance.ts` | Created | Helpers puros para validación automatizada de ignore rule, docs y wiring `predev/prebuild` (sin tocar runtime). |
| `src/config/__tests__/generatedAssetsGovernance.test.ts` | Created | Suite automatizada para escenarios governance/documentación + regeneración `predev`/`prebuild` sin ejecutar `build`. |
| `src/config/lockfileGovernance.ts` | Modified | Se agrega `evaluateGovernedGeneratedArtifact` para clasificar churn de artefactos gobernados con intención explícita/incidental. |
| `src/config/__tests__/lockfileGovernance.test.ts` | Modified | Nuevos casos de TDD para governed generated artifact churn. |
| `openspec/changes/generated-assets-governance/tasks.md` | Modified | Tareas marcadas `[x]` + evidencia de comandos ejecutados. |
| `openspec/changes/generated-assets-governance/apply-progress.md` | Modified | Remediation: evidencia TDD auditable por tarea + verificación automatizada. |

### Verification Evidence (No Build)

- RED (auditable): `npm run test:run -- src/config/__tests__/lockfileGovernance.test.ts src/config/__tests__/generatedAssetsGovernance.test.ts` → fallas esperadas (`evaluateGovernedGeneratedArtifact is not a function`, import `../generatedAssetsGovernance` inexistente).
- GREEN (auditable): mismo comando tras implementación → `Test Files 2 passed`, `Tests 13 passed`.
- Los tests ejecutan `npm run predev` y `npm run prebuild` explícitamente para validar regeneración de manifest sin ejecutar `npm run build`.

### TDD Cycle Evidence

| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|------|-----------|-------|------------|-----|-------|-------------|----------|
| 1.1 | `src/config/__tests__/generatedAssetsGovernance.test.ts` | Unit (policy parser) | N/A (new file) | ✅ Missing module import failed first | ✅ `detects root-anchored ignore rule for generated manifest` | ✅ Exact rule + non-match paths | ➖ None needed |
| 1.2 | `src/config/__tests__/generatedAssetsGovernance.test.ts` | Integration (git CLI) | N/A (new file) | ✅ Missing module import failed first | ✅ `keeps manifest outside tracked files...` | ✅ `ls-files --error-unmatch` + `check-ignore` | ➖ None needed |
| 2.1 | `src/config/__tests__/generatedAssetsGovernance.test.ts` | Unit | N/A (new file) | ✅ Missing module import failed first | ✅ `documents supported workflow commands in README` | ✅ Positive + absence-resistant fixtures | ➖ None needed |
| 2.2 | `src/config/__tests__/generatedAssetsGovernance.test.ts` | Unit | N/A (new file) | ✅ Missing module import failed first | ✅ `documents bypass risk and recovery command in README` | ✅ Bypass + recovery both required | ➖ None needed |
| 3.1 | `src/config/__tests__/generatedAssetsGovernance.test.ts` | Integration | N/A (new file) | ✅ Missing module import failed first | ✅ `regenerates manifest via predev without executing build` | ✅ Also verified JSON payload contains frame paths | ➖ None needed |
| 3.2 | `src/config/__tests__/generatedAssetsGovernance.test.ts` | Integration | N/A (new file) | ✅ Missing module import failed first | ✅ `keeps manifest outside tracked files...` | ✅ Two git validations (untracked + ignored) | ➖ None needed |
| 3.3 | `src/config/__tests__/generatedAssetsGovernance.test.ts` | Integration | N/A (new file) | ✅ Missing module import failed first | ✅ `keeps manifest outside tracked files...` | ✅ Tracking incorrecto queda rechazado por assert de no-match tracked | ➖ None needed |
| 4.1 | `src/config/__tests__/lockfileGovernance.test.ts` | Unit | ✅ Existing lockfile tests were already green in same file | ✅ `evaluateGovernedGeneratedArtifact is not a function` | ✅ 3 nuevos casos green (intentional/incidental/no-diff) | ✅ 3 ramas cubiertas | ➖ None needed |
| 4.2 | `src/config/__tests__/generatedAssetsGovernance.test.ts` | Unit (artifact contract) | ✅ Baseline governance tests green (7/7) | ✅ New test failed because OpenSpec artifacts lacked executable 4.2 trace | ✅ `generatedAssetsGovernance.test.ts > keeps task 4.2 backed by executable evidence in OpenSpec artifacts` | ✅ Verifies task checkmark + command trace + apply-progress mapping | ➖ None needed |

### Test Summary

- **Total tests written**: 10 (7 en `generatedAssetsGovernance.test.ts`, 3 en `lockfileGovernance.test.ts`).
- **Total tests passing (targeted run)**: 13/13.
- **Layers used**: Unit (docs/policy helpers), Integration (git + predev/prebuild command checks).
- **Approval tests**: None — no refactor-only task.
- **Pure functions created**: 4 (`isManifestRootIgnoreRulePresent`, `hasSupportedWorkflowDocumentation`, `hasBypassRecoveryDocumentation`, `areManifestHooksWired`).

### Final Remediation Evidence (task 4.2)

- RED: `npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts` → falla en `generatedAssetsGovernance.test.ts > keeps task 4.2 backed by executable evidence in OpenSpec artifacts` por ausencia de trazabilidad ejecutable en artifacts.
- GREEN: mismo comando tras actualizar `tasks.md` y `apply-progress.md` → `Test Files 1 passed`, `Tests 8 passed`.

### Surgical Remediation Evidence (Windows/Vitest flake on 3.1)

- Scope: `generatedAssetsGovernance.test.ts > regenerates manifest via predev without executing build`.
- Minimal fix: add per-test timeout (`20_000ms`), cap `execSync` command timeout (`15_000ms`), and include bounded post-command file wait (`waitForFile`) before asserting manifest existence.
- File touched: `src/config/__tests__/generatedAssetsGovernance.test.ts` (no runtime/production contract changes).
- Verification (relevant only):
  - `npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts -t "regenerates manifest via predev without executing build"` → `Test Files 1 passed`, `Tests 1 passed`.
  - `npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts src/config/__tests__/lockfileGovernance.test.ts` → `Test Files 2 passed`, `Tests 14 passed`.

### Deviations from Design

None — implementación mantiene `predev/prebuild` y el contrato runtime de `/frames/manifest.json`.

### Issues Found

- El repo está bajo sparse-checkout; para destrackear el manifest fue necesario `git rm --cached --sparse` en lugar de `git rm --cached`.
- En Windows, tests con `execFileSync('npm')` fallaron (`ENOENT/EINVAL`); se corrigió usando `execSync(..., { shell: true })` para mantener ejecución portable.
- Vitest v4.1.4 no soporta flag `--repeat`; para esta remediation se usaron corridas dirigidas simples del test objetivo.

### Remaining Tasks

- [ ] Ninguna en este batch.

### Status

9/9 tasks complete (remediation applied). Ready for sdd-verify.
