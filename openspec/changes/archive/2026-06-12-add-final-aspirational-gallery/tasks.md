# Tasks: Add Final Aspirational Gallery

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 420-560 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 -> PR 2 |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Add config, assets, page placement, and render/copy tests | PR 1 | Safe base slice; includes exact copy, order, and 1..8 contract |
| 2 | Add lightbox behavior, focus recovery, and interaction tests | PR 2 | Base on PR 1; verifies close button, outside tap, Escape, and reduced-motion-safe behavior |

## Phase 1: Foundation / RED

- [x] 1.1 Add `sale.finalGallery` types and exact copy to `src/config/site.ts`; define `images` metadata contract and 1..8 image cap expectations.
- [x] 1.2 Create failing page assertions in `app/__tests__/page.test.tsx` for gallery copy and `FAQ -> gallery -> Footer` order.
- [x] 1.3 Create failing `components/__tests__/FinalAspirationalGallery.test.tsx` for capped images, no arrows/captions, snap-strip triggers, and lightbox dismissal paths.

## Phase 2: Assets / Wiring

- [x] 2.1 Add curated assets under `public/gallery/` with stable filenames that match the config metadata and approved alt text.
- [x] 2.2 Create `components/FinalAspirationalGallery.tsx` as a client component that reads `siteConfig.sale.finalGallery` and renders the section copy plus horizontal scroll-snap buttons.
- [x] 2.3 Update `app/page.tsx` to mount `FinalAspirationalGallery` after `FAQ` and before `Footer` without changing the rest of the landing flow.

## Phase 3: Lightbox / GREEN

- [x] 3.1 Create `components/GalleryLightbox.tsx` with overlay, close button, outside-click close, `Escape` handling, initial focus, and focus-return callback.
- [x] 3.2 Wire `FinalAspirationalGallery.tsx` state to open the selected image, keep a consistent carousel frame, and preserve real image ratio in the lightbox.
- [x] 3.3 Add visible `focus-visible` styles and reduced-motion-safe behavior on gallery triggers and the close control; keep arrows, captions, autoplay, and looping absent.

## Phase 4: Verification / REFACTOR

- [x] 4.1 Extend `components/__tests__/FinalAspirationalGallery.test.tsx` to verify close button, outside tap, `Escape`, and focus return to the invoking trigger.
- [x] 4.2 Add config coverage in `components/__tests__/FinalAspirationalGallery.test.tsx` or a new config test for exact copy, image cap, and orientation-driven rendering.
- [x] 4.3 Refine class names or helpers only after tests pass; keep `app/__tests__/page.test.tsx` and gallery tests green with no extra behavior.
