# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review. | branch-pr | C:\Users\R2D2\.claude\skills\branch-pr\SKILL.md |
| When writing Go tests, using teatest, or adding test coverage. | go-testing | C:\Users\R2D2\.claude\skills\go-testing\SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature. | issue-creation | C:\Users\R2D2\.claude\skills\issue-creation\SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | judgment-day | C:\Users\R2D2\.claude\skills\judgment-day\SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI. | skill-creator | C:\Users\R2D2\.claude\skills\skill-creator\SKILL.md |
| Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. | find-skills | C:\Users\R2D2\.config\opencode\skills\find-skills\SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue (`status:approved`) and include `Closes/Fixes/Resolves #N`.
- PR MUST have exactly one `type:*` label; blank/unlabeled PRs are blocked.
- Branch names must match `type/description` (`feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert`).
- Use conventional commits; avoid non-standard trailers.
- Fill PR template sections: linked issue, summary, changes table, test plan, checklist.

### go-testing
- Prefer table-driven tests with named cases and `t.Run` subtests.
- For Bubbletea, test `Model.Update()` transitions directly for state logic.
- Use `teatest` for interactive TUI flows and `FinalModel` assertions.
- Use golden files for view/output regressions and `-update` workflow when intentional.
- For side effects, mock dependencies and cover success + error paths.

### issue-creation
- Always use issue templates; blank issues are disabled.
- New issues must start with `status:needs-review` and require maintainer `status:approved` before PR.
- Use Bug Report template for defects and Feature Request template for enhancements.
- Fill all required pre-flight and reproduction/problem fields.
- Route questions to Discussions, not Issues.

### judgment-day
- Run two blind judges in parallel; never sequential and never self-review as orchestrator.
- Resolve and inject project standards before launching judges when registry exists.
- Synthesize results by confirmed/suspect/contradictions; classify warnings as real vs theoretical.
- Ask user before fixing Round 1 confirmed issues; then re-judge after fixes.
- Re-judge on confirmed CRITICALs; fix minor items inline to avoid infinite loops.

### skill-creator
- Create skills only for reusable, non-trivial patterns.
- Follow canonical structure: `skills/{name}/SKILL.md` plus optional `assets/` and `references/`.
- SKILL frontmatter must include `name`, `description` with Trigger, `license`, and metadata.
- Keep examples minimal and commands copy-paste ready.
- Register new skill in project `AGENTS.md` after creation.

### find-skills
- Use when users ask for capabilities that may exist as installable skills.
- Prefer checking skills leaderboard first, then search with `npx skills find <query>`.
- Validate skill quality before recommending (installs, source reputation, repo trust).
- Present options with install command and skills.sh link.
- If no match exists, offer direct help and suggest creating a custom skill.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | D:\Trabajo\store\lapierre-sale\AGENTS.md | Index — references files below |
| node_modules/next/dist/docs/ | D:\Trabajo\store\lapierre-sale\node_modules\next\dist\docs\ | Referenced by AGENTS.md |
| CLAUDE.md | D:\Trabajo\store\lapierre-sale\CLAUDE.md | Index — references files below |
| AGENTS.md | D:\Trabajo\store\lapierre-sale\AGENTS.md | Referenced by CLAUDE.md |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
