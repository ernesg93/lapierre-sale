import { describe, expect, it } from 'vitest';
import {
  evaluateGovernedGeneratedArtifact,
  evaluateLockfileGovernance,
} from '../lockfileGovernance';

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

describe('evaluateGovernedGeneratedArtifact', () => {
  it('allows governed generated artifact diff when artifact intent is explicit', () => {
    expect(
      evaluateGovernedGeneratedArtifact({
        hasArtifactIntent: true,
        hasArtifactDiff: true,
      })
    ).toEqual({
      decision: 'allow-governed-artifact-diff',
      reviewClassification: 'intentional-governed-artifact-change',
    });
  });

  it('rejects governed generated artifact churn without explicit intent', () => {
    expect(
      evaluateGovernedGeneratedArtifact({
        hasArtifactIntent: false,
        hasArtifactDiff: true,
      })
    ).toEqual({
      decision: 'revert-governed-artifact-diff',
      reviewClassification: 'incidental-governed-artifact-churn',
    });
  });

  it('returns no-op when governed generated artifact has no diff', () => {
    expect(
      evaluateGovernedGeneratedArtifact({
        hasArtifactIntent: false,
        hasArtifactDiff: false,
      })
    ).toEqual({
      decision: 'no-governed-artifact-diff',
      reviewClassification: 'none',
    });
  });
});
