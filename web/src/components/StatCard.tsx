import { formatCompactNumber } from '../lib/format'

export type FetchState = 'idle' | 'loading' | 'ok' | 'error'

type Props = {
  label: string
  value: string | number | null
  state: FetchState
  hint?: string
}

export function StatCard({ label, value, state, hint }: Props) {
  const displayValue =
    value == null ? '—' : typeof value === 'number' ? formatCompactNumber(value) : value

  const stateLabel =
    state === 'loading' ? 'Đang cập nhật' : state === 'error' ? 'Tạm thời lỗi' : ' '

  return (
    <div className="stat">
      <div className="statTop">
        <div className="statLabel">{label}</div>
        <div className={`pill ${state}`}>{stateLabel}</div>
      </div>
      <div className="statValue">{displayValue}</div>
      {hint ? <div className="statHint">{hint}</div> : <div className="statHint" />}
    </div>
  )
}
