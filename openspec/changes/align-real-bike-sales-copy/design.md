# Design: Align Real Bike Sales Copy

## Technical Approach

Implement this as a content-only change on top of the existing landing composition in `app/page.tsx`. Reuse `src/config/site.ts` as the canonical source for offer facts, metadata, WhatsApp helpers, and repeated CTA-facing strings, then update section-local literals only where copy is owned by a single component. This preserves all current section order, IDs, anchors, CTA destinations, scroll choreography, and disclosure behavior required by the proposal and delta specs.

## Architecture Decisions

| Decision | Options considered | Choice | Rationale |
|---|---|---|---|
| Canonical content ownership | Move all copy into config; keep everything local; split by reuse | Keep reusable commercial facts in `src/config/site.ts`; keep section-only prose local | Matches existing architecture note that conversion hot spots live in config, while avoiding a risky refactor of single-use narrative blocks. |
| PurchaseConfig adaptation | Collapse to one card; keep bundle cards; reinterpret cards without logic changes | Keep the 3-card mechanic, but rewrite cards as three conversation paths around the same bike | Preserves layout and CTA logic while removing bundle/accessory framing and multi-offer implications. |
| WhatsApp prefills | Hardcode per component; include price; central helper without price | Keep centralized helpers and omit price from prefills | Satisfies `contact-channel-config` specs and reduces future staleness when text changes. |

## Data Flow

`src/config/site.ts` remains the entry point for sale facts.

`siteConfig.sale` → `app/layout.tsx` metadata
`siteConfig.sale` → `StickyHeader` / `CameraScroll` / `PurchaseConfig` / `TechSpecs` / `Footer`
component-local literals → `TrustSection` / `FAQ`
`buildWhatsAppUrl()` / `buildPurchaseWhatsAppUrl()` → CTA `href`

For this change, only the content values change; component control flow stays intact.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/config/site.ts` | Modify | Replace prototype product identity, `$ 850` price, metadata, hero claims/detail lines, footer copy, specs, purchase card content, and WhatsApp prefill text. |
| `app/layout.tsx` | Verify only | Metadata wiring already consumes `siteConfig.sale.metadata`; no logic change expected. |
| `components/StickyHeader.tsx` | Verify only | Should continue reading `sale.productName` and `sale.price`; no structural edits beyond text source validation. |
| `components/CameraScroll.tsx` | Modify | Keep overlay timing and CTA mechanics; consume updated canonical hero copy only. |
| `components/PurchaseConfig.tsx` | Modify | Keep grid/card logic; rewrite section title, intro, and CTA-facing option copy to represent one-bike sale paths. |
| `components/TechSpecs.tsx` | Modify | Update supporting intro sentence if needed; continue rendering values from `sale.specs`. |
| `components/TrustSection.tsx` | Modify | Replace unsupported guarantees with direct, factual trust wording. |
| `components/FAQ.tsx` | Modify | Rewrite questions/answers to single-bike, hybrid-use, little-use framing without bundle claims. |
| `components/Footer.tsx` | Modify | Align footer blurb, CTA label, and legal copy with the same single-bike offer. |
| `app/__tests__/layout.metadata.test.ts` | Verify/update | Keep contract assertions; update only if literals or field shapes require it. |
| `components/__tests__/*.test.tsx` | Modify | Update copy assertions and keep behavior assertions unchanged. |
| `src/config/__tests__/site.test.ts` | Modify | Update centralized sale contract and WhatsApp prefill expectations. |

## Interfaces / Contracts

No new runtime interfaces are required. The existing `SaleConfig` contract in `src/config/site.ts` is sufficient, but its values should be re-authored to reflect:

```ts
sale.productName  // Lapierre Pro Race
sale.price        // "$ 850"
sale.metadata     // one-bike SEO copy
sale.purchaseOptions // same-bike conversation cards, not bundles
buildPurchaseMessage(optionTitle) // single-bike wording, no price
```

Section-local arrays in `FAQ.tsx` and trust badges in `TrustSection.tsx` remain local unless a string must be reused elsewhere.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | `siteConfig` facts and WhatsApp helper output | Update `src/config/__tests__/site.test.ts` to assert single-bike wording and no price in purchase prefills. |
| Integration | Rendered copy for metadata and sections | Update component/layout tests to new literals while preserving existing DOM/anchor/CTA assertions. |
| E2E | None | No E2E suite is configured in `openspec/config.yaml`. |

## Migration / Rollout

No migration required. Roll out as a text-only change set; verify that hashes, anchors, CTA URLs, reduced-motion fallback, and accordion/scroll behavior remain identical.

## Open Questions

- [ ] None.
