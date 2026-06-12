# CameraScroll Specification

## Purpose

Align hero narrative copy with the real bike while preserving the existing scrollytelling contract.

## Requirements

### Requirement: Hero narrative MUST reflect the canonical bike facts

The system MUST update CameraScroll text to describe the real `Lapierre Pro Race` offer with direct, trust-based wording. Hero claims SHOULD emphasize hybrid or multi-terrain suitability plus speed and low weight, and MUST NOT introduce bundle language or unsupported claims.

#### Scenario: Hero copy positions the bike correctly

- GIVEN the hero overlays render customer-facing text
- WHEN the user reads the opening narrative
- THEN the bike is presented as a single Lapierre Pro Race suited to multiple terrain types

#### Scenario: Overlay details stay factual

- GIVEN later overlays highlight specs or condition
- WHEN details are shown
- THEN they remain within the confirmed fact set and allowed condition wording

### Requirement: CameraScroll interaction mechanics SHALL remain unchanged

The system SHALL preserve current section order, overlay progression, CTA destinations, anchor targets, reduced-motion fallback behavior, and scroll-driven interaction patterns.

#### Scenario: Hero CTAs keep current destinations

- GIVEN the user activates CameraScroll CTAs
- WHEN navigation occurs
- THEN the WhatsApp CTA and in-page anchors behave exactly as before
