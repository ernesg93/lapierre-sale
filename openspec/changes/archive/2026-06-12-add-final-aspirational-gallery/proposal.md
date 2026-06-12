# Proposal: Add Final Aspirational Gallery

## Intent

Add a concise end-of-landing gallery that helps buyers emotionally validate the real Lapierre offer by inspecting the bike visually, without turning the closing flow into a second technical explainer.

## Scope

### In Scope
- Add a new gallery section after `FAQ` and before `Footer` with the approved title and subtitle.
- Support swipe browsing plus tap-to-enlarge lightbox for up to 8 gallery-specific images.
- Keep the lightbox minimal: photo-first, no visible arrows, no per-image captions.

### Out of Scope
- Changes to hero intent, technical section responsibilities, autoplay, infinite loops, or caption-heavy storytelling.
- Asset sourcing expansion beyond the selected gallery set or any broader media management system.

## Capabilities

### New Capabilities
- `final-aspirational-gallery`: End-of-page visual gallery that reinforces purchase desire with swipe browsing and photo-only enlargement.

### Modified Capabilities
- `landing-accessibility-polish`: Gallery and lightbox interactions must preserve visible focus, operable dismissal, and non-gimmicky motion behavior.

## Approach

Insert a dedicated section in `app/page.tsx` near the closing sequence and back it with a reusable gallery/lightbox implementation choice during design (local primitive or small library), keeping the proposal library-agnostic. The section should feel secondary to the hero, use a restrained image count, and avoid autoplay or looping patterns.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/page.tsx` | Modified | Insert gallery between `FAQ` and `Footer` |
| `components/FinalAspirationalGallery.tsx` | New | Section layout, swipe strip, tap-to-enlarge trigger |
| `components/*lightbox*` or shared UI primitive | New/Modified | Reusable photo-only enlargement behavior |
| `public/` or gallery asset config module | New/Modified | Curated gallery image set (max 8) |
| Gallery/accessibility tests | New/Modified | Section presence, order, interaction, focus behavior |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Gallery competes with hero narrative | Med | Keep copy short, place near footer, cap image count |
| Lightbox adds complexity or bundle weight | Med | Prefer minimal reusable implementation and verify need before adding a dependency |
| Interaction feels gimmicky on mobile | Low | Limit behavior to swipe + tap, no autoplay/infinite loop |

## Rollback Plan

Remove the new section from `app/page.tsx`, delete the gallery/lightbox implementation, and restore the prior `FAQ` → `Footer` ending if the gallery hurts flow, performance, or conversion.

## Dependencies

- Final curated image set for the aspirational gallery.
- Design choice for reusable lightbox behavior.

## Proposal Question Round

- Should the final gallery snap per image or allow free horizontal scroll between cards?
- Should lightbox dismissal rely only on explicit close/tap-outside, or also include Escape for keyboard users?
- Should mobile and desktop use the same cropped assets, or allow alternate framing from the same image set?

Assumption if unanswered: use one curated asset set, restrained snapping behavior, and a simple dismissible lightbox.

## Success Criteria

- [ ] Landing ends with a new aspirational gallery between `FAQ` and `Footer` using the approved copy.
- [ ] Users can swipe images and tap to enlarge them without arrows, captions, autoplay, or infinite looping.
- [ ] The hero remains the primary explainer and the closing flow still feels concise and trust-led.
