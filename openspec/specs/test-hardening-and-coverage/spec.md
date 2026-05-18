# test-hardening-and-coverage Specification

## Purpose

Definir un baseline verificable para cobertura ejecutable en Vitest y para tests conductuales prioritarios de `StickyHeader`, `FAQ` y `app/page`, alineando además documentación y configuración operativa.

## Requirements

### Requirement: Coverage run MUST be operational in Vitest

The test stack MUST execute `npm run test:run -- --coverage` successfully and produce a coverage summary in CI/local environments supported by the project.

#### Scenario: Coverage command succeeds

- GIVEN the repository dependencies are installed
- WHEN a developer runs `npm run test:run -- --coverage`
- THEN Vitest finishes without tooling-missing errors
- AND a coverage report summary is emitted

#### Scenario: Non-coverage test flow remains valid

- GIVEN the same repository state
- WHEN a developer runs the default non-coverage test command
- THEN the command remains executable and independent of coverage-only flags

### Requirement: Coverage policy SHALL be explicit and realistic

The system SHALL define explicit coverage thresholds/reporters for the current baseline and MUST avoid undocumented or implicit defaults.

#### Scenario: Explicit baseline is declared

- GIVEN the coverage configuration files
- WHEN coverage settings are inspected
- THEN threshold values are explicitly declared
- AND reporter outputs are explicitly declared

### Requirement: StickyHeader tests MUST validate observable behavior

Tests for `StickyHeader` MUST assert user-observable outcomes (visibility, navigation intent, active context) and MUST NOT rely on CSS class tokens or brittle DOM shape coupling as pass criteria.

#### Scenario: Scroll-driven header behavior is observable

- GIVEN the landing page with StickyHeader rendered in test
- WHEN scroll state crosses the visibility threshold
- THEN the header is detectable as visible to the user-facing query strategy

#### Scenario: Section navigation intent is validated

- GIVEN StickyHeader links are rendered
- WHEN the user activates a section link (including FAQ)
- THEN navigation intent toward the expected section target is asserted through observable behavior

### Requirement: FAQ tests MUST validate interaction semantics

Tests for `FAQ` MUST verify collapsed-by-default behavior, open/close interaction, and exclusive toggle semantics using accessible or user-facing selectors.

#### Scenario: FAQ starts collapsed

- GIVEN the FAQ component is rendered
- WHEN no question has been activated
- THEN answers are not exposed as expanded content

#### Scenario: FAQ exclusive toggle works

- GIVEN one FAQ item is expanded
- WHEN the user expands a different FAQ item
- THEN the newly selected item is expanded
- AND the previously expanded item is collapsed

### Requirement: app/page tests MUST protect critical composition

Tests for `app/page` MUST verify that critical landing composition and navigation-critical anchors are present, including the FAQ destination used by header navigation.

#### Scenario: Critical sections render in landing assembly

- GIVEN `app/page` is rendered in test
- WHEN the document is queried by user-facing section cues
- THEN the core landing sections required for navigation are present

#### Scenario: FAQ anchor contract is preserved

- GIVEN landing navigation includes a FAQ target
- WHEN the page is rendered
- THEN exactly one valid destination for `#faq` is present and discoverable

### Requirement: Documentation and OpenSpec config MUST stay consistent with runtime

`TESTING.md` and `openspec/config.yaml` MUST reflect the same executable coverage command and availability status used by the actual test runtime.

#### Scenario: Docs/config match executable command

- GIVEN testing docs and OpenSpec config
- WHEN their coverage command/availability entries are compared with runnable scripts
- THEN command strings are consistent
- AND availability metadata does not contradict runtime behavior
