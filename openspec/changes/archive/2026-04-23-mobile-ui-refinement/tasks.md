# Tasks: Mobile UI Refinement

## Phase 1: Foundation & Infrastructure
- [x] 1.1 Create `components/StickyHeader.tsx` with basic layout and Lucide icons.
- [x] 1.2 Update `app/page.tsx` to include the `StickyHeader` at the top of the main stack.

## Phase 2: CameraScroll Enhancements
- [x] 2.1 [RED] Write unit test in `components/__tests__/CameraScroll.test.tsx` to verify `yOffset` calculation for portrait aspect ratio.
- [x] 2.2 [GREEN] Modify `CameraScroll.tsx` to implement dynamic `yOffset` in the canvas `render` function.
- [x] 2.3 [RED] Add test case for responsive overlay alignment (checking classes based on viewport size).
- [x] 2.4 [GREEN] Update `CameraScroll.tsx` motion overlays with responsive Tailwind classes (`justify-start` on mobile).

## Phase 3: Navigation & Spacing
- [x] 3.1 Implement scroll-triggered visibility in `StickyHeader.tsx` using `useScroll` and `useTransform`.
- [x] 3.2 Update `TrustSection.tsx` to use more generous vertical padding and responsive font sizes for mobile headings.

## Phase 4: Verification
- [x] 4.1 Run full test suite with `npm test` to ensure no regressions.
- [ ] 4.2 Manual verification of scrollytelling framing on mobile using browser devtools.
- [ ] 4.3 Verify smooth scrolling navigation from `StickyHeader` to all target sections.

