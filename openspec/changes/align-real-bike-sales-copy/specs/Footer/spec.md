# Footer Specification

## Purpose

Align footer copy and CTA labeling with the same active single-bike offer.

## Requirements

### Requirement: Footer sales copy MUST match the canonical offer

The system MUST use footer heading, blurb, and CTA text that refer to the same `Lapierre Pro Race` bicycle and SHOULD keep a direct trust-based tone.

#### Scenario: Footer content matches the offer

- GIVEN the footer is rendered
- WHEN the user reads the sales summary and CTA
- THEN both refer to the same single-bike offer shown elsewhere on the landing

### Requirement: Footer mechanics SHALL remain unchanged

The system SHALL preserve existing footer navigation links, anchor targets, and WhatsApp CTA mechanics while updating only content strings.

#### Scenario: Footer navigation and CTA behavior are preserved

- GIVEN the user activates a footer link or CTA
- WHEN navigation occurs
- THEN the same anchor and WhatsApp behavior remains in place
