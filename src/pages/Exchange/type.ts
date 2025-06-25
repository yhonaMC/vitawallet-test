import type { Dispatch, SetStateAction } from 'react'

export type BalanceItem = {
  amount: number
  currency: string
}

export type options = { id: string; icon: string }

export type PricesResponse = {
  [currency: string]: {
    [key: string]: number | undefined
    btc?: number
    btc_sell?: number
    btc_min_total_send_external?: number
    btc_fee_send_external?: number
    usdt_fee_send_external?: number
    usdc_fee_send_external?: number
    usdc?: number
    usdc_sell?: number
    usdt?: number
    usdt_sell?: number
    usd?: number
    usd_sell?: number
  }
}

export interface ExchangeFormProps {
  setSelectedOptionSend: Dispatch<SetStateAction<options>>
  selectedOptionSend: options
  setSelectedOptionReceived: Dispatch<SetStateAction<options>>
  selectedOptionReceived: options
  setEditingField: Dispatch<SetStateAction<'send' | 'receive' | null>>
  setValueRecived: Dispatch<SetStateAction<string>>
  valueSend: string | undefined
  valueRecived: string
  setValueSend: Dispatch<SetStateAction<string>>
  balance: { [currency: string]: number }
}

export interface ExchangeResumenProps {
  valueSend: string | undefined
  valueRecived: string
  selectedOptionSend: options
  selectedOptionReceived: options
  priceSell: number
  setStep: Dispatch<SetStateAction<number>>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
