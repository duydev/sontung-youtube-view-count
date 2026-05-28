---
name: docs-audit-and-prune
description: Audit and maintain project documentation by rereading docs/, identifying missing/outdated/excess content, updating and pruning accordingly, and keeping docs/README.md and ADRs consistent. Use when the user asks to review documentation, update docs for accuracy, remove outdated sections, or ensure docs match current implementation and decisions.
disable-model-invocation: true
---

# Docs Audit & Prune

## Goal
Keep `docs/` accurate, minimal, and consistent with:
- Current requirements and scope
- Current architecture/decisions (ADRs)
- Current configuration keys (`.env` / `.env.example`)
- Current implementation (when code exists)

## Workflow
1. **Inventory**
   - Read `docs/README.md` and enumerate all linked docs.
   - List any docs files not referenced by `docs/README.md`.

2. **Ground truth**
   - Identify the current source of truth in priority order:
     - Latest user request(s) in the conversation
     - Existing ADRs in `docs/adr/`
     - Current code/config (if present): `package.json`, `src/`, `.env.example`, deployment configs

3. **Gap analysis**
   - For each doc, tag issues as:
     - **Missing**: required info absent (setup, env keys, API flow, fallback behavior)
     - **Outdated**: contradicts ADRs/code/current requirements
     - **Excess**: duplicates other docs, too verbose, speculative, or irrelevant to MVP
     - **Inconsistent**: naming mismatch (env var names, endpoint paths, branch names)

4. **Apply changes (smallest safe edits)**
   - **Add** only what is needed to make the docs actionable.
   - **Edit** to align terminology and remove contradictions.
   - **Prune** aggressively but safely:
     - Remove repeated explanations duplicated across files.
     - Remove promises/features not planned for MVP.
     - Replace large removed sections with a short pointer to the canonical doc when appropriate.

5. **Consistency checks**
   - `docs/README.md` links all top-level docs that should remain.
   - Env var names are consistent across `docs/05-configuration.md` and `.env.example`.
   - If a durable decision changed, add/update an ADR (Context, Decision, Consequences, Alternatives).

## Pruning guardrails (avoid deleting the wrong thing)
- Do not delete a section if it is the **only** place documenting a key workflow (setup, run, config, API).
- If removing a feature description, ensure no other doc depends on it.
- When uncertain, prefer rewriting as “Out of scope for MVP” rather than deleting entirely.

## Output format when reporting findings
When asked to audit docs, report changes as:
- **Kept**: files/sections that remain valid
- **Updated**: what changed and why (1–2 bullets each)
- **Removed/Pruned**: what was removed and why
- **Added**: new sections/files added and where

## Common triggers
- “đọc lại tài liệu”, “soát lại docs”
- “update tài liệu nếu thiếu”
- “loại bỏ nội dung thừa/không còn đúng”
- “đảm bảo docs đúng với code/kiến trúc hiện tại”
