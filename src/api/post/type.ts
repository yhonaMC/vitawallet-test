/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SignInRequest {
  email: string
  password: string
  dev_mode: boolean
}

export interface AuthResponse {
  data: DynamicListData | null
  isSuccess: boolean
  headers: DynamicList
  error?: string
}

export interface DynamicList {
  'access-token': string
  client: string
  expiry: string
  uid: string
}
export interface ResponseProfile {
  data: DynamicListData
}

export interface BodyRequest {
  currency_sent: string
  currency_received: string
  amount_sent: number
}
export interface DynamicListData {
  id: string
  type: string
  attributes: Attributes
  relationships: Relationships
}

export interface Attributes {
  email: string
  daily_transbank_recharge_limit: null
  monthly_transbank_recharge_limit: null
  created_at: Date
  sign_in_count: number
  last_sign_in_at: Date
  eth_address: null
  default_currency: string
  first_name: string
  last_name: string
  birthdate: Date
  document_type: string
  document_number: string
  document_expedition_date: Date
  country_id: number
  address: string
  state_id: number
  city: null
  zipcode: string
  profile_completed: boolean
  serie_number: null
  accept_pep: boolean
  accept_real_info: boolean
  accept_funds: boolean
  admin: boolean
  email_confirmed: boolean
  account_bank: null
  is_admin: boolean
  credits_cards: any[]
  auto_convert_to_local_currency: boolean
  second_factor: boolean
  second_factor_confirmed: boolean
  profile_verification: string
  password_last_changed_at: null
  is_pin: boolean
  referral_token: string
  first_request_of_pin: boolean
  is_cashout: boolean
  is_business_api: boolean
  payment_orders_service_status: string
  total_sent_this_month: number
  civil_status: string
  phone: string
  ocupation: string
  gender: string
  status: string
  has_sent_transactions: boolean
  intercom_hash: string
  verification_attempts: null
  verification_type: string
  is_external_terms: boolean
  reason_for_rejection: string
  is_sent_receive: boolean
  is_sent_available: boolean
  is_user_card_available: boolean
  biometric_url: string
  is_service_payment: boolean
  is_email_code_verification: boolean
  first_transaction: boolean
  profile_verification_at: Date
  confirmed_at: Date
  source_biometric: string
  status_valoration_transaction: string
  rejected_note: null
  category: string
  register_utm: string
  secondary_document_type: null
  secondary_document_number: null
  is_referrals_system: boolean
  min_deposit_amount_referrer: string
  referrer_prize: string
  devices_list: any[]
  login_current: Login
  login_last: Login
  country_name: string
  state_name: string
  residence_country_name: string
  city_name: string
  city_id: number
  residence_country_id: number
  document_issuing_country_id: number
  document_issuing_country_name: string
  iso_code_country: string
  daily_transbank_recharge_limit_total: string
  monthly_transbank_recharge_limit_total: string
  verification_code_expiration_time: number
  balances: { [key: string]: number }
  btc_address: string
  document_image_url: string
  back_document_image_url: null
  facial_image_url: string
  avatar: null
  residence_image_url: null
  role: any
  is_vita_card_available: boolean
  vita_card_account_status: null
  vita_cards: null
  is_service_payment_available: boolean
  coupon: null
  biometric_verification: string
  active_cryptos: ActiveCryptos
  politically_exposed_person_check: boolean
  politically_exposed_person: any
  reason_for_update: null
  business_user: null
  profile_update_alerted_date: null
  default_fiat_currency: string
  default_crypto_currency: null
}

export interface ActiveCryptos {
  btc: Btc
  usdt: Usdt
  usdc: Usdc
}

export interface Btc {
  addresses: BtcAddress[]
}

export interface BtcAddress {
  blockcypher: string
}

export interface Usdc {
  addresses: UsdcAddress[]
}

export interface UsdcAddress {
  eth?: string
  trx?: string
}

export interface Usdt {
  addresses: UsdtAddress[]
}

export interface UsdtAddress {
  bsc: string
}

export interface Login {
  country: string
  city: string
  created_at: Date
  ip_address: string
}

export interface Relationships {
  country: Country
  residence_country: Referrals
  state: Country
  referrer: Referrals
  referrals: Referrals
}

export interface Country {
  data: CountryData
}

export interface CountryData {
  id: string
  type: string
}

export interface Referrals {
  data: any[] | CountryData | null
}
