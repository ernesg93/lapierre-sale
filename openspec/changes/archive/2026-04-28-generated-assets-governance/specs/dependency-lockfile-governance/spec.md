# Delta for dependency-lockfile-governance

## MODIFIED Requirements

### Requirement: Incidental lockfile churn MUST be reverted

The system governance SHALL treat `package-lock.json` and explicitly governed generated artifacts as valid in a change only when intent is explicit; incidental churn MUST be reverted or neutralized by policy before merge.

(Previously: Governance accepted/rejected incidental churn only for `package-lock.json`.)

#### Scenario: Lockfile change accepted with explicit dependency intent

- GIVEN a change intentionally adds, removes, or updates dependencies
- WHEN `package-lock.json` diff is reviewed
- THEN the lockfile diff MAY be merged as part of that intentional dependency change

#### Scenario: Lockfile churn rejected without dependency intent

- GIVEN a change does not include intentional dependency updates
- WHEN `package-lock.json` appears modified incidentally
- THEN that lockfile diff MUST be reverted before merge
- AND review notes MUST classify it as incidental churn

#### Scenario: Governed generated artifact churn rejected without intent

- GIVEN a change does not include intentional updates for a governed generated artifact
- WHEN that artifact appears as incidental diff during review
- THEN the artifact diff MUST be removed from tracking or covered by ignore policy before merge
- AND review notes MUST classify it as incidental churn
