# Design: Add Final Aspirational Gallery

## Technical Approach

Add one client-side closing section that is mounted from `app/page.tsx` between `FAQ` and `Footer` without changing the rest of the landing sequence. The section will read curated gallery data from `src/config/site.ts`, render a swipeable scroll-snap strip, and open a minimal internal lightbox that satisfies the accessibility deltas in `landing-accessibility-polish`.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Carousel implementation | Small library vs native scroll-snap | Native horizontal scroll + CSS snap | Required behavior is only swipe, tap, and snap-per-image. A library would add bundle/runtime weight for arrows/looping features we explicitly forbid. |
| Lightbox implementation | Third-party modal/lightbox vs local component | Local `GalleryLightbox` | The project has no dialog primitive today. A focused internal modal can cover open/close, Escape, outside tap, initial focus, and focus return with less complexity than introducing a dependency. |
| Gallery content ownership | Inline in component vs central config | `src/config/site.ts` | Existing sale copy already lives in centralized config. Keeping gallery copy and image metadata there preserves one source of truth for marketing content and asset limits. |
| Mixed aspect-ratio strategy | Crop to uniform cards vs contain in fixed frame | Fixed carousel frame + `object-contain`; true ratio in lightbox | The spec requires a consistent strip while preserving real proportions when enlarged. This keeps the closing section calm and avoids misleading crops. |

## Data Flow

`src/config/site.ts`
→ `FinalAspirationalGallery` reads title, subtitle, image metadata
→ renders scroll-snap buttons with `next/image`
→ click/tap sets `activeIndex`
→ `GalleryLightbox` opens with selected image
→ focus moves to close button
→ close by outside tap / button / Escape
→ focus returns to invoking gallery button

## File Changes

| File | Action | Description |
|---|---|---|
| `app/page.tsx` | Modify | Insert `FinalAspirationalGallery` after `FAQ` and before `Footer` to preserve the approved ending flow. |
| `components/FinalAspirationalGallery.tsx` | Create | Client section component; renders copy, scroll-snap strip, slide triggers, selected-index state, and reduced-motion-safe interactions. |
| `components/GalleryLightbox.tsx` | Create | Internal modal overlay with close button, outside-click close, Escape handling, initial focus, and focus return callback. |
| `src/config/site.ts` | Modify | Add `sale.finalGallery` copy and up to 8 image descriptors (`src`, `alt`, `width`, `height`, `orientation`). |
| `public/gallery/*` | Create | Curated aspirational image assets. |
| `app/__tests__/page.test.tsx` | Modify | Assert section order and exact copy on the landing page. |
| `components/__tests__/FinalAspirationalGallery.test.tsx` | Create | Validate image cap, absent arrows/captions, open/close behavior, and focus handling. |

## Interfaces / Contracts

```ts
type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
};
```

`sale.finalGallery` should expose exact copy plus `images: GalleryImage[]` and enforce the 1..8 item contract in tests.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | Config contract, image cap, focus utility classes | Vitest + RTL assertions on config-driven rendering and class presence. |
| Integration | Page order, exact copy, open/close paths, focus return, Escape | Render `Home` / gallery component; simulate click, keyboard, and outside pointer interactions. |
| E2E | None planned | Repo currently has no E2E layer; keep verification in RTL. |

## Migration / Rollout

No migration required. Rollout is a single landing-page section insert plus curated static assets.

## Open Questions

- [ ] Final asset filenames, dimensions, and alt text still need to be supplied with the curated gallery set.
