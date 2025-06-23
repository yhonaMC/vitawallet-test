export const LOGIN_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  DEV_MODE: 'dev_mode'
} as const

// Input
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

// Button
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

// Card
export const CARD_STYLES =
  'w-[488px] h-[117px] bg-white-400 shadow-md rounded-lg flex flex-col justify-center px-4 font-sans'

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

// Auth
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde',
  SESSION_EXPIRED: 'Tu sesión ha expirado',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado'
} as const

// Navigation
export const navigation = [
  { name: 'Inicio', href: '/Dashboard' },
  { name: 'Transferir', href: '#' },
  { name: 'Recargar', href: '#' },
  { name: 'Intercambiar', href: '/Exchange' },
  { name: 'Perfil', href: '#' },
  { name: 'Ayuda', href: '#' }
] as const

// TransactionRow
export const VARIANT_STYLES = {
  default: 'text-black-100 font-semibold text-base',
  highlight: 'text-blue-100 font-semibold text-base'
} as const

export const SPACING_STYLES = {
  default: 'mt-1',
  last: 'mt-2'
} as const

// Record
export const RECORD_STYLES = {
  container: 'bg-white rounded-lg max-h-[34rem] overflow-y-auto',
  title: 'font-sans font-normal text-2xl mt-12 mb-4'
} as const

export const RECORD_LABELS = {
  title: 'Historial',
  emptyMessage: 'No hay transacciones disponibles'
} as const

// TransactionItem
