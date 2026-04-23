# Proposal: Mobile UI Refinement

## Intent
Improve the mobile user experience (UX) by optimizing the `CameraScroll` layout and overall responsiveness. Currently, the bike image and narrative text overlays overlap on vertical screens, making the content hard to read and visually cluttered.

## Scope

### In Scope
- Modify `CameraScroll.tsx` to shift the bike downwards on mobile (aspect ratio based offset).
- Reposition narrative text overlays to the top of the screen on mobile.
- Add a subtle Sticky Header for cross-section navigation.
- Audit and fix minor spacing issues in `TrustSection.tsx`.

### Out of Scope
- Changing the actual scrollytelling animation frames.
- Re-writing the canvas render engine (only modifying drawing logic).

## Capabilities

### New Capabilities
- `StickyHeader`: New component providing navigation across page sections.

### Modified Capabilities
- `CameraScroll`: Responsive layout requirements for mobile screens.

## Approach
Implement a dynamic vertical offset in the canvas `render` function that shifts the image down by ~15-20% when `canvasRatio < 1`. Update Tailwind classes in the motion overlays to switch from `justify-center` to `justify-start` on mobile. Add a `Header` component in `app/page.tsx` that stays sticky at the top.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `components/CameraScroll.tsx` | Modified | Responsive canvas drawing and overlay layout. |
| `app/page.tsx` | Modified | Integration of the new StickyHeader. |
| `components/TrustSection.tsx` | Modified | Spacing and mobile grid refinements. |
| `components/StickyHeader.tsx` | New | [NEW] Global navigation component. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Canvas jitter during resize | Low | Use `requestAnimationFrame` for all render calls. |
| Z-index conflicts with overlays | Low | Ensure Header has the highest z-index. |

## Rollback Plan
Revert changes via Git to the last stable commit before the `mobile-ui-refinement` change was implemented.

## Dependencies
- None.

## Success Criteria
- [ ] Text overlays do not overlap with the bike frame on mobile.
- [ ] The bike is fully visible and correctly framed on all screen sizes.
- [ ] Sticky Header allows navigation to all main sections.
- [ ] No regression in desktop scrollytelling performance.
