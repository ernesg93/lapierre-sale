# landing-section-navigation Specification

## Purpose

Garantizar que el enlace público de FAQ en la landing tenga un destino real y navegable.

## Requirements

### Requirement: FAQ anchor target MUST exist

The system MUST expose stable in-page anchor targets for internal landing navigation so header, footer, and in-content links resolve to valid destinations and leave the user at a keyboard-navigable target.

(Previously: Solo exigía que el enlace de FAQ del header resolviera `#faq` con destino único.)

#### Scenario: Header FAQ link reaches FAQ section

- GIVEN a user is on the landing page
- WHEN the user activates the header link to `#faq`
- THEN the browser location hash is `#faq`
- AND a visible FAQ section with anchor target `faq` is present in the DOM

#### Scenario: No broken anchor for FAQ

- GIVEN the landing is rendered
- WHEN navigation metadata includes a FAQ anchor link
- THEN the page MUST include exactly one matching anchor destination for `faq`

#### Scenario: Footer and in-content internal links resolve to valid targets

- GIVEN the user activates an internal anchor link from footer or an in-content CTA
- WHEN the link points to `#<section-id>`
- THEN the location hash updates to that section id
- AND exactly one matching destination exists in the DOM

#### Scenario: Programmatic navigation leaves focus at destination

- GIVEN an internal navigation action uses programmatic scrolling instead of a native anchor jump
- WHEN the navigation completes
- THEN focus is moved to the destination section or its first focusable heading/landmark
- AND subsequent keyboard navigation continues from that destination context
