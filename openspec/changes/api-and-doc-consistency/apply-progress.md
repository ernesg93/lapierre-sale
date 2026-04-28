# Apply Progress: api-and-doc-consistency

## Mode

Strict TDD (from `openspec/config.yaml` + available Vitest runner)

## Completed Tasks

- [x] 1.1 Inventory contracts/references and baseline drift.
- [x] 1.2 Confirm executable testing truth from runtime files.
- [x] 2.1 RED hook tests for canonical `useActiveSection(sectionIds)` behavior.
- [x] 2.2 GREEN hook implementation removing public threshold parameter.
- [x] 2.3 REFACTOR call-site/docs alignment in `StickyHeader`.
- [x] 2.4 RED/GREEN StickyHeader assertions for active-state and `#faq` contract.
- [x] 3.1 Backfill `test-hardening-and-coverage/apply-progress.md`.
- [x] 3.2 Fix `test-hardening-and-coverage/design.md` file-change references.
- [x] 3.3 Update `test-hardening-and-coverage/verify-report.md` consistency warnings.
- [x] 4.1 Reconcile `TESTING.md` + `openspec/config.yaml` against runtime (no content drift found).
- [x] 4.2 Refresh Engram `sdd/lapierre-sale/testing-capabilities` from runtime truth.
- [x] 4.3 Execute targeted tests + coverage and attach results.
- [x] 4.4 Add executable governance evidence for missing consistency scenarios and FAQ docs/tests contract.
- [x] 4.5 Add consumer-level StickyHeader assertion for `useActiveSection` null state.
- [x] 4.6 Remove stale historical coverage note from remediated OpenSpec artifact.

## TDD Cycle Evidence

| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|------|-----------|-------|------------|-----|-------|-------------|----------|
| 2.1 | `hooks/__tests__/useActiveSection.test.ts` | Unit | ✅ 10/10 (`hook+header` baseline) | ✅ Added failing legacy-threshold rerender contract test | ✅ 6/6 passing | ✅ Multiple scenarios (`null`, winner ratio, no intersect, policy) | ✅ Clean assertions and stable callback/options capture |
| 2.2 | `hooks/__tests__/useActiveSection.test.ts` | Unit | ✅ | ✅ From 2.1 | ✅ `npm test -- --run hooks/__tests__/useActiveSection.test.ts` | ✅ Behavior stays correct across intersecting/non-intersecting entries | ✅ Removed public threshold API/dependency |
| 2.4 | `components/__tests__/StickyHeader.test.tsx` | Integration | ✅ 10/10 (`hook+header` baseline) | ✅ Added stronger active/progress assertions (failed 2 tests initially) | ✅ 7/7 passing after mock/assertion fixes | ✅ Active-state + progress style + canonical hook call + faq hash preserved | ✅ Replaced low-signal smoke assertions |
| 4.4/4.6 | `src/config/__tests__/apiAndDocConsistencyGovernance.test.ts` + `openspec/changes/test-hardening-and-coverage/verify-report.md` | Integration/Artifact | ✅ Existing suite green | ✅ Added missing governance scenarios as failing target | ✅ 3/3 governance tests passing | ✅ Covers artifact existence, remediation traceability, and FAQ docs/tests consistency | ✅ Removed stale coverage-availability suggestion in historical verify artifact |
| 4.5 | `components/__tests__/StickyHeader.test.tsx` | Integration | ✅ Existing StickyHeader suite green | ✅ Added null-active-state consumer assertion target | ✅ StickyHeader suite passes with new case | ✅ Verifies no nav item highlighted when hook returns null | ✅ Kept scope minimal without runtime component changes |

## Verification Evidence

- `npm test -- --run hooks/__tests__/useActiveSection.test.ts components/__tests__/StickyHeader.test.tsx`
  - Result: **2 files passed, 13 tests passed**
- `npm run test:run -- --coverage`
  - Result: **13 files passed, 62 tests passed**
  - Coverage: Statements **83.09%**, Branches **70.83%**, Functions **82.45%**, Lines **86.45%**
- `npm test -- --run src/config/__tests__/apiAndDocConsistencyGovernance.test.ts components/__tests__/StickyHeader.test.tsx`
  - Result: **2 files passed, 11 tests passed**

## Consistency Remediation Notes

- `TESTING.md` and `openspec/config.yaml` already matched executable commands (`npm test`, `npm run test:run -- --coverage`), so **no content change required**.
- Backfill artifacts in `test-hardening-and-coverage` are explicitly marked as consistency remediation (no historical rewrite).
