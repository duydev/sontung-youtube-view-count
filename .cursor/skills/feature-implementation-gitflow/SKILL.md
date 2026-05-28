---
name: feature-implementation-gitflow
description: Implement a feature end-to-end: read requirements, analyze, break into tasks, track progress in a project file, implement changes, update docs/ADRs, run formatter/linter/tests, and (when explicitly requested) commit and push following GitFlow branch conventions. Use when the user asks to implement a feature, ship a change, or “làm đủ workflow từ yêu cầu tới PR”.
disable-model-invocation: true
---

# Feature Implementation Workflow (GitFlow)

## Goal
Provide a repeatable, disciplined workflow to deliver features safely and consistently for this repo.

## Inputs to collect (from the current user request)
- Feature scope and acceptance criteria (what “done” means)
- Target environment/config keys (any `.env` additions)
- Whether backend/proxy is in scope (for YouTube Data API key protection)

## Task tracking (required)
Maintain a lightweight progress file:
- Create/Update: `docs/PROGRESS.md`
- Structure:
  - Feature title + link to requirement
  - Checklist of tasks with status (pending/in progress/done)
  - Notes / decisions / follow-ups

Use the built-in task list mechanism (todo updates) for the live session, and mirror key checkpoints into `docs/PROGRESS.md` so the repo records progress outside chat history.

## Workflow

### 1) Read & analyze requirements
- Re-state the requirements as bullets (functional + non-functional).
- Identify unknowns and decide sensible defaults (do not block on confirmations; document assumptions).
- Map requirements to modules/files likely impacted.

### 2) Break down tasks
- Create tasks that are:
  - independently verifiable
  - small enough to implement safely
  - ordered by dependencies
- Update `docs/PROGRESS.md` with the same breakdown.

### 3) Implement tasks
- Prefer incremental commits (feature branch) once code exists.
- Keep changes small and cohesive per task.
- Update docs alongside code changes (especially config and architecture).

### 4) Documentation & ADRs
- Update docs when:
  - env vars added/changed (`docs/05-configuration.md`)
  - data flow changes (`docs/03-architecture.md`, `docs/06-youtube-integration.md`)
  - backend/no-backend decision changes (add/update ADR in `docs/adr/`)
- Keep docs consistent with code (names, endpoints, intervals, branch names).

### 5) Formatting, linting, and checks
Run the project’s standard checks (when present):
- Formatter (e.g. Prettier)
- Linter (e.g. ESLint)
- Typecheck (tsc)
- Build (`npm run build`)

If tooling is not yet configured, either:
- Add minimal, standard tooling, or
- Document the gap in `docs/PROGRESS.md` and proceed carefully.

### 6) GitFlow branching rules
- Default branch: `main` (production-ready)
- Integration branch: `develop` (if used)
- Feature work:
  - Create `feature/<short-name>` from `develop` (preferred) or from `main` if you are not using `develop` yet.
- Hotfix:
  - Create `hotfix/<version>` from `main`

Keep branch naming ASCII and kebab-case.

### 7) Commit & push (guardrails)
**Important**:
- Do not commit or push secrets (`.env`, keys, tokens).
- Only run **commit** and **push** steps **when the user explicitly asks** in the current request.
- Never force-push unless explicitly requested.

When asked to commit:
- Ensure working tree is clean except intended changes.
- Use a clear commit message (prefer Conventional Commits).
- Confirm `git status` is clean after commit.

When asked to push:
- Push the current feature branch with upstream (`-u`) if needed.
- Do not push to `main` directly; push the feature/release/hotfix branch.

### 8) Close-out
- Mark tasks done in `docs/PROGRESS.md`.
- Add a short “Test plan” section in `docs/PROGRESS.md` describing how to verify.
- If applicable, prepare a PR summary (title, summary bullets, test plan).

## Output format for a feature run
When executing this skill, report:
- **Assumptions**
- **Task breakdown**
- **Progress update** (what changed in `docs/PROGRESS.md`)
- **Implementation summary**
- **Docs/ADR changes**
- **Checks run** (formatter/linter/build)
- **Git actions** (commit/push only if requested)
