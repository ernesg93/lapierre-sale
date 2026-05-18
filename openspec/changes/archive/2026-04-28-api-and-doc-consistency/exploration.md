## Exploration: api-and-doc-consistency

### Current State
- The repo currently has a consistency drift between internal APIs, docs, and artifacts: `useActiveSection` exposes a `threshold` parameter but does not apply it to `IntersectionObserver` options (`hooks/useActiveSection.ts`).
- Testing docs/runtime are mostly aligned in filesystem (`TESTING.md`, `openspec/config.yaml`, `vitest.config.mts`, `package.json`), but Engram testing capabilities are stale (`sdd/lapierre-sale/testing-capabilities` still says coverage unavailable).
- OpenSpec artifact coherence is partially degraded in active changes: `test-hardening-and-coverage` verify report references a missing filesystem artifact (`openspec/changes/test-hardening-and-coverage/apply-progress.md`) and notes file-table drift in design vs implementation.
- StickyHeader behavior depends on `useActiveSection` default behavior and currently has low-signal assertions in some tests, which weakens the documented behavioral guarantees.

### Affected Areas
- `hooks/useActiveSection.ts` — API/implementation mismatch (`threshold` argument is unused for observer config).
- `hooks/__tests__/useActiveSection.test.ts` — validates active section selection but does not assert configurable-threshold contract.
- `components/StickyHeader.tsx` — consumes `useActiveSection`; any hook contract correction impacts active-link behavior.
- `openspec/changes/test-hardening-and-coverage/verify-report.md` — explicitly reports drift: missing `apply-progress.md` and stale Engram testing-capabilities topic.
- `openspec/changes/test-hardening-and-coverage/design.md` — file-change audit does not fully match implemented edits.
- `TESTING.md`, `openspec/config.yaml`, `vitest.config.mts`, `package.json` — currently coherent in filesystem and serve as source for testing command truth.
- `openspec/specs/StickyHeader.md` + archived `premium-header-enhancement/design.md` — preserve assumptions about active-section behavior and implied threshold semantics.

### Approaches
1. **Contract-first minimal correction** — align API/docs/artifacts to current behavior with bounded edits
   - Pros: low risk, fast, avoids refactor; restores trust in docs/spec artifacts.
   - Cons: does not improve hook flexibility unless explicitly chosen.
   - Effort: Low.

2. **Behavioral correction of hook API** — make `threshold` functional in observer config and update tests/spec/docs accordingly
   - Pros: fulfills existing hook signature promise; cleaner API integrity.
   - Cons: medium regression risk on active-link behavior; needs stronger test updates around intersection semantics.
   - Effort: Medium.

### Recommendation
Use **Approach 1** as the minimal consistency pass for this change: (a) decide and document the canonical `useActiveSection` contract (either remove `threshold` parameter from signature/docs, or keep it but mark as fixed policy); (b) close artifact drift by adding missing OpenSpec apply-progress file and synchronizing design/apply/verify traceability; (c) refresh Engram testing-capabilities topic to reflect real coverage availability. If product wants configurable threshold behavior, schedule it as a separate focused change.

### Risks
- Changing hook signature (if chosen) may break implicit consumer expectations and archived artifact references.
- Backfilling artifacts retroactively can introduce historical ambiguity unless each correction is clearly marked as consistency remediation.
- Updating Engram topics without strict source references can create a second layer of drift.

### Ready for Proposal
Yes — scope is bounded to consistency remediation (API contract, artifact alignment, testing-capabilities metadata) without large runtime refactors.
