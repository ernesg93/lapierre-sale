# Tasks: Generated Assets Governance

## Phase 1: Governance Baseline

- [x] 1.1 Corregir `.gitignore` para usar patrón Git-compatible anclado a raíz (`/public/frames/manifest.json`) y eliminar la regla inválida con backslashes; valida Requirement “Generated manifest MUST remain untracked and ignored”.
- [x] 1.2 Destrackear `public/frames/manifest.json` del índice (`git rm --cached public/frames/manifest.json`) sin borrar el asset del working tree final; confirma que el cambio queda como delete tracked + archivo ignorado.

## Phase 2: Supported Workflow Documentation

- [x] 2.1 Actualizar `README.md` (sección de manifest/dev/build) para declarar como flujo soportado `npm run dev` y `npm run build`, alineado al Requirement “Contributor docs MUST define supported workflow and bypass risk”.
- [x] 2.2 Documentar explícitamente el riesgo de bypass (`next dev` directo) y el recovery path (`npm run predev` para regenerar `public/frames/manifest.json`), cubriendo el escenario “Bypass behavior includes recovery guidance”.

## Phase 3: Integration Verification (No Build)

- [x] 3.1 Verificación de generación sin build: borrar localmente `public/frames/manifest.json`, ejecutar `npm run predev`, y comprobar que el manifest se recrea antes de runtime usage (escenario “Dev flow regenerates manifest automatically”).
- [x] 3.2 Verificación Git de gobernanza: con el manifest regenerado, ejecutar `git status --ignored` y confirmar que no aparece como diff tracked incidental y sí como ignorado (escenario “Manifest churn stays out of normal diffs”).
- [x] 3.3 Verificación de rechazo de tracking incorrecto: intentar stagear el manifest (`git add -f public/frames/manifest.json`) y registrar en notas de review que debe rechazarse hasta restaurar estado untracked/ignored (escenario “Incorrect tracking is rejected”).

## Phase 4: Governance Closure

- [x] 4.1 Confirmar que `package-lock.json` no trae churn incidental en este cambio y documentar clasificación en review notes, según delta de `dependency-lockfile-governance/spec.md`.
- [x] 4.2 Actualizar este `openspec/changes/generated-assets-governance/tasks.md` marcando `[x]` durante `sdd-apply` y dejar evidencia de comandos/verificaciones ejecutadas.

## Apply Evidence (sdd-apply)

### TDD auditable por tarea (remediation)

| Task | RED (failing first) | GREEN (passing) | Automated evidence |
|---|---|---|---|
| 1.1 | `vitest ... generatedAssetsGovernance.test.ts` falló por import inexistente `../generatedAssetsGovernance` | `vitest ... generatedAssetsGovernance.test.ts` ✅ | `isManifestRootIgnoreRulePresent` valida `/public/frames/manifest.json` en `.gitignore` |
| 1.2 | mismo RED inicial (suite governance inexistente) | `generatedAssetsGovernance.test.ts > keeps manifest outside tracked files and under ignore policy` ✅ | `git ls-files --error-unmatch` (throw esperado) + `git check-ignore` |
| 2.1 | mismo RED inicial | `generatedAssetsGovernance.test.ts > documents supported workflow commands in README` ✅ | `hasSupportedWorkflowDocumentation` |
| 2.2 | mismo RED inicial | `generatedAssetsGovernance.test.ts > documents bypass risk and recovery command in README` ✅ | `hasBypassRecoveryDocumentation` |
| 3.1 | mismo RED inicial | `generatedAssetsGovernance.test.ts > regenerates manifest via predev without executing build` ✅ | `npm run predev` automatizado en test |
| 3.2 | mismo RED inicial | `generatedAssetsGovernance.test.ts > keeps manifest outside tracked files and under ignore policy` ✅ | validación Git automatizada |
| 3.3 | mismo RED inicial | `generatedAssetsGovernance.test.ts > keeps manifest outside tracked files and under ignore policy` ✅ | prueba negativa de tracking incorrecto (estado tracked rechazado) |
| 4.1 | `vitest ... lockfileGovernance.test.ts` falló por `evaluateGovernedGeneratedArtifact is not a function` | `lockfileGovernance.test.ts` ✅ | cobertura de churn incidental para lockfile + governed artifact |
| 4.2 | `vitest ... generatedAssetsGovernance.test.ts` falló por expectativa ausente de evidencia ejecutable para 4.2 | `generatedAssetsGovernance.test.ts > keeps task 4.2 backed by executable evidence in OpenSpec artifacts` ✅ | test ejecutable valida que `tasks.md` y `apply-progress.md` referencian evidencia + comando real |

### Comandos ejecutados (relevantes)

- RED: `npm run test:run -- src/config/__tests__/lockfileGovernance.test.ts src/config/__tests__/generatedAssetsGovernance.test.ts` → fallas esperadas (`evaluateGovernedGeneratedArtifact is not a function`, import `../generatedAssetsGovernance` inexistente).
- GREEN: mismo comando tras implementación → `Test Files 2 passed`, `Tests 13 passed`.
- REMEDIATION 4.2: `npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts` → `Test Files 1 passed`, `Tests 8 passed`.

### Remediation quirúrgica (Windows/Vitest) — estabilidad 3.1

- Objetivo: estabilizar `generatedAssetsGovernance.test.ts > regenerates manifest via predev without executing build` sin ejecutar `build`.
- Cambio mínimo aplicado en test: timeout explícito (`{ timeout: 20_000 }`) + espera acotada post-`npm run predev` para neutralizar flake de IO/proceso en Windows.
- Verificación mínima relevante:
  - `npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts -t "regenerates manifest via predev without executing build"` → `Test Files 1 passed`, `Tests 1 passed`.
  - `npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts src/config/__tests__/lockfileGovernance.test.ts` → `Test Files 2 passed`, `Tests 14 passed`.
