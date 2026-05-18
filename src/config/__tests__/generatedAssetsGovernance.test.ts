/// <reference types="node" />

import { execFileSync, execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  areManifestHooksWired,
  hasBypassRecoveryDocumentation,
  hasSupportedWorkflowDocumentation,
  isManifestRootIgnoreRulePresent,
} from '../generatedAssetsGovernance';

const repoRoot = process.cwd();
const gitignorePath = path.join(repoRoot, '.gitignore');
const readmePath = path.join(repoRoot, 'README.md');
const packageJsonPath = path.join(repoRoot, 'package.json');
const manifestPath = path.join(repoRoot, 'public/frames/manifest.json');
const tasksPath = path.join(
  repoRoot,
  'openspec/changes/archive/2026-04-28-generated-assets-governance/tasks.md'
);
const applyProgressPath = path.join(
  repoRoot,
  'openspec/changes/archive/2026-04-28-generated-assets-governance/apply-progress.md'
);
const runNpmScript = (scriptName: 'predev' | 'prebuild') => {
  const shellPath = process.platform === 'win32' ? 'cmd.exe' : '/bin/sh';

  execSync(`npm run ${scriptName}`, {
    cwd: repoRoot,
    stdio: 'pipe',
    windowsHide: true,
    shell: shellPath,
    timeout: 15_000,
  });
};

const waitForFile = (filePath: string, timeoutMs = 2_000) => {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() <= deadline) {
    if (existsSync(filePath)) {
      return;
    }

    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
  }
};

describe('generated assets governance policy', () => {
  it('detects root-anchored ignore rule for generated manifest', () => {
    const gitignoreContent = readFileSync(gitignorePath, 'utf8');

    expect(isManifestRootIgnoreRulePresent(gitignoreContent)).toBe(true);
  });

  it('documents supported workflow commands in README', () => {
    const readmeContent = readFileSync(readmePath, 'utf8');

    expect(hasSupportedWorkflowDocumentation(readmeContent)).toBe(true);
  });

  it('documents bypass risk and recovery command in README', () => {
    const readmeContent = readFileSync(readmePath, 'utf8');

    expect(hasBypassRecoveryDocumentation(readmeContent)).toBe(true);
  });

  it('keeps dev/build hooks wired to manifest generator without changing supported commands', () => {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
      scripts?: Record<string, string>;
    };

    expect(packageJson.scripts?.dev).toBe('next dev');
    expect(packageJson.scripts?.build).toBe('next build');
    expect(areManifestHooksWired(packageJson.scripts)).toEqual({
      predev: true,
      prebuild: true,
    });
  });

  it('regenerates manifest via predev without executing build', { timeout: 20_000 }, () => {
    rmSync(manifestPath, { force: true });

    runNpmScript('predev');
    waitForFile(manifestPath);

    expect(existsSync(manifestPath)).toBe(true);
    expect(JSON.parse(readFileSync(manifestPath, 'utf8'))).toEqual(
      expect.arrayContaining([expect.stringMatching(/^\/frames\/.+\.webp$/)])
    );
  });

  it('regenerates manifest via prebuild hook command without executing build', { timeout: 20_000 }, () => {
    rmSync(manifestPath, { force: true });

    runNpmScript('prebuild');
    waitForFile(manifestPath);

    expect(existsSync(manifestPath)).toBe(true);
  });

  it('keeps manifest outside tracked files and under ignore policy', () => {
    expect(() =>
      execFileSync('git', ['ls-files', '--error-unmatch', 'public/frames/manifest.json'], {
        cwd: repoRoot,
        stdio: 'pipe',
        windowsHide: true,
      })
    ).toThrow();

    expect(
      execFileSync('git', ['check-ignore', 'public/frames/manifest.json'], {
        cwd: repoRoot,
        encoding: 'utf8',
        stdio: 'pipe',
        windowsHide: true,
      }).trim()
    ).toBe('public/frames/manifest.json');
  });

  it('keeps task 4.2 backed by executable evidence in OpenSpec artifacts', () => {
    const tasksContent = readFileSync(tasksPath, 'utf8');
    const applyProgressContent = readFileSync(applyProgressPath, 'utf8');
    const executableEvidence =
      'generatedAssetsGovernance.test.ts > keeps task 4.2 backed by executable evidence in OpenSpec artifacts';

    expect(tasksContent).toContain('- [x] 4.2');
    expect(tasksContent).toContain(executableEvidence);
    expect(tasksContent).toContain('npm run test:run -- src/config/__tests__/generatedAssetsGovernance.test.ts');

    expect(applyProgressContent).toContain('| 4.2 | `src/config/__tests__/generatedAssetsGovernance.test.ts`');
    expect(applyProgressContent).toContain(executableEvidence);
  });
});
