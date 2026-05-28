import { useMemo } from 'react'
import { Hero } from './components/Hero'
import { ArtistInfoCard } from './components/ArtistInfoCard'
import { RefreshProgress } from './components/RefreshProgress'
import { StatCard } from './components/StatCard'
import { YouTubeEmbed } from './components/YouTubeEmbed'
import { ViewMilestones } from './components/ViewMilestones'
import { useRefreshProgress } from './hooks/useRefreshProgress'
import { useYouTubeStats } from './hooks/useYouTubeStats'
import { getVideoIdFromYouTubeUrl } from './lib/youtube'

const DEFAULT_REFRESH_MS = 30_000

export default function App() {
  const videoUrl = import.meta.env.VITE_YT_VIDEO_URL as string | undefined
  const refreshMsRaw = import.meta.env.VITE_YT_REFRESH_MS as string | undefined
  const apiKey = import.meta.env.VITE_YT_API_KEY as string | undefined

  const refreshMs = useMemo(() => {
    const parsed = Number(refreshMsRaw)
    if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_REFRESH_MS
    return parsed
  }, [refreshMsRaw])

  const videoId = useMemo(() => {
    if (!videoUrl) return null
    return getVideoIdFromYouTubeUrl(videoUrl)
  }, [videoUrl])

  const { data, status, error, lastUpdatedAt } = useYouTubeStats({
    videoId,
    refreshMs,
    apiKey,
  })

  const refreshEnabled = Boolean(videoId && apiKey && lastUpdatedAt)
  const { progress01, remainingMs } = useRefreshProgress({
    lastUpdatedAt,
    refreshMs,
    enabled: refreshEnabled,
  })

  const configError = !videoUrl
    ? 'Thiếu cấu hình VITE_YT_VIDEO_URL trong .env'
    : !videoId
      ? 'Không parse được videoId từ VITE_YT_VIDEO_URL'
      : null

  const wikipediaUrl = 'https://vi.wikipedia.org/wiki/S%C6%A1n_T%C3%B9ng_M-TP'

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <Hero />
        </div>
      </header>

      <main className="main">
        <div className="container grid">
          <div className="leftCol">
            <section className="card">
              <h2 className="sectionTitle">MV trên YouTube</h2>
              <YouTubeEmbed videoId={videoId ?? undefined} videoUrl={videoUrl} />
              {configError ? (
                <div className="callout error" role="alert">
                  {configError}
                </div>
              ) : null}
            </section>

            <ArtistInfoCard wikipediaUrl={wikipediaUrl} />
          </div>

          <section className="card">
            <h2 className="sectionTitle">Thành tích</h2>

            <div className="stats">
              <StatCard label="Lượt xem" value={data?.viewCount ?? null} state={status} />
              <StatCard
                label="Lượt thích"
                value={data?.likeCount ?? null}
                state={status}
                hint={data?.likeCount == null ? 'Có thể bị ẩn theo chính sách YouTube' : undefined}
              />
            </div>

            <div className="stack">
              <RefreshProgress progress01={progress01} remainingMs={remainingMs} />
              <ViewMilestones currentViews={data?.viewCount ?? null} />
            </div>

            <div className="meta">
              <div className="metaRow">
                <span className="metaLabel">Cập nhật</span>
                <span className="metaValue">
                  {lastUpdatedAt ? lastUpdatedAt.toLocaleTimeString() : '—'}
                </span>
              </div>
              <div className="metaRow">
                <span className="metaLabel">Chu kỳ</span>
                <span className="metaValue">{Math.round(refreshMs / 1000)}s</span>
              </div>
            </div>

            {error ? (
              <div className="callout warn" role="status">
                Không thể lấy số liệu lúc này. {error}
              </div>
            ) : apiKey ? null : (
              <div className="callout info" role="status">
                Chưa có API key. Để hiện view/like, thêm <code>VITE_YT_API_KEY</code> vào
                <code>.env</code> (client-only) hoặc triển khai backend/proxy theo docs.
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div className="footerLeft">
            <span>Made with ❤️ by Trần Nhật Duy</span>
            <span className="footerSep">•</span>
            <span className="footerVersion">v{__APP_VERSION__}</span>
          </div>
          <a
            className="link"
            href={videoUrl ?? 'https://www.youtube.com/'}
            target="_blank"
            rel="noreferrer"
          >
            Mở trên YouTube
          </a>
        </div>
      </footer>
    </div>
  )
}
