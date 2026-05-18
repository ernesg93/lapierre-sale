# StickyHeader Specification

## Purpose

Definir el contrato observable de navegación resaltada y su dependencia del contrato canónico de `useActiveSection`.

## Requirements

### Requirement: Active section detection policy MUST be canonical and non-configurable

The system MUST consume `useActiveSection(sectionIds)` as the canonical contract for StickyHeader, and SHALL treat visibility thresholds as internal hook policy rather than a StickyHeader-exposed runtime parameter.

#### Scenario: StickyHeader uses canonical hook signature

- GIVEN StickyHeader tracks `specs`, `trust`, and `faq`
- WHEN StickyHeader initializes active-section detection
- THEN it uses the canonical `useActiveSection(sectionIds)` contract
- AND no StickyHeader behavior depends on a caller-provided threshold override

### Requirement: Active link highlighting MUST follow highest visible section

The system MUST highlight exactly one navigation link when at least one tracked section is intersecting, selecting the section with the highest `intersectionRatio` among visible targets.

#### Scenario: Highest ratio section becomes active

- GIVEN `specs`, `trust`, and `faq` are tracked sections
- WHEN multiple tracked sections are intersecting
- THEN the highlighted nav link corresponds to the section with highest visible ratio

#### Scenario: No active link before intersections

- GIVEN StickyHeader is rendered and no tracked section intersects yet
- WHEN the header nav is displayed
- THEN no section link is highlighted as active

### Requirement: StickyHeader MUST keep FAQ navigation contract

The system MUST preserve `#faq` as a stable navigation intent and update browser hash to `#faq` when the FAQ nav action is triggered and target exists.

#### Scenario: FAQ button updates hash to faq target

- GIVEN StickyHeader renders a FAQ nav action and FAQ target exists
- WHEN the user activates the FAQ action
- THEN the browser hash is updated to `#faq`
- AND FAQ target navigation is executed
