# generated-assets-governance Specification

## Purpose

Definir una política verificable para tratar `public/frames/manifest.json` como artefacto generado sin romper su contrato de disponibilidad en flujos soportados.

## Requirements

### Requirement: Generated manifest MUST remain untracked and ignored

The repository governance SHALL treat `public/frames/manifest.json` as a generated artifact that MUST NOT remain tracked, and its path MUST be effectively ignored for incidental changes.

#### Scenario: Manifest churn stays out of normal diffs

- GIVEN the governance policy is active for the repository
- WHEN a contributor runs supported project flows and checks repository status
- THEN `public/frames/manifest.json` MUST NOT appear as an incidental tracked diff

#### Scenario: Incorrect tracking is rejected

- GIVEN `public/frames/manifest.json` appears as tracked or staged by mistake
- WHEN governance review is performed
- THEN the change MUST be rejected until the file is untracked and ignore policy matches it

### Requirement: Supported flows MUST regenerate manifest before runtime use

The system SHALL preserve automatic manifest generation in supported workflows so the runtime consumer can rely on file availability.

#### Scenario: Dev flow regenerates manifest automatically

- GIVEN a local environment where the manifest is absent
- WHEN the contributor starts development using the supported command
- THEN the manifest MUST be generated before normal local runtime usage

#### Scenario: Build flow regenerates manifest automatically

- GIVEN a clean state where generated artifacts are absent
- WHEN the contributor executes the supported build command
- THEN the manifest MUST be generated before build completion

### Requirement: Contributor docs MUST define supported workflow and bypass risk

Project documentation MUST state the supported commands for local/dev-build usage and SHALL warn that bypassing them can break manifest availability.

#### Scenario: Supported commands are explicitly documented

- GIVEN a contributor follows repository documentation
- WHEN they read the workflow section for running the app
- THEN the supported command path MUST be explicit for development and build

#### Scenario: Bypass behavior includes recovery guidance

- GIVEN a contributor bypasses supported commands and the manifest is missing
- WHEN they consult project docs
- THEN the docs MUST describe the risk and a recovery path to regenerate the manifest
