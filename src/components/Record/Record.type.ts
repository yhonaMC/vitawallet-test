import type { Empty } from '../../api/get'

export interface RecordProps {
  transactions?: Empty[]
}

export interface TransactionAttributes {
  category_translate?: string
  amount?: string | number
  currency?: string
}

export interface Transaction {
  id?: string
  attributes?: TransactionAttributes
}

export interface TransactionItemData {
  id: string
  description: string
  value: string | number
  currency: string
  isPositive: boolean
}
