# Specification: StickyHeader

The `StickyHeader` component provides a consistent navigation interface that remains accessible as the user scrolls through the long scrollytelling landing page.

## Requirements

### Global Navigation
- The system MUST provide a sticky header that remains at the top of the viewport after the initial hero section is scrolled.
- The header MUST become visible after 100px of vertical scroll (approx 10vh).
- It MUST use an enhanced glassmorphism effect (`backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl`).
- It MUST highlight the link corresponding to the section currently in view.

### Scroll Progress Indicator
- The system MUST provide a visual indicator of the overall page scroll progress within the header.
- The indicator MUST be a horizontal bar at the top of the header.
- The bar width MUST correspond to the `scrollYProgress` (0 to 1).
- The bar MUST use the primary brand color gradient (`from-[#A855F7] to-[#D8B4FE]`).

### Dynamic Action Context (Deep Scroll CTA)
- The system MUST provide a context-aware CTA when the user has scrolled deep into the page.
- The system MUST show a "Price + Contact" button when scroll progress is > 15%.
- In mobile, this button MAY be rendered in a compact format.

### Cross-Section Navigation
- The header MUST contain links to "Ficha Técnica" (#specs), "Confianza" (#trust), and "Preguntas" (#faq).
- Clicking a link MUST trigger a smooth scroll to the target section.
- The CTA button MUST point to the configured WhatsApp URL.

## Scenarios

### Scenario: Header Visibility
- **Given** the user is at the top of the page (Hero)
- **When** the user scrolls down past 100px
- **Then** the StickyHeader MUST become visible with an entrance animation (fade and slide).

### Scenario: Progress Tracking
- **Given** the user is at 50% of the page scroll
- **Then** the progress bar in the StickyHeader MUST be at 50% width.

### Scenario: Active Section Highlighting
- **Given** the user has scrolled to the `TrustSection`
- **When** the `TrustSection` occupies more than 50% of the viewport
- **Then** the "Confianza" link in the StickyHeader MUST be highlighted with brand color (#A855F7).

### Scenario: Deep Scroll CTA Appearance
- **Given** the user is at 20% scroll progress (past Hero)
- **Then** the StickyHeader MUST display the price and a WhatsApp contact button.

### Scenario: Navigation Action
- **Given** the StickyHeader is visible
- **When** the user clicks on "Ficha Técnica"
- **Then** the page MUST scroll smoothly to the `TechSpecs` section.
