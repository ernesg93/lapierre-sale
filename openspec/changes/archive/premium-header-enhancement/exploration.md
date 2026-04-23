## Exploration: Premium Header Enhancement

### Current State
The `StickyHeader` is a functional but basic navigation bar. It appears after 100px scroll with simple opacity/y transitions. It uses a standard glassmorphism effect. Navigation is static (links don't react to current section).

### Affected Areas
- `components/StickyHeader.tsx` — Main component to be refactored.
- `app/page.tsx` — No changes needed (already includes the component).
- `src/config/site.ts` — Potential addition of price or specific CTA text.

### Approaches
1. **Framer Motion Native** — Use `useScroll` and `useTransform` for all effects (progress bar, opacity, dynamic elements).
   - Pros: Consistent with existing animations, high performance, no extra dependencies.
   - Cons: Logic for active section detection needs manual Intersection Observer or multiple `useInView`.
   - Effort: Medium

2. **Radix UI + Framer Motion** — Use Radix for navigation primitives.
   - Pros: Better accessibility out of the box.
   - Cons: Overkill for a simple 3-link landing page.
   - Effort: High

### Recommendation
**Approach 1 (Framer Motion Native)** is the best fit. It maintains the project's "lean" dependency profile while allowing for the complex orchestrated animations we want (progress bar synchronized with scroll, spring entry).

### Risks
- **Z-Index Conflicts**: The header must stay above the `CameraScroll` overlays.
- **Scroll Performance**: Adding too many scroll listeners or complex `useTransform` hooks could impact smoothness on low-end mobile devices. Use `will-change: transform` where necessary.

### Ready for Proposal
Yes. I have a clear vision for the "Premium Floating Header" including:
- Top-mounted 2px progress bar.
- Intersection Observer for active section highlighting.
- Dynamic CTA button that slides in when passing the hero.
- Enhanced glassmorphism (border-gradient + shadow).
