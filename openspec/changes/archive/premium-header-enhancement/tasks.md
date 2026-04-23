# Tasks: Premium Header Enhancement

## Phase 1: Foundation & Logic
- [x] 1.1 Add `price: "€ 3.200"` to `siteConfig` in `src/config/site.ts`.
- [x] 1.2 [RED] Create `hooks/__tests__/useActiveSection.test.ts` to verify section detection logic.
- [x] 1.3 [GREEN] Create `hooks/useActiveSection.ts` implementing Intersection Observer.

## Phase 2: Header Refactor - Infrastructure
- [x] 2.1 [RED] Update `components/__tests__/StickyHeader.test.tsx` to expect a progress bar and price display.
- [x] 2.2 [GREEN] Add `motion.div` for the progress bar in `StickyHeader.tsx` driven by `scrollYProgress`.

## Phase 3: Header Refactor - Dynamic States
- [x] 3.1 [RED] Add test cases for nav link highlighting based on `activeId`.
- [x] 3.2 [GREEN] Implement conditional styling for `NavLink` items using `useActiveSection`.
- [x] 3.3 [RED] Add test for CTA visibility transition when scroll > 15%.
- [x] 3.4 [GREEN] Implement `HeaderCTA` (Price + Button) with `AnimatePresence` and scroll-based trigger.

## Phase 4: Polish & Verification
- [x] 4.1 Refine glassmorphism CSS (border-gradient and shadow).
- [x] 4.2 Run full test suite with `npm test` to ensure zero regressions.
- [x] 4.3 Manual verification of smooth transitions and mobile compact layout.
