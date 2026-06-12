# Delta for StickyHeader

## ADDED Requirements

### Requirement: StickyHeader offer summary MUST match the active single-bike sale

The system MUST render StickyHeader offer text using the active `Lapierre Pro Race` identity and `$ 850` price, and SHOULD keep the wording concise and direct.

#### Scenario: StickyHeader title matches canonical offer

- GIVEN the sticky header is visible
- WHEN the offer label is rendered
- THEN it shows the canonical bike identity for the active single-bike sale

#### Scenario: Scroll-revealed price stays aligned

- GIVEN the sticky header reaches the state where price is shown
- WHEN the user sees the offer summary
- THEN the displayed price is `$ 850`
- AND header navigation and CTA mechanics remain unchanged
