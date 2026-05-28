---
name: youtube-stats-backend-proxy
description: Design and implement a minimal backend proxy for YouTube Data API stats (viewCount/likeCount) with short-term caching. Use when the user asks to add a backend, secure API keys, reduce quota usage, or expose an /api endpoint for the landing page.
disable-model-invocation: true
---

# YouTube Stats Backend Proxy

## Goal
Add a lightweight API that the frontend can call without exposing `YOUTUBE_API_KEY` in the browser.

## Workflow
1. Pick minimal runtime (prefer serverless function if deployment target supports it).
2. Create endpoint: `/api/video-stats?videoId=...`
3. Validate inputs and return consistent JSON:
   - `videoId`
   - `viewCount`
   - `likeCount` (nullable)
   - `fetchedAt`
   - `cacheHit` (optional)
4. Implement cache with TTL (default 30–60s).
5. Add basic rate limiting guidance (if platform supports).
6. Update docs:
   - `docs/06-youtube-integration.md`
   - `docs/07-backend-and-db-assessment.md`
   - ADR if needed

## Guardrails
- Never require committing secrets; use environment variables.
- Do not over-engineer: no DB for MVP.
