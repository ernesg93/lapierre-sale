import { describe, expect, it } from 'vitest';
import { evaluateLockfileGovernance } from '../lockfileGovernance';

describe('evaluateLockfileGovernance', () => {
  it('allows lockfile diff when dependency intent is explicit', () => {
    expect(
      evaluateLockfileGovernance({
        hasDependencyIntent: true,
        hasLockfileDiff: true,
      })
    ).toBe('allow-lockfile-diff');
  });

  it('reverts lockfile diff when there is incidental churn', () => {
    expect(
      evaluateLockfileGovernance({
        hasDependencyIntent: false,
        hasLockfileDiff: true,
      })
    ).toBe('revert-lockfile-diff');
  });

  it('returns no-lockfile-diff when lockfile is unchanged', () => {
    expect(
      evaluateLockfileGovernance({
        hasDependencyIntent: false,
        hasLockfileDiff: false,
      })
    ).toBe('no-lockfile-diff');
  });
});
