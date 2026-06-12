# FAQ Specification

## Purpose

Keep FAQ content aligned with the real single-bike sale while preserving current disclosure behavior.

## Requirements

### Requirement: FAQ content MUST support the canonical single-bike offer

The system MUST update questions and answers to match the Lapierre Pro Race single-bike sale, SHOULD mention hybrid or multi-terrain suitability where helpful, and MUST NOT reference accessory packs, multiple offer variants, or unsupported claims.

#### Scenario: FAQ answers describe one real offer

- GIVEN the user opens the FAQ
- WHEN answers discuss the product or sale terms
- THEN they describe one bicycle only and remain within confirmed facts

#### Scenario: FAQ keeps condition wording factual

- GIVEN an answer mentions use or state
- WHEN the text is rendered
- THEN it may mention little use
- AND it MUST NOT overstate condition beyond `como nueva`

### Requirement: FAQ interaction behavior SHALL remain unchanged

The system SHALL preserve current FAQ section ID, accordion interaction pattern, and disclosure behavior while changing only the copy.

#### Scenario: FAQ toggles behave as before

- GIVEN the user expands or collapses a question
- WHEN the interaction completes
- THEN the same disclosure mechanics and anchors are preserved
