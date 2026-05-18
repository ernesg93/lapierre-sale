# artifact-consistency-governance Specification

## Purpose

Evitar drift entre documentación, OpenSpec y metadata persistida cuando se declara capacidad de testing o trazabilidad de cambios.

## Requirements

### Requirement: Referenced artifacts MUST exist and be traceable

The system MUST ensure every OpenSpec, verify, design, and docs reference points only to files that exist in the repository at review time.

#### Scenario: OpenSpec references only real files

- GIVEN an active change references related artifacts
- WHEN the change is reviewed for consistency
- THEN each referenced file path exists under `openspec/` or project docs
- AND no reference points to missing artifacts

#### Scenario: Remediation updates historical drift explicitly

- GIVEN a previous change contains a broken artifact reference
- WHEN consistency remediation is applied
- THEN the correction is recorded as consistency remediation
- AND resulting references resolve to existing files

### Requirement: Testing metadata MUST match executable commands

The system MUST document testing capabilities using commands that run in the current repo and SHALL keep coverage metadata aligned with actual runner configuration.

#### Scenario: Testing commands are executable

- GIVEN testing metadata declares test and coverage commands
- WHEN a maintainer validates operational docs/config
- THEN the commands match the configured runner and scripts
- AND documentation does not promise unavailable testing flows
