# Design: Premium Header Enhancement

## Technical Approach
Refactor `StickyHeader.tsx` to become a data-driven component orchestrated by scroll progress and viewport intersection. We will use a custom hook for section tracking to keep the UI component focused on rendering.

## Architecture Decisions

### Decision: Section Tracking Mechanism
**Choice**: Custom hook `useActiveSection` using `IntersectionObserver`.
**Alternatives considered**: `framer-motion`'s `useInView` per component.
**Rationale**: `useActiveSection` allows for a centralized observation of all targets, reducing the number of observers and providing a single source of truth for the active link highlight.

### Decision: Progress Indicator Implementation
**Choice**: `motion.div` driven by `scrollYProgress`.
**Alternatives considered**: Native `scroll-timeline` (CSS).
**Rationale**: CSS `scroll-timeline` is still not fully supported in all browsers we target. Framer Motion is already in use and provides consistent spring physics.

## Data Flow
```
window.scroll ──→ useScroll (Framer) ──→ scrollYProgress ──→ ProgressBar (Width)
                                                │
                                                └──────────→ CTA Visibility (Opacity/Scale)

IntersectionObserver ──→ useActiveSection ──→ activeId ──→ NavLinks (Highlight State)
```

## File Changes
| File | Action | Description |
|------|--------|-------------|
| `hooks/useActiveSection.ts` | Create | Logic for tracking which section is currently in view. |
| `components/StickyHeader.tsx` | Modify | Total refactor to implement new visuals and logic. |
| `src/config/site.ts` | Modify | Add `price` metadata for header CTA. |

## Interfaces / Contracts
```typescript
interface NavLink {
  name: string;
  id: string;
}

// In useActiveSection.ts
function useActiveSection(sectionIds: string[], threshold = 0.5): string | null;
```

## Testing Strategy
| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `useActiveSection` | Mock IntersectionObserver and verify `activeId` updates. |
| Integration | `StickyHeader` | Mock scroll and verify progress bar width and link highlighting. |

## Migration / Rollout
No migration required. This is a purely visual/logic enhancement of a client-side component.
