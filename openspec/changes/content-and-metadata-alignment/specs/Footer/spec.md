# Delta for Footer

## ADDED Requirements

### Requirement: Footer commercial title and CTA MUST use centralized sale content

The system MUST derive Footer heading and CTA context from `siteConfig.sale`, and MUST NOT keep contradictory component-local commercial copy.

#### Scenario: Footer title matches centralized product name

- GIVEN `siteConfig.sale` defines the active product display name
- WHEN `Footer` renders its main commercial heading
- THEN the heading SHALL match the centralized product name

#### Scenario: Footer CTA contract remains centralized and testable

- GIVEN Footer exposes WhatsApp CTAs
- WHEN CTA links are built and tested
- THEN each CTA MUST use centralized channel/build helpers
- AND tests SHALL validate URLs from centralized outputs
