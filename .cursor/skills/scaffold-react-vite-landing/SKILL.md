---
name: scaffold-react-vite-landing
description: Scaffold and iterate a React + Vite + TypeScript landing page with YouTube embed and counters. Use when the user asks to create the UI, set up Vite, implement components/hooks, or wire env-based YouTube video configuration.
disable-model-invocation: true
---

# Scaffold React Vite Landing

## Goal
Deliver a clean landing page (React + Vite + TS) that:
- Embeds a YouTube MV from `.env`
- Shows view/like counters with loading/error states

## Workflow
1. Ensure Vite React TS app exists (create if missing).
2. Add `.env.example` documenting `VITE_YT_VIDEO_URL` and refresh interval.
3. Create minimal UI layout:
   - hero header (MV title + release message)
   - YouTube embed
   - stats cards (views, likes)
4. Implement parsing utility:
   - derive `videoId` from `VITE_YT_VIDEO_URL`
   - validate config and surface errors in UI
5. Implement polling hook:
   - interval default 30–60s (configurable)
   - keeps last good value on errors
6. Keep UI responsive (mobile-first) and accessible.

## Output expectations
- Prefer small, composable components.
- Document any new env vars in `docs/05-configuration.md`.
