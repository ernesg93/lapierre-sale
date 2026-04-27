# Proposal: Quality Gates Recovery

## Intent

Recover `npm run lint` and `npx tsc --noEmit` with a strictly technical change that restores the project baseline without touching product behavior, content, pricing, metadata, or scrollytelling assets.

## Scope

### In Scope
- Replace explicit `any` usage in blocking tests with concrete typed mocks/utilities.
- Fix the `useTransform` mock in `components/__tests__/CameraScroll.test.tsx` so it matches current Framer Motion typings.
- Remove the three existing unused import/variable warnings in runtime files.
- Re-run and capture green evidence for `npm run lint` and `npx tsc --noEmit`.

### Out of Scope
- UX/UI, copy, pricing, metadata, frames/scrollytelling assets, or behavior changes.
- Dependency upgrades/downgrades, lockfile edits, or lint/TypeScript rule relaxation.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- None.

## Approach

Use the exploration recommendation: a controlled hybrid recovery. Keep quality gates strict, fix root causes in tests, and do minimal runtime hygiene only for existing warnings. Prefer typed test helpers over casts that hide errors.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `components/__tests__/StickyHeader.test.tsx` | Modified | Remove explicit `any` from Framer Motion-related mocks. |
| `components/__tests__/CameraScroll.test.tsx` | Modified | Align `useTransform` mock with current overloads and remove `any`. |
| `hooks/__tests__/useActiveSection.test.ts` | Modified | Type `IntersectionObserver` callback/test doubles correctly. |
| `components/CameraScroll.tsx` | Modified | Remove unused symbol warning. |
| `components/StickyHeader.tsx` | Modified | Remove unused import warning. |
| `hooks/useActiveSection.ts` | Modified | Remove unused variable warning. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Overly rigid Framer Motion mocks become version-fragile | Med | Mirror only required overload shapes and keep helpers localized to tests. |
| Type assertions hide real issues | Med | Prefer inferred/concrete interfaces and verify both gates after edits. |
| Runtime hygiene causes side effects | Low | Limit edits to unused symbols only and avoid behavior changes. |

## Rollback Plan

Revert only the touched test/runtime hygiene files and restore the last known failing baseline if any fix introduces regressions.

## Dependencies

- Existing project toolchain: ESLint, TypeScript, Vitest, React Testing Library, Framer Motion typings.

## Success Criteria

- [ ] `npm run lint` completes with zero errors and zero pre-existing warnings from this change scope.
- [ ] `npx tsc --noEmit` completes successfully.
- [ ] No product-visible behavior, copy, or asset output changes are introduced.
