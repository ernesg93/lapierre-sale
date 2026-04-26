# landing-section-navigation Specification

## Purpose

Garantizar que el enlace público de FAQ en la landing tenga un destino real y navegable.

## Requirements

### Requirement: FAQ anchor target MUST exist

The system MUST expose a stable FAQ section target so that header navigation to `#faq` resolves within the landing page.

#### Scenario: Header FAQ link reaches FAQ section

- GIVEN a user is on the landing page
- WHEN the user activates the header link to `#faq`
- THEN the browser location hash is `#faq`
- AND a visible FAQ section with anchor target `faq` is present in the DOM

#### Scenario: No broken anchor for FAQ

- GIVEN the landing is rendered
- WHEN navigation metadata includes a FAQ anchor link
- THEN the page MUST include exactly one matching anchor destination for `faq`
