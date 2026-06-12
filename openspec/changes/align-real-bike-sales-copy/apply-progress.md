## Implementation Progress

**Change**: align-real-bike-sales-copy
**Mode**: Strict TDD

### Completed Tasks
- [x] 1.1 Update `src/config/__tests__/site.test.ts` to fail on old sale facts and require `Lapierre Pro Race`, `$ 850`, single-bike wording, and purchase prefills without price.
- [x] 1.2 Update `app/__tests__/layout.metadata.test.ts`, `components/__tests__/StickyHeader.test.tsx`, and `components/__tests__/CameraScroll.test.tsx` to require aligned metadata, hero text sources, and unchanged CTA destinations.
- [x] 1.3 Update `components/__tests__/PurchaseConfig.test.tsx`, `TechSpecs.test.tsx`, `TrustSection.test.tsx`, `FAQ.test.tsx`, and `Footer.test.tsx` for single-bike copy while preserving current links, anchors, and accordion behavior.
- [x] 2.1 Rewrite `src/config/site.ts` sale facts: product name, price, metadata, hero claims/detail lines, footer copy, specs, and WhatsApp defaults to the confirmed one-bike offer.
- [x] 2.2 Reframe `src/config/site.ts` `purchaseOptions` and `buildPurchaseMessage()` as three conversation paths for the same bike, with direct trust-based wording and no bundle or price language.
- [x] 3.1 Verify `components/StickyHeader.tsx` and `app/layout.tsx` stay behavior-neutral; touch only if needed to keep canonical product/price and metadata wiring aligned.
- [x] 3.2 Update `components/CameraScroll.tsx` and `components/PurchaseConfig.tsx` copy to position the bike as hybrid/multi-terrain, little-used, `como nueva`, with unchanged scroll flow and CTA mechanics.
- [x] 3.3 Update `components/TechSpecs.tsx` and `components/TrustSection.tsx` to use factual trust language only; remove unsupported guarantees, documentation promises, and stronger-than-allowed condition claims.
- [x] 3.4 Update `components/FAQ.tsx` and `components/Footer.tsx` to describe one real sale, keep the tone direct, and avoid packs, variants, or unsupported assurances.
- [x] 4.1 Run focused copy-alignment tests.
- [x] 4.2 Review the final diff for behavior neutrality.

### TDD Cycle Evidence
| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|------|-----------|-------|------------|-----|-------|-------------|----------|
| 1.1 | `src/config/__tests__/site.test.ts` | Unit | ✅ 50/50 baseline focused tests | ✅ Written first | ✅ Focused suite passed | ✅ Canonical facts + no-price prefill cases | ✅ Tightened contract assertions |
| 1.2 | `app/__tests__/layout.metadata.test.ts`, `components/__tests__/StickyHeader.test.tsx`, `components/__tests__/CameraScroll.test.tsx` | Integration | ✅ 50/50 baseline focused tests | ✅ Written first | ✅ Focused suite passed | ✅ Metadata, hero source, CTA destination cases | ✅ Assertions narrowed to copy contracts |
| 1.3 | `components/__tests__/PurchaseConfig.test.tsx`, `components/__tests__/TechSpecs.test.tsx`, `components/__tests__/TrustSection.test.tsx`, `components/__tests__/FAQ.test.tsx`, `components/__tests__/Footer.test.tsx` | Integration | ✅ 50/50 baseline focused tests | ✅ Written first | ✅ Focused suite passed | ✅ Single-bike copy, anchors, accordion, legal copy cases | ✅ Duplicate-text assertions refined |
| 2.1 | `src/config/__tests__/site.test.ts`, `app/__tests__/layout.metadata.test.ts`, `components/__tests__/CameraScroll.test.tsx` | Unit + Integration | ✅ 16 failing RED assertions captured | ✅ Phase 1 coverage written first | ✅ Focused suite passed | ✅ Product, price, metadata, hero detail permutations | ✅ Centralized values kept in config |
| 2.2 | `src/config/__tests__/site.test.ts`, `components/__tests__/PurchaseConfig.test.tsx` | Unit + Integration | ✅ 16 failing RED assertions captured | ✅ Phase 1 coverage written first | ✅ Focused suite passed | ✅ Three paths + no price in WhatsApp cases | ✅ Copy kept in existing purchase option shape |
| 3.1 | `app/__tests__/layout.metadata.test.ts`, `components/__tests__/StickyHeader.test.tsx` | Integration | ✅ 16 failing RED assertions captured | ✅ Phase 1 coverage written first | ✅ Focused suite passed | ✅ Product/price wiring checks across metadata + header | ➖ None needed |
| 3.2 | `components/__tests__/CameraScroll.test.tsx`, `components/__tests__/PurchaseConfig.test.tsx` | Integration | ✅ 16 failing RED assertions captured | ✅ Phase 1 coverage written first | ✅ Focused suite passed | ✅ Hybrid positioning + CTA invariants | ✅ Copy-only component edits |
| 3.3 | `components/__tests__/TechSpecs.test.tsx`, `components/__tests__/TrustSection.test.tsx` | Integration | ✅ 16 failing RED assertions captured | ✅ Phase 1 coverage written first | ✅ Focused suite passed | ✅ Condition ceiling + factual trust wording cases | ✅ Unsupported guarantees removed |
| 3.4 | `components/__tests__/FAQ.test.tsx`, `components/__tests__/Footer.test.tsx` | Integration | ✅ 16 failing RED assertions captured | ✅ Phase 1 coverage written first | ✅ Focused suite passed | ✅ Single-bike FAQ/legal cases | ✅ Copy kept behavior-neutral |
| 4.1-4.2 | `npm test -- src/config/__tests__/site.test.ts app/__tests__/layout.metadata.test.ts components/__tests__/StickyHeader.test.tsx components/__tests__/CameraScroll.test.tsx components/__tests__/PurchaseConfig.test.tsx components/__tests__/TechSpecs.test.tsx components/__tests__/TrustSection.test.tsx components/__tests__/FAQ.test.tsx components/__tests__/Footer.test.tsx` | Verification | ✅ 50/50 baseline focused tests | ✅ Command chosen before implementation edits | ✅ 50/50 focused tests passing | ✅ Cross-file copy + behavior invariants exercised | ✅ Final diff reviewed for copy-only scope |

### Test Summary
- **Total tests written**: 16 updated assertions/cases across 9 files
- **Total tests passing**: 50/50 in the focused suite
- **Layers used**: Unit (1 file), Integration (8 files)
- **Approval tests** (refactoring): None — copy alignment on existing behavior
- **Pure functions created**: 0

### Deviations from Design
None — implementation matches design.

### Issues Found
- `components/CameraScroll.tsx` and `components/__tests__/CameraScroll.test.tsx` already had unrelated working-tree changes before this apply batch; they were left behaviorally untouched for this copy alignment.

### Remaining Tasks
- [ ] None

### Workload / PR Boundary
- Mode: single PR
- Current work unit: Canonical offer copy + literal-copy tests
- Boundary: copy/config/test alignment for the landing only, with no behavior changes
- Estimated review budget impact: Medium forecast held; focused diff review stayed within a single copy-alignment unit

### Status
10/10 tasks complete. Ready for verify.
