export function formatCompactNumber(n: number): string {
  return new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(n)
}
