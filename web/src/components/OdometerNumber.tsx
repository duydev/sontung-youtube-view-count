import { useMemo } from 'react'
import Odometer from 'react-odometerjs'

import 'odometer/themes/odometer-theme-default.css'

type Props = {
  value: number | null
  placeholder?: string
}

function formatGrouped(n: number): string {
  return new Intl.NumberFormat('vi-VN', { useGrouping: true, maximumFractionDigits: 0 }).format(n)
}

export function OdometerNumber({ value, placeholder = '—' }: Props) {
  const displayText = useMemo(() => {
    if (value == null || !Number.isFinite(value)) return placeholder
    return formatGrouped(value)
  }, [placeholder, value])

  const numericValue = value == null || !Number.isFinite(value) ? null : value

  return (
    <span className="odoWrap" aria-label={displayText}>
      {numericValue == null ? (
        <span className="odoPlaceholder">{placeholder}</span>
      ) : (
        <Odometer value={numericValue} format="(,ddd)" duration={560} theme="default" />
      )}
    </span>
  )
}
