# dependency-lockfile-governance Specification

## Purpose

Definir un criterio explícito y verificable para aceptar o revertir cambios en `package-lock.json`.

## Requirements

### Requirement: Incidental lockfile churn MUST be reverted

The system governance SHALL treat `package-lock.json` as valid in a change only when dependency intent is explicit; incidental churn MUST be reverted before merge.

#### Scenario: Lockfile change accepted with explicit dependency intent

- GIVEN a change intentionally adds, removes, or updates dependencies
- WHEN `package-lock.json` diff is reviewed
- THEN the lockfile diff MAY be merged as part of that intentional dependency change

#### Scenario: Lockfile churn rejected without dependency intent

- GIVEN a change does not include intentional dependency updates
- WHEN `package-lock.json` appears modified incidentally
- THEN that lockfile diff MUST be reverted before merge
- AND review notes MUST classify it as incidental churn
