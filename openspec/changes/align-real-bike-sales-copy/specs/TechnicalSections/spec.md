# TechnicalSections Specification

## Purpose

Align visible specifications and trust copy with the real bike and verified sales posture.

## Requirements

### Requirement: Technical specs MUST match the canonical offer facts

The system MUST present visible specs that match the canonical Lapierre Pro Race fact set, including frame, size, fork, wheels, tires, drivetrain, brakes, condition, and little-use positioning where relevant.

#### Scenario: Specs table stays canonical

- GIVEN the technical section lists bike attributes
- WHEN the user reviews the specifications
- THEN each visible value matches the canonical offer facts

### Requirement: Trust copy MUST stay factual and direct

The system MUST use direct, trust-based wording and MUST NOT promise unsupported documentation, inspection privileges, structural history claims, or other unverifiable assurances.

#### Scenario: Trust section avoids unsupported guarantees

- GIVEN the trust section explains sale confidence
- WHEN the copy is rendered
- THEN it focuses on verifiable transparency cues only

#### Scenario: Condition language remains bounded

- GIVEN the trust or specs section mentions use or condition
- WHEN the wording is shown
- THEN it may say little use or `como nueva`
- AND it MUST NOT exceed that condition ceiling
