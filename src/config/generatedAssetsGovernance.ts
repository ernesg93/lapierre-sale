const GENERATED_MANIFEST_IGNORE_RULE = '/public/frames/manifest.json';
const MANIFEST_GENERATION_COMMAND = 'node scripts/build-frames-manifest.mjs';

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

export interface PackageScriptsLike {
  predev?: string;
  prebuild?: string;
}

export function isManifestRootIgnoreRulePresent(gitignoreContent: string): boolean {
  return gitignoreContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .some((line) => line === GENERATED_MANIFEST_IGNORE_RULE);
}

export function hasSupportedWorkflowDocumentation(readmeContent: string): boolean {
  const normalizedReadme = normalize(readmeContent);

  return (
    normalizedReadme.includes('npm run dev') &&
    normalizedReadme.includes('npm run build')
  );
}

export function hasBypassRecoveryDocumentation(readmeContent: string): boolean {
  const normalizedReadme = normalize(readmeContent);

  return (
    normalizedReadme.includes('next dev') &&
    normalizedReadme.includes('npm run predev')
  );
}

export function areManifestHooksWired(
  scripts: PackageScriptsLike = {}
): { predev: boolean; prebuild: boolean } {
  return {
    predev: scripts.predev === MANIFEST_GENERATION_COMMAND,
    prebuild: scripts.prebuild === MANIFEST_GENERATION_COMMAND,
  };
}
