# Tasks: API and Doc Consistency

## Phase 1: Foundation / Consistency Audit

- [x] 1.1 Inventory current contracts and references in `hooks/useActiveSection.ts`, `components/StickyHeader.tsx`, `openspec/changes/test-hardening-and-coverage/{design.md,verify-report.md}`, `TESTING.md`, and `openspec/config.yaml` to baseline drift.
- [x] 1.2 Confirm executable testing truth from `package.json` scripts and `vitest.config.mts`; record exact commands/reporters to use as canonical metadata inputs.

## Phase 2: API Canonicalization (TDD)

- [x] 2.1 **RED**: Update `hooks/__tests__/useActiveSection.test.ts` to fail against the canonical API `useActiveSection(sectionIds)`, including `null` before intersections and highest-`intersectionRatio` winner behavior.
- [x] 2.2 **GREEN**: Refactor `hooks/useActiveSection.ts` to remove public `threshold` parameter, keep internal observer threshold policy, and satisfy updated hook tests.
- [x] 2.3 **REFACTOR**: Align call-sites and docs in `components/StickyHeader.tsx` (or adjacent comments) so no consumer depends on threshold overrides.
- [x] 2.4 **RED/GREEN**: Strengthen `components/__tests__/StickyHeader.test.tsx` with observable active-link assertions from mocked hook outputs and preserve `#faq` navigation/hash contract.

## Phase 3: Artifact Backfill and OpenSpec Traceability

- [x] 3.1 Create `openspec/changes/test-hardening-and-coverage/apply-progress.md` as consistency remediation backfill, summarizing existing TDD/apply evidence already reflected by verify.
- [x] 3.2 Update `openspec/changes/test-hardening-and-coverage/design.md` file-change tables/references so every listed artifact path exists.
- [x] 3.3 Update `openspec/changes/test-hardening-and-coverage/verify-report.md` to remove stale missing-artifact warnings and explicitly note remediation closure.

## Phase 4: Testing Metadata Sync and Verification

- [x] 4.1 Reconcile `TESTING.md` and `openspec/config.yaml` with executable commands; modify only if drift exists, otherwise document “no content change required” in change notes.
- [x] 4.2 Persist refreshed testing-capabilities snapshot to Engram topic `sdd/lapierre-sale/testing-capabilities` from filesystem/runtime truth.
- [x] 4.3 Run targeted verification (`npm test` for StickyHeader/useActiveSection suites and coverage command from config) and attach results to `api-and-doc-consistency` apply/verify artifacts.
