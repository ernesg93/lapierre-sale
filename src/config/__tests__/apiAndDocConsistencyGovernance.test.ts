/// <reference types="node" />

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();

const apiChangeRoot = path.join(repoRoot, 'openspec/changes/api-and-doc-consistency');
const historicalChangeRoot = path.join(repoRoot, 'openspec/changes/test-hardening-and-coverage');

const apiChangeTasksPath = path.join(apiChangeRoot, 'tasks.md');
const apiChangeApplyPath = path.join(apiChangeRoot, 'apply-progress.md');
const apiChangeVerifyPath = path.join(apiChangeRoot, 'verify-report.md');
const landingDeltaSpecPath = path.join(apiChangeRoot, 'specs/landing-section-navigation/spec.md');

const historicalDesignPath = path.join(historicalChangeRoot, 'design.md');
const historicalApplyPath = path.join(historicalChangeRoot, 'apply-progress.md');
const historicalVerifyPath = path.join(historicalChangeRoot, 'verify-report.md');

const stickyHeaderTestPath = path.join(repoRoot, 'components/__tests__/StickyHeader.test.tsx');
const pageTestPath = path.join(repoRoot, 'app/__tests__/page.test.tsx');

describe('api-and-doc-consistency governance evidence', () => {
  it('keeps OpenSpec references mapped to real artifact files', () => {
    const requiredPaths = [
      apiChangeTasksPath,
      apiChangeApplyPath,
      apiChangeVerifyPath,
      historicalDesignPath,
      historicalApplyPath,
      historicalVerifyPath,
    ];

    requiredPaths.forEach((filePath) => {
      expect(existsSync(filePath), `Missing artifact: ${path.relative(repoRoot, filePath)}`).toBe(true);
    });
  });

  it('records historical drift remediation explicitly in change artifacts', () => {
    const apiApplyProgress = readFileSync(apiChangeApplyPath, 'utf8');
    const historicalApplyProgress = readFileSync(historicalApplyPath, 'utf8');
    const historicalVerifyReport = readFileSync(historicalVerifyPath, 'utf8');

    expect(apiApplyProgress).toContain('Backfill artifacts in `test-hardening-and-coverage` are explicitly marked as consistency remediation');
    expect(historicalApplyProgress).toContain('consistency remediation backfill');
    expect(historicalVerifyReport).toContain('Consistency Remediation Addendum (api-and-doc-consistency)');
  });

  it('keeps FAQ contract consistent across docs and tests', () => {
    const landingDeltaSpec = readFileSync(landingDeltaSpecPath, 'utf8');
    const stickyHeaderTests = readFileSync(stickyHeaderTestPath, 'utf8');
    const pageTests = readFileSync(pageTestPath, 'utf8');

    expect(landingDeltaSpec).toContain('FAQ contract remains consistent across docs and tests');
    expect(stickyHeaderTests).toContain('moves focus to destination when navigation is programmatic');
    expect(pageTests).toContain('main landmark target');
  });
});
