# Delta for StickyHeader

## ADDED Requirements

### Requirement: Scroll Progress Indicator
The system MUST provide a visual indicator of the overall page scroll progress within the header.
- The indicator MUST be a horizontal bar at the top or bottom of the header.
- The bar width MUST correspond to the `scrollYProgress` (0 to 1).
- The bar MUST use the primary brand color (#A855F7).

#### Scenario: Progress Tracking
- GIVEN the user is at 50% of the page scroll
- THEN the progress bar in the StickyHeader MUST be at 50% width.

### Requirement: Dynamic Action Context (Deep Scroll CTA)
The system MUST provide a context-aware CTA when the user has scrolled deep into the page.
- The system MUST show a "Price + Contact" button when scroll progress is > 15%.
- In mobile, this button MAY replace navigation links or be rendered in a compact format.

#### Scenario: Deep Scroll CTA Appearance
- GIVEN the user is at 20% scroll progress (past Hero)
- THEN the StickyHeader MUST display the price and a WhatsApp contact button.

## MODIFIED Requirements

### Requirement: Global Navigation
The system MUST provide a sticky header that remains at the top of the viewport after the initial hero section is scrolled.
- The header MUST become visible after 100px of vertical scroll.
- It MUST use an enhanced glassmorphism effect (backdrop-blur-xl, white/70, and a subtle white/40 border).
- It MUST highlight the link corresponding to the section currently in view.
(Previously: Global Navigation provided a basic sticky header with no active state highlighting or border enhancement.)

#### Scenario: Header Visibility
- **Given** the user is at the top of the page (Hero)
- **When** the user scrolls down past 100px
- **Then** the StickyHeader MUST become visible with an entrance animation (fade and slide).

#### Scenario: Active Section Highlighting
- **Given** the user has scrolled to the `TrustSection`
- **WHEN** the `TrustSection` occupies more than 50% of the viewport
- **THEN** the "Confianza" link in the StickyHeader MUST be highlighted (e.g., text-color #A855F7).

### Requirement: Cross-Section Navigation
The header MUST contain links to "Ficha Técnica" (#specs), "Confianza" (#trust), and "Preguntas" (#faq).
- Clicking a link MUST trigger a smooth scroll to the target section.
- If a CTA button is present, it MUST point to the configured WhatsApp URL.
(Previously: Cross-Section Navigation only included section links.)

#### Scenario: Navigation Action
- **Given** the StickyHeader is visible
- **When** the user clicks on "Ficha Técnica"
- **Then** the page MUST scroll smoothly to the `TechSpecs` section.
