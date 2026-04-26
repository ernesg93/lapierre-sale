export type LockfileDecision =
  | 'allow-lockfile-diff'
  | 'revert-lockfile-diff'
  | 'no-lockfile-diff';

export interface LockfileGovernanceInput {
  hasDependencyIntent: boolean;
  hasLockfileDiff: boolean;
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
