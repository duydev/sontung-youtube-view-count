type Props = {
  progress01: number
  remainingMs: number | null
}

export function RefreshProgress({ progress01, remainingMs }: Props) {
  const remainingSec = remainingMs == null ? null : Math.ceil(remainingMs / 1000)
  const percent = Math.round(Math.max(0, Math.min(1, progress01)) * 100)

  return (
    <div className="refresh">
      <div className="refreshTop">
        <span className="refreshLabel">Refresh</span>
        <span className="refreshValue">{remainingSec == null ? '—' : `${remainingSec}s`}</span>
      </div>
      <div className="bar" aria-label={`Refresh progress ${percent}%`}>
        <div className="barFill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
