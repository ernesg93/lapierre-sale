## Verification Report

**Change**: generated-assets-governance  
**Version**: N/A  
**Mode**: Strict TDD

---

### Completeness
| Metric | Value |
|--------|-------|
| Tasks total | 9 |
| Tasks complete | 9 |
| Tasks incomplete | 0 |

All tasks are marked complete in `openspec/changes/generated-assets-governance/tasks.md`.

---

### Build & Tests Execution

**Build**: ➖ Skipped by explicit user constraint (`No ejecutar build`). Static evidence confirms `package.json` still wires `prebuild` to `node scripts/build-frames-manifest.mjs`, but `npm run build` was not executed.

**Tests**: ✅ Targeted 14 passed / ❌ 0 failed / ⚠️ 0 skipped  
Command: `npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts src/config/__tests__/lockfileGovernance.test.ts`

**Focused revalidation of prior red test**: ✅ 3/3 passing runs  
Command: `npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts -t "regenerates manifest via predev without executing build"`

**Regression suite**: ✅ 59 passed / ❌ 0 failed / ⚠️ 0 skipped  
Command: `npm run test:run`

Notable runtime output:
- The previously failing predev test is now stable in this verify pass: the focused command passed 3 consecutive times and the targeted suite passed with 14/14 tests green.
- Full regression remains green; jsdom still emits existing `HTMLCanvasElement.getContext()` warnings outside this change scope.

**Coverage**: ➖ Not available at runtime  
Command attempted: `npm run test:run -- --coverage`  
Result: failed because dependency `@vitest/coverage-v8` is missing.

---

### TDD Compliance
| Check | Result | Details |
|-------|--------|---------|
| TDD Evidence reported | ✅ | `apply-progress.md` includes a complete `TDD Cycle Evidence` table |
| All tasks have tests | ✅ | 9/9 task rows map to executable evidence across the two governance suites |
| RED confirmed (tests exist) | ✅ | Referenced test files exist: `src/config/__tests__/generatedAssetsGovernance.test.ts`, `src/config/__tests__/lockfileGovernance.test.ts` |
| GREEN confirmed (tests pass) | ✅ | Current verification run is green: targeted suite 14/14, focused flaky test 3/3, full regression 59/59 |
| Triangulation adequate | ⚠️ | Incorrect-tracking rejection is still asserted indirectly via governed end state, and build flow is still exercised via `prebuild` rather than `npm run build` |
| Safety Net for modified files | ✅ | Modified `lockfileGovernance.test.ts` has explicit safety-net evidence; new governance test file correctly reports `N/A (new file)` |

**TDD Compliance**: 5/6 checks passed

---

### Test Layer Distribution
| Layer | Tests | Files | Tools |
|-------|-------|-------|-------|
| Unit | 11 | 2 | Vitest |
| Integration | 3 | 1 | Vitest + Node child_process + Git/npm CLI |
| E2E | 0 | 0 | not installed |
| **Total** | **14** | **2** | |

Integration tooling fits detected capabilities; no undeclared E2E stack was introduced.

---

### Changed File Coverage
Coverage analysis skipped at runtime because `npm run test:run -- --coverage` failed with missing dependency `@vitest/coverage-v8`.

---

### Assertion Quality
**Assertion quality**: ✅ All assertions in `src/config/__tests__/generatedAssetsGovernance.test.ts` and `src/config/__tests__/lockfileGovernance.test.ts` verify real behavior. No tautologies, ghost loops, or smoke-test-only patterns found.

---

### Quality Metrics
**Linter**: ✅ No errors (`npx eslint "src/config/generatedAssetsGovernance.ts" "src/config/__tests__/generatedAssetsGovernance.test.ts" "src/config/lockfileGovernance.ts" "src/config/__tests__/lockfileGovernance.test.ts"`)  
**Type Checker**: ✅ No errors (`npx tsc --noEmit`)

---

### Spec Compliance Matrix

| Requirement | Scenario | Test | Result |
|-------------|----------|------|--------|
| Generated manifest MUST remain untracked and ignored | Manifest churn stays out of normal diffs | `generatedAssetsGovernance.test.ts > keeps manifest outside tracked files and under ignore policy` | ✅ COMPLIANT |
| Generated manifest MUST remain untracked and ignored | Incorrect tracking is rejected | `generatedAssetsGovernance.test.ts > keeps manifest outside tracked files and under ignore policy` | ⚠️ PARTIAL |
| Supported flows MUST regenerate manifest before runtime use | Dev flow regenerates manifest automatically | `generatedAssetsGovernance.test.ts > regenerates manifest via predev without executing build` | ✅ COMPLIANT |
| Supported flows MUST regenerate manifest before runtime use | Build flow regenerates manifest automatically | `generatedAssetsGovernance.test.ts > regenerates manifest via prebuild hook command without executing build` | ⚠️ PARTIAL |
| Contributor docs MUST define supported workflow and bypass risk | Supported commands are explicitly documented | `generatedAssetsGovernance.test.ts > documents supported workflow commands in README` | ✅ COMPLIANT |
| Contributor docs MUST define supported workflow and bypass risk | Bypass behavior includes recovery guidance | `generatedAssetsGovernance.test.ts > documents bypass risk and recovery command in README` | ✅ COMPLIANT |
| Incidental lockfile churn MUST be reverted | Lockfile change accepted with explicit dependency intent | `lockfileGovernance.test.ts > allows lockfile diff when dependency intent is explicit` | ✅ COMPLIANT |
| Incidental lockfile churn MUST be reverted | Lockfile churn rejected without dependency intent | `lockfileGovernance.test.ts > reverts lockfile diff when there is incidental churn` | ✅ COMPLIANT |
| Incidental lockfile churn MUST be reverted | Governed generated artifact churn rejected without intent | `lockfileGovernance.test.ts > rejects governed generated artifact churn without explicit intent` | ✅ COMPLIANT |

**Compliance summary**: 7/9 scenarios compliant

---

### Correctness (Static — Structural Evidence)
| Requirement | Status | Notes |
|------------|--------|-------|
| Generated manifest MUST remain untracked and ignored | ⚠️ Partial | `.gitignore` contains `/public/frames/manifest.json`, `git status --short --ignored` shows the tracked delete plus ignored working-tree manifest, and the governance test proves untracked+ignored end state; however the mistaken-stage rejection path is not directly simulated in the automated suite. |
| Supported flows MUST regenerate manifest before runtime use | ⚠️ Partial | `package.json` preserves `predev`/`prebuild`, the predev test is now stable, and the prebuild hook is covered; however `npm run build` itself was intentionally not executed in this verify pass. |
| Contributor docs MUST define supported workflow and bypass risk | ✅ Implemented | `README.md` explicitly documents `npm run dev`, `npm run build`, the risk of direct `next dev`, and recovery via `npm run predev`. |
| Incidental lockfile churn MUST be reverted | ✅ Implemented | `evaluateGovernedGeneratedArtifact` classifies intentional vs incidental governed-asset churn, lockfile tests pass, and current `git diff -- package-lock.json` is empty. |

---

### Coherence (Design)
| Decision | Followed? | Notes |
|----------|-----------|-------|
| Destrackear e ignorar `public/frames/manifest.json` | ✅ Yes | Implemented via root-anchored ignore rule plus index delete; working-tree copy remains ignored. |
| Mantener `scripts/build-frames-manifest.mjs` como fuente de verdad | ✅ Yes | `predev` and `prebuild` still point to the generator script; the script itself was not replaced. |
| Documentar `npm run dev` y `npm run build` como flujo soportado | ✅ Yes | README reflects the exact supported path and bypass recovery guidance. |
| Limitar el scope a gobernanza/docs sin tocar runtime contract | ✅ Yes | `components/CameraScroll.tsx` still fetches `/frames/manifest.json`; no runtime contract change detected. |

---

### Issues Found

**CRITICAL** (must fix before archive):
- None.

**WARNING** (should fix):
- The build-flow spec scenario is still only partially validated: `prebuild` is exercised, but `npm run build` itself was intentionally not run in this verify pass.
- Incorrect tracking rejection is still only partially validated: the suite proves the governed end state, but it does not directly simulate `git add -f public/frames/manifest.json` followed by explicit rejection/restoration assertions.
- `openspec/config.yaml` declares coverage available, but runtime coverage still cannot run because `@vitest/coverage-v8` is not installed.

**SUGGESTION** (nice to have):
- Add a dedicated behavioral test for mistaken staging (`git add -f` + restore) so the rejection scenario becomes fully compliant instead of partial.
- Align testing capabilities/config with reality by either installing the Vitest coverage provider or marking coverage unavailable.

---

### Verdict
PASS WITH WARNINGS

The previously red predev governance test is stabilized in this verification pass, the targeted and full suites are green, and there are no remaining CRITICAL blockers; the change can pass verify with warnings around incomplete behavioral proof for `npm run build`, explicit mistaken-staging coverage, and missing coverage tooling.
