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
