export function formatInputValue(value: string, currency: string): string {
  if (!value || value === '') return ''

  const numericValue = parseFloat(value)
  if (isNaN(numericValue)) return value

  const decimals = currency.toLowerCase() === 'btc' ? 8 : 2

  return numericValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  })
}

export function formatBalanceDisplay(
  value: number | string,
  currency: string
): string {
  if (!value && value !== 0) return '0'

  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(numericValue)) return '0'

  const decimals = currency.toLowerCase() === 'btc' ? 8 : 2

  return numericValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals
  })
}
