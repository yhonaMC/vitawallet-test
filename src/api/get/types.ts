export interface transactionResponse {
  data: Empty[]
  id: string
  type: string
}

export interface Empty {
  attributes: Attributes
}

export interface Attributes {
  amount: string
  created_at: Date
  currency: string
  currency_iso_code: string
  gas: null
  gas_price: null
  from_address: null
  to_address: null
  fixed_cost: string
  recipient_email: null
  description: string
  source: string
  fee_type: string
  fee_value: string
  local_currency: string
  amount_local_currency: string
  total_fee: string
  total: string
  total_in_default_currency: string
  hash_result: null
  status: string
  currency_to_default_currency_price: string
  powwi_transaction_id: null
  account_bank: null
  favorite_account: null
  gmf: string
  iva: string
  commission_cost: string
  transaction_cost: string
  spot_price: string
  bonus_amount: null
  bonus_percentage: null
  bonus_type: null
  total_in_exchange_currency: null
  exchange_price: null
  exchange_currency: null
  purpose_comentary: null
  sender_remaining_balance: string
  user_device: null
  category: string
  remaining_balance: number
  sender_email: string
  recipient: Recipient
  encrypt_id: string
  category_translate: string
  invoices: null
  coupon_user: null
  coupon_transfer: null
  network: null
  reject_reason: null
  is_favorite: null
}

export interface Recipient {
  id: number
  first_name: string
  last_name: string
  email: string
}

export interface PriceResponse {
  prices: { [key: string]: { [key: string]: number } } | undefined
  valid_until: Date
}

export interface PriceState {
  [key: string]: { [key: string]: number } | undefined
}
