# single-bike-offer-content Specification

## Purpose

Define the canonical customer-facing offer content for one real Lapierre Pro Race sale.

## Requirements

### Requirement: Canonical offer facts MUST stay consistent across copy surfaces

The system MUST describe one `Lapierre Pro Race` offer using only supported facts. Canonical facts SHALL include carbon frame, size M (17\"), ultra-light rigid aluminum fork, DT Swiss 29\" wheels with Ratchet system, Schwalbe Marathon Plus 622x50 tires, SRAM 1x10 drivetrain, Shimano hydraulic disc brakes, little use, `como nueva`, hybrid/multi-terrain suitability, and speed/low-weight positioning. The commercial price SHALL be `$ 850`.

#### Scenario: Customer-visible copy uses the same canonical facts

- GIVEN the landing renders offer copy in multiple sections
- WHEN a bike identity, spec, condition, or price statement is shown
- THEN it matches the canonical Lapierre Pro Race fact set

#### Scenario: Copy omits unsupported facts

- GIVEN a content surface needs sales language
- WHEN a claim cannot be supported by the confirmed fact set
- THEN the claim is not shown

### Requirement: The commercial framing MUST remain direct, trust-based, and single-bike only

The system MUST frame the sale as one bicycle only and MUST NOT imply bundles, accessory packs, multiple inventory units, or stronger condition claims than `como nueva`. The tone SHOULD stay direct and trust-based rather than promotional hype.

#### Scenario: Single-bike framing is preserved

- GIVEN a CTA or section describes the sale terms
- WHEN the user reads the offer
- THEN the wording refers to one bicycle only

#### Scenario: Condition wording stays within the allowed ceiling

- GIVEN copy mentions condition or use
- WHEN the wording is rendered
- THEN it may mention little use
- AND it MUST NOT overstate condition beyond `como nueva`
