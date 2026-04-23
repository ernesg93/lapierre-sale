# Design: Mobile UI Refinement

## Technical Approach
Implement an aspect-ratio-aware rendering logic in `CameraScroll.tsx` to shift the canvas content. Use `framer-motion` to handle responsive alignment in narrative overlays and a new `StickyHeader` component to improve site-wide navigation.

## Architecture Decisions

### Decision: Canvas Vertical Offset
**Choice**: Dynamic shift based on `canvasRatio`.
**Alternatives considered**: Static padding in the container.
**Rationale**: Drawing directly with an offset in the canvas is more efficient and avoids container overflow issues during high-speed scrolling.

### Decision: Overlay Alignment
**Choice**: Responsive Tailwind classes with `flex` orientation.
**Alternatives considered**: Absolute top/bottom with fixed pixels.
**Rationale**: `justify-start` (top) on mobile and `justify-center` on desktop provides the best balance of readability and framing without breaking the existing motion logic.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `components/StickyHeader.tsx` | Create | New navigation component with scroll-reveal logic. |
| `components/CameraScroll.tsx` | Modify | Update `render` function for vertical offset and overlays for responsive alignment. |
| `app/page.tsx` | Modify | Integrate `StickyHeader` at the top of the main layout. |
| `components/TrustSection.tsx` | Modify | Fine-tune mobile padding and font sizes. |

## Interfaces / Contracts

```typescript
// New yOffset logic in CameraScrollContent render function
const isMobile = rect.width < rect.height;
const yOffset = isMobile ? rect.height * 0.18 : 0;
// ctx.drawImage(img, offsetX, offsetY + yOffset, drawWidth, drawHeight);
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Canvas offset logic | Verify `yOffset` calculation matches aspect ratio triggers. |
| Integration | StickyHeader visibility | Test that component appears/disappears at defined scroll thresholds. |
| Manual | Mobile Hero framing | Visual verification via browser devtools emulator. |

## Migration / Rollout
No migration required.
