export function getVideoIdFromYouTubeUrl(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')

    // https://youtu.be/<id>
    if (host === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0]
      return id || null
    }

    // https://youtube.com/watch?v=<id>
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const id = u.searchParams.get('v')
      return id || null
    }

    // https://www.youtube.com/watch?v=<id>
    if (host === 'youtube.com') {
      const id = u.searchParams.get('v')
      return id || null
    }

    return null
  } catch {
    return null
  }
}
