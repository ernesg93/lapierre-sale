# site-metadata Specification

## Purpose

Define metadata that matches the active single-bike offer without drifting from landing copy.

## Requirements

### Requirement: Metadata MUST align with the active offer

The system MUST use metadata title and description that identify the offer as one `Lapierre Pro Race` bicycle for `$ 850` and SHOULD reflect carbon construction, low weight, and hybrid/multi-terrain suitability without adding unsupported claims.

#### Scenario: Metadata matches the canonical offer

- GIVEN site metadata is generated for sharing or indexing
- WHEN title or description is exposed
- THEN it refers to the same Lapierre Pro Race single-bike offer shown on the landing

#### Scenario: Metadata avoids unsupported promises

- GIVEN metadata copy is concise
- WHEN condition or sales language is included
- THEN it stays within confirmed facts such as little use or `como nueva`

### Requirement: Metadata assets MUST remain behavior-neutral

The system MUST preserve existing metadata wiring, URLs, and asset mechanics while changing only offer-specific text content.

#### Scenario: Metadata update does not alter app mechanics

- GIVEN metadata content is refreshed
- WHEN the application renders the page
- THEN route, asset, and share mechanics remain unchanged
