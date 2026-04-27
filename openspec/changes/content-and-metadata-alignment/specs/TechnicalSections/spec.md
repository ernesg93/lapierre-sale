# Delta for TechnicalSections

## ADDED Requirements

### Requirement: Visible technical facts MUST align with centralized specs

The system MUST derive customer-visible technical facts from `siteConfig.sale.specs` so UI claims stay consistent across sections.

#### Scenario: Technical section renders centralized key specs

- GIVEN `siteConfig.sale.specs` provides the active visible specs
- WHEN the technical section is rendered
- THEN displayed values for frame, brakes, wheels, drivetrain, condition, and usage SHALL match centralized specs

#### Scenario: Technical specs tests validate centralized values

- GIVEN tests cover technical section values
- WHEN specs change only in `siteConfig.sale.specs`
- THEN tests SHALL assert centralized values, not stale constants
