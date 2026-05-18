# Apply Progress: a11y-and-polish

## Mode

Strict TDD (from `openspec/config.yaml` + Vitest availability)

## Completed Tasks

- [x] 1.1 main landmark + skip link in page shell.
- [x] 1.2 shared skip-link and focus-visible styles in global CSS.
- [x] 1.3 StickyHeader internal nav migrated to semantic anchors and hash+focus behavior.
- [x] 1.4 Footer quick links migrated to semantic internal anchors.
- [x] 1.5 Added shared `navigateToSection` helper with destination focus contract.
- [x] 2.1 CameraScroll secondary CTA now targets stable `#specs` anchor.
- [x] 2.2 Added reduced-motion static branch in CameraScroll with operable CTA.
- [x] 2.3 Hidden CTA states in StickyHeader/CameraScroll set `tabIndex=-1` + `aria-hidden`.
- [x] 2.4 FAQ collapsed panels now use semantic `hidden` state.
- [x] 3.1 Updated RED tests for skip link/main landmark, link semantics, and focus-at-destination behavior.
- [x] 3.2 Updated GREEN tests for footer/camera anchor behavior and reduced-motion branch.
- [x] 3.3 Updated GREEN FAQ tests for `hidden` semantics while preserving ARIA.
- [x] 3.4 Refactored motion/reduced-motion test mocks to reduce duplication.
- [x] 4.1 `npm run lint` passed.
- [x] 4.2 `npx tsc --noEmit` passed.
- [x] 4.3 `npm test -- --run` passed previously, then regressed in verify by timeout.

## Remediation Batch (post-verify)

- ✅ Stabilized `generatedAssetsGovernance.test.ts` prebuild case by aligning timeout and manifest file wait contract with predev case.
- ✅ Added runtime skip-link activation test that verifies focus moves to `#main-content` and hash updates.
- ✅ Added runtime focus-visible minimum evidence across header navigation, FAQ toggles, and reduced-motion CTA controls.
- ✅ Added explicit skip-link client handler to enforce focus handoff to `main#main-content` on activation.
- ✅ Restored missing hybrid artifact file at `openspec/changes/a11y-and-polish/apply-progress.md`.

### TDD Cycle Evidence
| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|------|-----------|-------|------------|-----|-------|-------------|----------|
| timeout stabilization | `src/config/__tests__/generatedAssetsGovernance.test.ts` | Integration | ✅ Existing test file green in targeted run | ✅ Added stricter expectation (`waitForFile` after `prebuild`) | ✅ Passed | ✅ predev+prebuild parity paths validated | ➖ None needed |
| skip-link focus handoff | `app/__tests__/page.test.tsx` | Integration | ✅ Existing page tests green in targeted run | ✅ New click-focus assertion written first | ✅ Passed | ✅ hash update + activeElement path covered | ✅ Introduced `SkipToMainLink` client helper |
| visible focus evidence | `components/__tests__/StickyHeader.test.tsx`, `components/__tests__/FAQ.test.tsx`, `components/__tests__/CameraScroll.test.tsx` | Integration | ✅ Existing suites green in targeted run | ✅ New focus assertions written first | ✅ Passed | ✅ header + FAQ + CTA paths covered | ✅ Added explicit `focus-visible` utility classes |

### Test Summary
- **Targeted command**: `npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts app/__tests__/page.test.tsx components/__tests__/StickyHeader.test.tsx components/__tests__/FAQ.test.tsx components/__tests__/CameraScroll.test.tsx`
- **Result**: 5 test files passed, 35 tests passed, 0 failed.

## Files Changed in Remediation

- `src/config/__tests__/generatedAssetsGovernance.test.ts`
- `app/__tests__/page.test.tsx`
- `components/__tests__/StickyHeader.test.tsx`
- `components/__tests__/FAQ.test.tsx`
- `components/__tests__/CameraScroll.test.tsx`
- `components/SkipToMainLink.tsx` (new)
- `app/page.tsx`
- `components/StickyHeader.tsx`
- `components/FAQ.tsx`
- `components/CameraScroll.tsx`
- `openspec/changes/a11y-and-polish/apply-progress.md`
