export type LockfileDecision =
  | 'allow-lockfile-diff'
  | 'revert-lockfile-diff'
  | 'no-lockfile-diff';

export type GovernedGeneratedArtifactDecision =
  | 'allow-governed-artifact-diff'
  | 'revert-governed-artifact-diff'
  | 'no-governed-artifact-diff';

export type GovernedGeneratedArtifactReviewClassification =
  | 'intentional-governed-artifact-change'
  | 'incidental-governed-artifact-churn'
  | 'none';

export interface LockfileGovernanceInput {
  hasDependencyIntent: boolean;
  hasLockfileDiff: boolean;
}

export interface GovernedGeneratedArtifactInput {
  hasArtifactIntent: boolean;
  hasArtifactDiff: boolean;
}

export interface GovernedGeneratedArtifactResult {
  decision: GovernedGeneratedArtifactDecision;
  reviewClassification: GovernedGeneratedArtifactReviewClassification;
}

export function evaluateLockfileGovernance({
  hasDependencyIntent,
  hasLockfileDiff,
}: LockfileGovernanceInput): LockfileDecision {
  if (!hasLockfileDiff) {
    return 'no-lockfile-diff';
  }

  return hasDependencyIntent ? 'allow-lockfile-diff' : 'revert-lockfile-diff';
}

export function evaluateGovernedGeneratedArtifact({
  hasArtifactIntent,
  hasArtifactDiff,
}: GovernedGeneratedArtifactInput): GovernedGeneratedArtifactResult {
  if (!hasArtifactDiff) {
    return {
      decision: 'no-governed-artifact-diff',
      reviewClassification: 'none',
    };
  }

  if (hasArtifactIntent) {
    return {
      decision: 'allow-governed-artifact-diff',
      reviewClassification: 'intentional-governed-artifact-change',
    };
  }

  return {
    decision: 'revert-governed-artifact-diff',
    reviewClassification: 'incidental-governed-artifact-churn',
  };
}
