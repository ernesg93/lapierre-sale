## Exploration: mobile-ui-refinement

### Current State
The landing page uses a high-performance scrollytelling `CameraScroll` component as its hero. On desktop, the bike is centered and text overlays are also centered, which works due to the widescreen aspect ratio. On mobile (vertical), the bike occupies the central band of the screen, and the centered text overlays overlap with the bike's frame, creating a "crowded" and less premium feel.

### Affected Areas
- `components/CameraScroll.tsx` — Core component for scrollytelling. Needs canvas offset logic and overlay alignment adjustments for mobile.
- `app/page.tsx` — Target for adding the Sticky Header.
- `components/TrustSection.tsx` — Minor spacing review.

### Approaches
1. **Adaptive Narrative Layout** — Shift text overlays to `justify-start` (top) or `justify-end` (bottom) on mobile screens.
   - Pros: Simple CSS change, avoids bike overlap.
   - Cons: Might feel disconnected if not carefully positioned.
   - Effort: Low

2. **Canvas Dynamic Vertical Offset** — Modify the canvas rendering loop to shift the bike downwards when a vertical aspect ratio is detected, leaving the top 30-40% of the screen for text.
   - Pros: Professional look, "Editorial" feel.
   - Cons: Slightly more complex math in the render loop.
   - Effort: Medium

3. **Sticky Progress Header** — Implement a thin, semi-transparent header that reveals on scroll to allow quick navigation.
   - Pros: Improves UX on long scrollytelling pages.
   - Cons: Adds more UI elements to a minimal design.
   - Effort: Medium

### Recommendation
Combine **Option 1 (Text shift)** and **Option 2 (Canvas offset)** for the best result. Specifically, shift the bike 15-20% downwards on mobile and position text overlays at the top. Also, add a basic Sticky Header for better navigation.

### Risks
- Over-complicating the canvas render loop could introduce jitter if not handled correctly.
- Sticky header might overlap with the scrollytelling overlays if not properly z-indexed.

### Ready for Proposal
Yes.
