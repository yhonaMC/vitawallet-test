export const validateCurrency = (
  currency: string,
  mode: 'usd-only' | 'except-btc' = 'usd-only'
) => {
  if (mode === 'except-btc') {
    return currency !== 'btc' ? '$' : ''
  }

  return currency === 'usd' ? '$' : ''
}

export const validateCurrencyItem = (currency: string) =>
  validateCurrency(currency, 'except-btc')
