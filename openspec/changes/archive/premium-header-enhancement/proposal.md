# Proposal: Premium Header Enhancement

## Intent
Transform the basic sticky header into a premium floating navigation bar that improves user orientation, provides visual feedback of scroll progress, and keeps the purchase CTA accessible.

## Scope
### In Scope
- Integrated scroll progress bar (2px height).
- Intersection Observer for active section highlighting.
- Dynamic "Price + CTA" button that appears after hero section.
- Enhanced glassmorphism (glass border + shadow).
- Spring-based entry/exit animations.

### Out of Scope
- Mobile hamburger menu (navigation items are few enough to fit in a compact layout).
- Multilingual support.

## Capabilities

### Modified Capabilities
- StickyHeader: Update with progress tracking, active states, and dynamic content.

## Approach
Refactor `StickyHeader.tsx` using `framer-motion` for all orchestrated animations. Use `scrollYProgress` for the progress bar and a custom `useActiveSection` hook (based on Intersection Observer) to highlight links. Implement a "deep-scroll" state (using `useTransform` or a state listener) to toggle the presence of the Price and WhatsApp CTA in the header.

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| `components/StickyHeader.tsx` | Modified | Total refactor of design and logic. |
| `src/config/site.ts` | Modified | Add `price` field if not present for header CTA. |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Z-index overlap with CameraScroll | Low | Explicitly set `z-[100]` and verify. |
| Scroll performance on mobile | Medium | Use `will-change: transform` and avoid heavy re-renders. |

## Rollback Plan
Revert `StickyHeader.tsx` to the version archived in `openspec/changes/archive/2026-04-23-mobile-ui-refinement/`.

## Success Criteria
- [ ] Scroll progress bar fills accurately from 0% to 100%.
- [ ] Correct nav link highlights when a section is in view.
- [ ] CTA button appears smoothly after hero section.
- [ ] Unit tests pass for visibility and link actions.
