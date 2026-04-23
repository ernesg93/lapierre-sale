# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review. | branch-pr | C:\Users\DELL\.gemini\antigravity\skills\branch-pr\SKILL.md |
| When writing Go tests, using teatest, or adding test coverage. | go-testing | C:\Users\DELL\.gemini\antigravity\skills\go-testing\SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature. | issue-creation | C:\Users\DELL\.gemini\antigravity\skills\issue-creation\SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | judgment-day | C:\Users\DELL\.gemini\antigravity\skills\judgment-day\SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI. | skill-creator | C:\Users\DELL\.gemini\antigravity\skills\skill-creator\SKILL.md |

## Compact Rules

### branch-pr
- Every PR MUST link an approved issue (`status:approved`) and include `Closes/Fixes/Resolves #N`.
- PR MUST have exactly one `type:*` label; blank/unlabeled PRs are blocked.
- Branch names must match `type/description` (`feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert`).
- Use conventional commits.

### go-testing
- Prefer table-driven tests with named cases and `t.Run` subtests.
- For Bubbletea, test `Model.Update()` transitions directly.

### issue-creation
- Always use issue templates.
- New issues must start with `status:needs-review`.

### judgment-day
- Run two blind judges in parallel.
- Synthesize results by confirmed/suspect/contradictions.

### skill-creator
- Follow canonical structure: `skills/{name}/SKILL.md`.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| ARCHITECTURE.md | c:\Users\DELL\Documents\PROYECTO\lapierre\lapierre-sale\ARCHITECTURE.md | High performance scrollytelling details |
| TESTING.md | c:\Users\DELL\Documents\PROYECTO\lapierre\lapierre-sale\TESTING.md | Vitest and TDD rules |
| AGENTS.md | c:\Users\DELL\Documents\PROYECTO\lapierre\lapierre-sale\AGENTS.md | AI conventions |
| CLAUDE.md | c:\Users\DELL\Documents\PROYECTO\lapierre\lapierre-sale\CLAUDE.md | Project index |
| openspec/config.yaml | c:\Users\DELL\Documents\PROYECTO\lapierre\lapierre-sale\openspec\config.yaml | SDD Configuration |
