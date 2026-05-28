import { useEffect, useMemo, useState } from 'react'

type Params = {
  lastUpdatedAt: Date | null
  refreshMs: number
  enabled: boolean
}

type Result = {
  progress01: number
  remainingMs: number | null
}

export function useRefreshProgress({ lastUpdatedAt, refreshMs, enabled }: Params): Result {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!enabled) return
    const id = window.setInterval(() => setNow(Date.now()), 100)
    return () => window.clearInterval(id)
  }, [enabled])

  return useMemo(() => {
    if (!enabled || !lastUpdatedAt) return { progress01: 0, remainingMs: null }
    const elapsed = Math.max(0, now - lastUpdatedAt.getTime())
    const clamped = Math.min(elapsed, refreshMs)
    const progress01 = refreshMs > 0 ? clamped / refreshMs : 0
    const remainingMs = Math.max(0, refreshMs - elapsed)
    return { progress01, remainingMs }
  }, [enabled, lastUpdatedAt, now, refreshMs])
}
