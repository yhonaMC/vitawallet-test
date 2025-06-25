import { useEffect } from 'react'
import type { PricesResponse } from '../pages'

const calculateValue = (
  value: string,
  rate: number | undefined,
  callback: (calculatedValue: string) => void
) => {
  if (rate && value !== '') {
    const calculatedValue = (parseFloat(value) * rate).toFixed(4)
    callback(calculatedValue)
  } else if (value === '') {
    callback('')
  } else {
    console.error('Rate not found')
  }
}

const useExchangeRates = (
  prices: PricesResponse,
  selectedOptionSend: string,
  selectedOptionReceived: string,
  valueSend: string,
  valueRecived: string,
  editingField: string,
  setValueSend: (value: string) => void,
  setValueRecived: (value: string) => void
) => {
  useEffect(() => {
    if (prices && selectedOptionSend && selectedOptionReceived) {
      if (editingField === 'send') {
        const rate =
          prices[selectedOptionSend]?.[`${selectedOptionReceived}_sell`]
        calculateValue(valueSend, rate, setValueRecived)
      } else if (editingField === 'receive') {
        const rate =
          prices[selectedOptionReceived]?.[`${selectedOptionSend}_sell`]
        calculateValue(valueRecived, rate, setValueSend)
      }
    }
  }, [
    prices,
    selectedOptionSend,
    selectedOptionReceived,
    valueSend,
    valueRecived,
    editingField
  ])
}

export default useExchangeRates
