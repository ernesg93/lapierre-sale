# Proposal: Align Real Bike Sales Copy

## Intent

Replace prototype landing copy with factual sales content for the real `Lapierre Pro Race` offer so the page builds trust and matches the actual listing without changing behavior.

## Scope

### In Scope
- Align product identity, price (`$ 850`), specs, condition (`como nueva`), and trust tone across landing sections.
- Remove bundle/accessory language so the page sells one bicycle only.
- Update metadata and CTA/prefilled purchase copy to match the same offer.

### Out of Scope
- Any behavior, logic, section order, IDs, CTA mechanics, scrolling, animation, or interaction-flow changes.
- Layout, styling system, performance, accessibility, or refactor work beyond copy alignment.

## Capabilities

### New Capabilities
- `single-bike-offer-content`: Canonical customer-facing offer content for one Lapierre Pro Race sale.
- `site-metadata`: SEO/OG/Twitter metadata aligned with the active offer.

### Modified Capabilities
- `CameraScroll`: Hero narrative and CTA copy reflect the real bike facts while preserving current scroll beats.
- `StickyHeader`: Sticky offer text reflects the real bike and price without altering navigation behavior.
- `TechnicalSections`: Visible specs and trust wording match the real bike and direct tone.
- `FAQ`: Questions and answers align with a single-bike sale and avoid unsupported claims.
- `Footer`: Footer title and CTA copy match the same offer.
- `contact-channel-config`: Prefilled purchase messages reference one bicycle only.

## Approach

Update shared facts in `src/config/site.ts` where possible and replace remaining component-local literals only where needed. Preserve current section order (`StickyHeader`, `CameraScroll`, `PurchaseConfig`, `TechSpecs`, `TrustSection`, `FAQ`, `Footer`), anchor IDs, CTA targets, and interaction contracts.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/config/site.ts` | Modified | Canonical offer facts and metadata inputs |
| `components/StickyHeader.tsx`, `components/CameraScroll.tsx`, `components/PurchaseConfig.tsx` | Modified | Offer identity, price, CTA, and hero copy |
| `components/TechSpecs.tsx`, `components/TrustSection.tsx`, `components/FAQ.tsx`, `components/Footer.tsx` | Modified | Specs, condition wording, trust copy, FAQs, footer copy |
| Copy-focused tests | Modified | Literal assertions updated without changing behavior checks |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Copy stays inconsistent across sections | Med | Use one canonical fact set and review all copy surfaces |
| Copy edit accidentally changes CTA/anchor behavior | Low | Treat mechanics/IDs as frozen and verify unchanged targets |
| Condition/trust language overstates reality | Med | Limit claims to confirmed facts and use `como nueva` wording |

## Rollback Plan

Revert the copy/config changeset and restore prior literals if the new content causes trust, SEO, or conversion issues. No migrations or persistent data rollback are needed.

## Dependencies

- Confirmed source facts for the Lapierre Pro Race listing.

## Proposal Question Round

- Should FAQ copy explicitly mention mixed-terrain use, or keep that positioning only in hero/specs?
- Should prefilled WhatsApp text include size and price, or stay shorter to reduce future staleness?
- Should trust copy mention little use directly, or reserve that detail for specs/condition only?

Assumption if unanswered: keep copy concise, direct, trust-based, single-bike only, and preserve all current mechanics.

## Success Criteria

- [ ] Every customer-visible offer reference matches the real Lapierre Pro Race facts and `$ 850` price.
- [ ] No section order, IDs, CTA mechanics, hashes, or interaction flows change.
- [ ] The landing no longer implies bundles, unsupported specs, or stronger condition claims than `como nueva`.
