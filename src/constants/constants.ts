import { CurrencyType } from '@/utils/formatCurrency'
import Chile from '../assets/icons/chileCoin.svg'
import Bitcoin from '../assets/icons/bitcoin.svg'
import Tether from '../assets/icons/tether.svg'
import Usdc from '../assets/icons/usdc.svg'

export const ArrayBalance = [
  { title: 'usd', icon: Chile },
  { title: 'btc', icon: Bitcoin },
  { title: 'usdt', icon: Tether },
  { title: 'usdc', icon: Usdc }
]

export const ArrayCrypto = [
  { id: 'usd', icon: Chile },
  { id: 'btc', icon: Bitcoin },
  { id: 'usdt', icon: Tether },
  { id: 'usdc', icon: Usdc }
]

export const LOGIN_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  DEV_MODE: 'dev_mode'
} as const

export const PLACEHOLDERS = {
  EMAIL: 'juan@gmail.com',
  PASSWORD: 'Escribe tu contraseña'
} as const

export const LABELS = {
  EMAIL: 'Correo electrónico',
  PASSWORD: 'Contraseña',
  SUBMIT: 'Iniciar sesión',
  SUBMITTING: 'Iniciando sesión...',
  FORGOT_PASSWORD: '¿Olvidaste tu contraseña?'
} as const

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Correo requerido',
  EMAIL_INVALID: 'Dirección de email incorrecto',
  PASSWORD_REQUIRED: 'Contraseña requerida'
} as const

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const BUTTON_VARIANTS = {
  PRIMARY: 'blue',
  SECONDARY: 'white'
} as const

export const INPUT_TYPES = {
  EMAIL: 'email',
  PASSWORD: 'password',
  TEXT: 'text',
  NUMBER: 'number'
} as const

export const TRANSACTION_LABELS = {
  EXCHANGE_AMOUNT: 'Monto a intercambiar',
  EXCHANGE_RATE: 'Tasa de cambio',
  TOTAL_RECEIVE: 'Total a recibir'
} as const

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'referral_token',
  UID: 'uid',
  EXPIRY: 'expiry',
  CLIENT: 'client',
  FIRST_NAME: 'first_name'
} as const

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde',
  SESSION_EXPIRED: 'Tu sesión ha expirado',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado'
} as const

export const navigation = [
  { name: 'Inicio', href: '/dashboard' },
  { name: 'Transferir', href: '#' },
  { name: 'Recargar', href: '#' },
  { name: 'Intercambiar', href: '/exchange' },
  { name: 'Perfil', href: '#' },
  { name: 'Ayuda', href: '#' }
] as const

export const RECORD_LABELS = {
  title: 'Historial',
  emptyMessage: 'No hay transacciones disponibles'
} as const

export const TRANSACTION_CATEGORY_DESCRIPTIONS = {
  transfer: 'Transferiste',
  deposit: 'Recargaste',
  exchange: 'Intercambiaste'
} as const

export const TRANSACTION_DEFAULTS = {
  description: 'Sin descripción',
  amount: '0',
  currency: ''
} as const

export const TRANSACTION_TYPE_CONFIG = {
  transfer: {
    prefix: '-',
    styleClass: 'negative'
  },
  income: {
    prefix: '+',
    styleClass: 'positive'
  },
  exchange: {
    prefix: '',
    styleClass: 'interchanged'
  }
} as const

export type CurrencyConfig = {
  code: string
  symbol: string
  decimals: number
}

export const CURRENCY_MAPPINGS: Record<string, CurrencyType> = {
  usd: 'usd',
  usdc: 'usd',
  usdt: 'usd',
  btc: 'btc'
} as const

export const CURRENCY_CONFIGS: Record<CurrencyType, CurrencyConfig> = {
  usd: { code: 'USD', symbol: '$', decimals: 2 },
  btc: { code: 'BTC', symbol: '₿', decimals: 8 },
  usdt: { code: 'USDT', symbol: '$', decimals: 2 },
  usdc: { code: 'USDC', symbol: '$', decimals: 2 }
} as const

export const DEFAULT_CURRENCY: CurrencyType = 'usd'
