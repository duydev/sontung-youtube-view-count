---
name: docs-maintainer
description: Maintain and extend docs/ for this project (requirements, architecture, configuration, GitFlow, ADRs). Use when the user asks to add/adjust documentation, add an ADR, or align docs with code changes.
disable-model-invocation: true
---

# Docs Maintainer

## Quick workflow
1. Identify which doc(s) are impacted by the requested change.
2. Make the smallest update that keeps docs accurate and consistent.
3. If the change is a durable decision with trade-offs, add or update an ADR in `docs/adr/`.
4. Ensure `docs/README.md` links to any new doc file.

## Style
- Short sections, task-oriented.
- Prefer concrete configuration keys and example values.
