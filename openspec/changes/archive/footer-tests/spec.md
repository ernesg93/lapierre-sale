# Specification: Footer

**Change**: footer-tests

## Requirements
- MUST display the title "Lapierre Híbrida Carbono".
- MUST contain exactly two WhatsApp links.
- WhatsApp links MUST point to the number `5356793586`.
- MUST have three navigation buttons: "Configuración", "Ficha Técnica", and "Confianza".

## Scenarios

### Scenario 1: Contact Links
**Given** the Footer is rendered
**Then** it MUST have a primary CTA link for WhatsApp
**And** it MUST have a secondary text link for WhatsApp
**And** both MUST use the correct international format number.

### Scenario 2: Navigation
**Given** the Footer is rendered
**Then** it MUST show the "Navegación" section
**And** it MUST have buttons for the main page sections.
