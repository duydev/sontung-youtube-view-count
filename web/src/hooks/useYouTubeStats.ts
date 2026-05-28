import { useEffect, useRef, useState } from 'react'
import type { FetchState } from '../components/StatCard'

type Stats = {
  viewCount: number
  likeCount: number | null
}

type Params = {
  videoId: string | null
  refreshMs: number
  apiKey?: string
}

type Result = {
  status: FetchState
  data: Stats | null
  error: string | null
  lastUpdatedAt: Date | null
}

async function fetchStatsDirect(videoId: string, apiKey: string): Promise<Stats> {
  const url = new URL('https://www.googleapis.com/youtube/v3/videos')
  url.searchParams.set('part', 'statistics')
  url.searchParams.set('id', videoId)
  url.searchParams.set('key', apiKey)

  const res = await fetch(url.toString())
  if (!res.ok) {
    let details: string | null = null
    try {
      const body = (await res.json()) as any
      const message = body?.error?.message
      const reason = body?.error?.errors?.[0]?.reason
      details =
        typeof message === 'string' && typeof reason === 'string'
          ? `${message} (${reason})`
          : typeof message === 'string'
            ? message
            : typeof reason === 'string'
              ? reason
              : null
    } catch {
      // ignore parse errors
    }
    throw new Error(details ? `HTTP ${res.status}: ${details}` : `HTTP ${res.status}`)
  }

  const body: unknown = await res.json()
  if (!body || typeof body !== 'object') throw new Error('Invalid API response')

  const items = (body as any).items as any[] | undefined
  const stats = items?.[0]?.statistics
  const viewCountRaw = stats?.viewCount
  const likeCountRaw = stats?.likeCount

  const viewCount = typeof viewCountRaw === 'string' ? Number(viewCountRaw) : Number(viewCountRaw)
  const likeCount =
    likeCountRaw == null
      ? null
      : typeof likeCountRaw === 'string'
        ? Number(likeCountRaw)
        : Number(likeCountRaw)

  if (!Number.isFinite(viewCount)) throw new Error('Missing viewCount')
  return {
    viewCount,
    likeCount: Number.isFinite(likeCount) ? likeCount : null,
  }
}

export function useYouTubeStats({ videoId, refreshMs, apiKey }: Params): Result {
  const [status, setStatus] = useState<FetchState>('idle')
  const [data, setData] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)

  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (timerRef.current != null) window.clearInterval(timerRef.current)
    timerRef.current = null

    setError(null)

    if (!videoId) {
      setStatus('idle')
      return
    }

    if (!apiKey) {
      setStatus('idle')
      return
    }

    let cancelled = false

    const run = async () => {
      try {
        setStatus((prev) => (prev === 'ok' ? 'loading' : 'loading'))
        const next = await fetchStatsDirect(videoId, apiKey)
        if (cancelled) return
        setData(next)
        setLastUpdatedAt(new Date())
        setStatus('ok')
        setError(null)
      } catch (e) {
        if (cancelled) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Unknown error')
      }
    }

    void run()
    timerRef.current = window.setInterval(run, refreshMs)

    return () => {
      cancelled = true
      if (timerRef.current != null) window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [videoId, refreshMs, apiKey])

  return { status, data, error, lastUpdatedAt }
}
