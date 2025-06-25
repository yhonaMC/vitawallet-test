export type CurrencyType = 'usd' | 'btc' | 'usdt' | 'usdc'

interface CurrencyConfig {
  code: string
  symbol: string
  decimals: number
}

const CURRENCY_MAPPINGS: Record<string, CurrencyType> = {
  usd: 'usd',
  usdc: 'usd',
  usdt: 'usd',
  btc: 'btc'
} as const

const CURRENCY_CONFIGS: Record<CurrencyType, CurrencyConfig> = {
  usd: { code: 'USD', symbol: '$', decimals: 2 },
  btc: { code: 'BTC', symbol: '₿', decimals: 8 },
  usdt: { code: 'USDT', symbol: '$', decimals: 2 },
  usdc: { code: 'USDC', symbol: '$', decimals: 2 }
} as const

const DEFAULT_CURRENCY: CurrencyType = 'usd'

function getStandardCurrency(currency: string): CurrencyType {
  const normalizedCurrency = currency.toLowerCase().trim()
  const standardCurrency = CURRENCY_MAPPINGS[normalizedCurrency]

  if (!standardCurrency) {
    console.warn(
      `Unsupported currency code: ${currency}. Falling back to ${DEFAULT_CURRENCY}`
    )
    return DEFAULT_CURRENCY
  }

  return standardCurrency
}

function validateAmount(amount: number | string): number {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  if (isNaN(numericAmount) || !isFinite(numericAmount)) {
    throw new Error(`Invalid amount: ${amount}. Must be a valid number.`)
  }

  return numericAmount
}

function createFormatOptions(
  currency: CurrencyType,
  hideBtcSymbol: boolean = false
): Intl.NumberFormatOptions {
  const config = CURRENCY_CONFIGS[currency]

  if (currency === 'btc' && hideBtcSymbol) {
    return {
      style: 'decimal',
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals
    }
  }

  return {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
    currencyDisplay: 'symbol'
  }
}

export function formatCurrency(
  amount: number | string,
  currency: CurrencyType | string,
  locale: string = 'en-US',
  hideBtcSymbol: boolean = false
): string {
  try {
    const validatedAmount = validateAmount(amount)
    const standardCurrency =
      typeof currency === 'string' ? getStandardCurrency(currency) : currency

    const formatOptions = createFormatOptions(standardCurrency, hideBtcSymbol)

    return new Intl.NumberFormat(locale, formatOptions).format(validatedAmount)
  } catch (error) {
    console.error('Error formatting currency:', error)

    const fallbackAmount =
      typeof amount === 'string' ? parseFloat(amount) || 0 : amount || 0
    return `$${fallbackAmount.toFixed(2)}`
  }
}

export function getCurrencySymbol(currency: CurrencyType | string): string {
  try {
    const standardCurrency =
      typeof currency === 'string' ? getStandardCurrency(currency) : currency

    return CURRENCY_CONFIGS[standardCurrency]?.symbol || '$'
  } catch {
    return '$'
  }
}

export function getCurrencyDecimals(currency: CurrencyType | string): number {
  try {
    const standardCurrency =
      typeof currency === 'string' ? getStandardCurrency(currency) : currency

    return CURRENCY_CONFIGS[standardCurrency]?.decimals || 2
  } catch {
    return 2
  }
}

export const determineTransactionSign = (
  amount: string | number | undefined
): boolean => {
  if (!amount) return false
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return numericAmount >= 0
}
