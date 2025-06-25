import { useMemo } from 'react'
import { CurrencyType, formatCurrency } from '@/utils'

interface UseTransactionCalculationsProps {
  valueRecived?: number | string
  valueSend?: number | string
  selectedOptionReceived?: { id: string }
  selectedOptionSend?: { id: string }
  priceSell?: number
}

interface UseTransactionCalculationsReturn {
  formattedSendAmount: string
  formattedReceiveAmount: string
  sendCurrency: string
  receiveCurrency: string
  exchangeRateText: string
}

const cleanCurrencyValue = (formattedValue: string): string => {
  return formattedValue.replace(/[^\d.-]/g, '')
}

const formatCurrencyDisplay = (
  amount: number | string | undefined,
  currencyId?: string
): string => {
  if (!amount || !currencyId) return '0'

  try {
    return cleanCurrencyValue(
      formatCurrency(amount, currencyId as CurrencyType)
    )
  } catch {
    return String(amount)
  }
}

export const useTransactionCalculations = ({
  valueRecived = 0,
  valueSend = 0,
  selectedOptionReceived,
  selectedOptionSend,
  priceSell = 0
}: UseTransactionCalculationsProps): UseTransactionCalculationsReturn => {
  return useMemo(() => {
    const sendCurrency = selectedOptionSend?.id?.toUpperCase() || ''
    const receiveCurrency = selectedOptionReceived?.id?.toUpperCase() || ''

    const formattedSendAmount = formatCurrencyDisplay(
      valueSend,
      selectedOptionSend?.id
    )
    const formattedReceiveAmount = formatCurrencyDisplay(
      valueRecived,
      selectedOptionReceived?.id
    )

    const exchangeRateText = `1 ${receiveCurrency} = ${priceSell} ${receiveCurrency}`

    return {
      formattedSendAmount,
      formattedReceiveAmount,
      sendCurrency,
      receiveCurrency,
      exchangeRateText
    }
  }, [
    valueRecived,
    valueSend,
    selectedOptionReceived,
    selectedOptionSend,
    priceSell
  ])
}
