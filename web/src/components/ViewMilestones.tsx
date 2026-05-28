import { useEffect, useMemo, useState } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

const STORAGE_KEY = 'yt:viewMilestones:v2'

const DEFAULT_MILESTONES = [
  100_000, 500_000, 1_000_000, 5_000_000, 10_000_000, 50_000_000, 100_000_000,
]

type Props = {
  currentViews: number | null
}

type MilestonesState = {
  milestones: number[]
  reachedAt: Record<string, string | undefined>
}

function formatMilestone(n: number) {
  return new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(n)
}

export function ViewMilestones({ currentViews }: Props) {
  const [state, setState] = useLocalStorageState<MilestonesState>(
    STORAGE_KEY,
    { milestones: DEFAULT_MILESTONES, reachedAt: {} },
    {
      deserialize: (raw) => {
        const parsed = JSON.parse(raw) as unknown
        // Migration:
        // v1 stored as number[]
        if (Array.isArray(parsed)) {
          const milestones = parsed
            .map((x) => Number(x))
            .filter((x) => Number.isFinite(x) && x > 0)
            .map((x) => Math.round(x))
          return { milestones, reachedAt: {} }
        }

        if (!parsed || typeof parsed !== 'object') {
          return { milestones: DEFAULT_MILESTONES, reachedAt: {} }
        }

        const milestonesRaw = (parsed as any).milestones
        const reachedAtRaw = (parsed as any).reachedAt

        const milestones = Array.isArray(milestonesRaw)
          ? milestonesRaw
              .map((x) => Number(x))
              .filter((x) => Number.isFinite(x) && x > 0)
              .map((x) => Math.round(x))
          : DEFAULT_MILESTONES

        const reachedAt: Record<string, string | undefined> =
          reachedAtRaw && typeof reachedAtRaw === 'object' ? reachedAtRaw : {}

        return { milestones, reachedAt }
      },
    },
  )

  const sorted = useMemo(
    () => Array.from(new Set(state.milestones)).sort((a, b) => a - b),
    [state.milestones],
  )

  const [draft, setDraft] = useState('')

  const add = () => {
    const next = Number(draft.replace(/[^\d]/g, ''))
    if (!Number.isFinite(next) || next <= 0) return
    setState((prev) => ({
      ...prev,
      milestones: Array.from(new Set([...prev.milestones, Math.round(next)])),
    }))
    setDraft('')
  }

  const remove = (n: number) => {
    setState((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [String(n)]: _unused, ...rest } = prev.reachedAt
      return {
        milestones: prev.milestones.filter((x) => x !== n),
        reachedAt: rest,
      }
    })
  }

  useEffect(() => {
    if (currentViews == null) return
    setState((prev) => {
      let changed = false
      const reachedAt = { ...prev.reachedAt }
      for (const m of sorted) {
        if (currentViews >= m && !reachedAt[String(m)]) {
          reachedAt[String(m)] = new Date().toISOString()
          changed = true
        }
      }
      return changed ? { ...prev, reachedAt } : prev
    })
  }, [currentViews, setState, sorted])

  return (
    <div className="milestones">
      <div className="milestonesTop">
        <div className="milestonesTitle">Mốc lượt xem</div>
        <div className="milestonesHint">Lưu tạm trong LocalStorage</div>
      </div>

      <div className="milestonesGrid">
        {sorted.map((m) => {
          const reached = currentViews != null && currentViews >= m
          const reachedAtIso = state.reachedAt[String(m)]
          const reachedAtText = reachedAtIso ? new Date(reachedAtIso).toLocaleString('vi-VN') : null
          return (
            <div key={m} className={`milestone ${reached ? 'reached' : ''}`}>
              <div className="milestoneLeft">
                <div className="milestoneValue">{formatMilestone(m)}</div>
                <div className="milestoneSub">
                  {m.toLocaleString('vi-VN')}
                  {reachedAtText ? ` • ${reachedAtText}` : ''}
                </div>
              </div>
              <div className="milestoneRight">
                <span className={`dot ${reached ? 'on' : ''}`} aria-hidden="true" />
                <button className="miniBtn" type="button" onClick={() => remove(m)}>
                  Xoá
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="milestonesAdd">
        <input
          className="input"
          inputMode="numeric"
          placeholder="Thêm mốc (vd: 2000000)"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') add()
          }}
        />
        <button className="btn" type="button" onClick={add}>
          Thêm
        </button>
      </div>
    </div>
  )
}
