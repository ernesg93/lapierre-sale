# Delta for StickyHeader

## ADDED Requirements

### Requirement: StickyHeader price context MUST use centralized sale content

The system MUST render StickyHeader product identity and price context from `siteConfig.sale`, so deep-scroll CTA context stays consistent with the landing.

#### Scenario: StickyHeader identity and price are centrally aligned

- GIVEN `siteConfig.sale` defines product name and main price
- WHEN `StickyHeader` renders base identity and deep-scroll price badge
- THEN displayed values SHALL match the centralized source

#### Scenario: StickyHeader tests do not depend on stale literals

- GIVEN tests assert StickyHeader product/price visibility
- WHEN commercial values change only in `siteConfig.sale`
- THEN tests SHALL assert centralized values without component-local literals
