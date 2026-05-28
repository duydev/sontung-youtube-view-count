import { useMemo } from 'react'

type Props = {
  videoId?: string
  videoUrl?: string
}

export function YouTubeEmbed({ videoId, videoUrl }: Props) {
  const src = useMemo(() => {
    if (!videoId) return null
    const params = new URLSearchParams({
      autoplay: '0',
      modestbranding: '1',
      rel: '0',
    })
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
  }, [videoId])

  return (
    <div className="yt">
      {src ? (
        <iframe
          className="ytFrame"
          src={src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="ytPlaceholder">
          <div className="ytPlaceholderTitle">Chưa cấu hình video</div>
          <div className="ytPlaceholderText">
            Hãy đặt <code>VITE_YT_VIDEO_URL</code> trong <code>.env</code>.
            {videoUrl ? (
              <>
                <br />
                Giá trị hiện tại: <code>{videoUrl}</code>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
