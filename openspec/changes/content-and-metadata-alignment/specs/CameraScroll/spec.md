# Delta for CameraScroll

## ADDED Requirements

### Requirement: Hero commercial copy MUST use centralized sale content

The system MUST render hero product name and commercial claims from `siteConfig.sale`, and MUST NOT keep contradictory literals in `CameraScroll` overlays.

#### Scenario: Hero overlay reflects centralized product identity

- GIVEN `siteConfig.sale` defines product name and hero claims
- WHEN `CameraScroll` renders both overlays
- THEN title and claims SHALL match those centralized values

#### Scenario: CameraScroll tests remain aligned with centralized copy

- GIVEN UI tests validate hero copy
- WHEN product/copy changes only in `siteConfig.sale`
- THEN tests SHALL assert derived centralized values, not stale literals
