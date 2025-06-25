import { Dispatch, SetStateAction } from 'react'
import { Control, FieldErrors } from 'react-hook-form'

export type BalanceItem = {
  amount: number
  currency: string
}

export interface valueSelect {
  id: string
  icon: string
}

export type options = valueSelect

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

export interface ExchangeFormData {
  amount_sent: string
  amount_received: string
}

export interface ExchangeFormProps {
  setSelectedOptionSend: Dispatch<SetStateAction<valueSelect>>
  selectedOptionSend: valueSelect
  setSelectedOptionReceived: Dispatch<SetStateAction<valueSelect>>
  selectedOptionReceived: valueSelect
  setEditingField: Dispatch<SetStateAction<'send' | 'receive' | null>>
  balance: { [currency: string]: number }
  control: Control<ExchangeFormData>
  errors: FieldErrors<ExchangeFormData>
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
