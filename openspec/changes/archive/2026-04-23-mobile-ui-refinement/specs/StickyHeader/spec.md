# StickyHeader Specification

## Purpose
The `StickyHeader` component provides a consistent navigation interface that remains accessible as the user scrolls through the long scrollytelling landing page.

## Requirements

### Requirement: Global Navigation
The system MUST provide a sticky header that remains at the top of the viewport after the initial hero section is scrolled.

#### Scenario: Header Visibility
- GIVEN the user is at the top of the page (Hero)
- WHEN the user scrolls down past 10vh
- THEN the StickyHeader MUST become visible with a semi-transparent backdrop.

#### Scenario: Cross-Section Navigation
- GIVEN the StickyHeader is visible
- WHEN the user clicks on "Ficha Técnica"
- THEN the page MUST scroll smoothly to the `TechSpecs` section.
