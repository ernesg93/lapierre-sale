# Tasks: A11y and Polish

## Phase 1: Foundation & Navigation Contracts

- [x] 1.1 Add `#main-content` landmark in `app/page.tsx` and insert skip link as first focusable element targeting that id.
- [x] 1.2 Add shared a11y styles in `app/globals.css` for `.skip-link` reveal-on-focus and consistent `:focus-visible` ring tokens across dark/light sections.
- [x] 1.3 Refactor `components/StickyHeader.tsx` nav actions to semantic same-page anchors (`href="#config|#specs|#trust|#faq"`) and keep active-state logic aligned with hash/section visibility.
- [x] 1.4 Refactor `components/Footer.tsx` quick links to semantic anchors for the same section ids, removing imperative-only button navigation.
- [x] 1.5 Implement/adjust internal navigation helper (if needed) used by header/footer/secondary CTA to enforce destination focus (`tabIndex=-1` + `focus({ preventScroll: true })`) when navigation is programmatic.

## Phase 2: Motion & Focus Behavior

- [x] 2.1 Update `components/CameraScroll.tsx` secondary CTA to use stable section anchor target and ensure hash is updated reliably.
- [x] 2.2 Add reduced-motion branch in `components/CameraScroll.tsx` (via `prefers-reduced-motion`/`useReducedMotion`) rendering static narrative + operable CTA without sticky timeline dependency.
- [x] 2.3 Ensure hidden CTA states in `components/StickyHeader.tsx`/`components/CameraScroll.tsx` are not keyboard-focusable when visually hidden.
- [x] 2.4 Update `components/FAQ.tsx` so collapsed panel state is semantically hidden (`hidden` or equivalent) while preserving `aria-expanded`/`aria-controls`.

## Phase 3: TDD Verification (RED → GREEN → REFACTOR)

- [x] 3.1 **RED**: Update `app/__tests__/page.test.tsx` and `components/__tests__/StickyHeader.test.tsx` to fail first for skip link focus-to-main, link semantics, hash updates, and focus-at-destination contract.
- [x] 3.2 **GREEN**: Update `components/__tests__/Footer.test.tsx` and `components/__tests__/CameraScroll.test.tsx` for valid internal anchors, secondary CTA behavior, and reduced-motion static branch.
- [x] 3.3 **GREEN**: Update `components/__tests__/FAQ.test.tsx` for collapsed-state `hidden` semantics plus existing ARIA assertions.
- [x] 3.4 **REFACTOR**: Normalize test helpers/mocks (e.g., `matchMedia`/motion hooks) to reduce duplication while keeping assertions explicit per scenario.

## Phase 4: Quality Gates (No Build)

- [x] 4.1 Run `npm run lint` and fix any violations related to semantic links, ARIA usage, or focus-visible class application.
- [x] 4.2 Run `npx tsc --noEmit` and resolve typing issues introduced by navigation helper or reduced-motion branching.
- [x] 4.3 Run `npm test` and verify all updated scenarios pass for landing navigation, skip link, reduced motion, and FAQ accessibility.
