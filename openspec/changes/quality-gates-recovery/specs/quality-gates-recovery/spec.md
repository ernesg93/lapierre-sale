# quality-gates-recovery Specification

## Purpose

Restaurar la línea base técnica de calidad para que lint y type-check pasen sin degradar comportamiento de producto ni relajar reglas.

## Requirements

### Requirement: Lint gate MUST pass with zero errors

The change MUST make `npm run lint` complete with zero errors, and SHALL eliminate only the pre-existing warnings explicitly within this change scope.

#### Scenario: Lint recovery succeeds for scoped files

- GIVEN the scoped files in this change are updated
- WHEN `npm run lint` is executed on the branch
- THEN lint returns success with zero errors
- AND no pre-existing warnings remain in the scoped files

#### Scenario: Out-of-scope warnings are not expanded

- GIVEN warnings may exist outside the scoped files
- WHEN the recovery change is reviewed
- THEN no new warnings MUST be introduced in out-of-scope files

### Requirement: Type-check gate MUST pass with zero errors

The change MUST make `npx tsc --noEmit` complete successfully with zero TypeScript errors under the current strictness and dependency set.

#### Scenario: Type-check recovery succeeds

- GIVEN typed test doubles and mocks replace blocking unsafe typings
- WHEN `npx tsc --noEmit` is executed
- THEN the command exits successfully
- AND zero TypeScript errors are reported

#### Scenario: Rule strictness is preserved

- GIVEN the recovery is complete
- WHEN TypeScript configuration and dependency versions are compared against baseline
- THEN no strictness relaxations or dependency changes are required to pass

### Requirement: Warning cleanup MUST be bounded to technical scope

The change SHALL restrict warning cleanup to the known scoped runtime/test warnings and MUST NOT introduce user-visible behavior, copy, pricing, metadata, or scrollytelling output changes.

#### Scenario: Scoped warning cleanup only

- GIVEN the approved scope includes three known runtime warnings and blocking test typing issues
- WHEN the implementation is completed
- THEN only those warning/error sources are cleaned up
- AND no unrelated refactors are required for acceptance

#### Scenario: No product-surface regression

- GIVEN the application behavior before this change
- WHEN the technical recovery change is validated
- THEN visible product behavior and content remain equivalent
- AND acceptance is based on quality gates, not feature changes
