# Tasks: Align Real Bike Sales Copy

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 240-340 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Canonical offer copy + literal-copy tests | Single PR | Keep behavior assertions, anchors, and CTA wiring unchanged |

## Phase 1: RED / Test Contract Updates

- [x] 1.1 Update `src/config/__tests__/site.test.ts` to fail on old sale facts and require `Lapierre Pro Race`, `$ 850`, single-bike wording, and purchase prefills without price.
- [x] 1.2 Update `app/__tests__/layout.metadata.test.ts`, `components/__tests__/StickyHeader.test.tsx`, and `components/__tests__/CameraScroll.test.tsx` to require aligned metadata, hero text sources, and unchanged CTA destinations.
- [x] 1.3 Update `components/__tests__/PurchaseConfig.test.tsx`, `TechSpecs.test.tsx`, `TrustSection.test.tsx`, `FAQ.test.tsx`, and `Footer.test.tsx` for single-bike copy while preserving current links, anchors, and accordion behavior.

## Phase 2: GREEN / Canonical Content Source

- [x] 2.1 Rewrite `src/config/site.ts` sale facts: product name, price, metadata, hero claims/detail lines, footer copy, specs, and WhatsApp defaults to the confirmed one-bike offer.
- [x] 2.2 Reframe `src/config/site.ts` `purchaseOptions` and `buildPurchaseMessage()` as three conversation paths for the same bike, with direct trust-based wording and no bundle or price language.

## Phase 3: GREEN / Section Copy Alignment

- [x] 3.1 Verify `components/StickyHeader.tsx` and `app/layout.tsx` stay behavior-neutral; touch only if needed to keep canonical product/price and metadata wiring aligned.
- [x] 3.2 Update `components/CameraScroll.tsx` and `components/PurchaseConfig.tsx` copy to position the bike as hybrid/multi-terrain, little-used, `como nueva`, with unchanged scroll flow and CTA mechanics.
- [x] 3.3 Update `components/TechSpecs.tsx` and `components/TrustSection.tsx` to use factual trust language only; remove unsupported guarantees, documentation promises, and stronger-than-allowed condition claims.
- [x] 3.4 Update `components/FAQ.tsx` and `components/Footer.tsx` to describe one real sale, keep the tone direct, and avoid packs, variants, or unsupported assurances.

## Phase 4: REFACTOR / Verification

- [x] 4.1 Run `npm test -- src/config/__tests__/site.test.ts app/__tests__/layout.metadata.test.ts components/__tests__/StickyHeader.test.tsx components/__tests__/CameraScroll.test.tsx components/__tests__/PurchaseConfig.test.tsx components/__tests__/TechSpecs.test.tsx components/__tests__/TrustSection.test.tsx components/__tests__/FAQ.test.tsx components/__tests__/Footer.test.tsx`.
- [x] 4.2 Review the final diff to confirm no logic, IDs, anchors, section order, CTA mechanics, or interaction behavior changed beyond copy literals.
