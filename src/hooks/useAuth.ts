import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../api/post/login'
import type { LoginFormData } from '../pages/Login/types'
import type { AuthResponse, DynamicListData } from '../api/post/type'
import { AUTH_ERRORS, STORAGE_KEYS } from '../constants'
import { toast } from 'react-hot-toast'

interface AuthState {
  user: DynamicListData | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (credentials: LoginFormData) => Promise<void>
  logout: () => void
  clearError: () => void
  checkAuthStatus: () => boolean
}

interface UseAuthReturn extends AuthState, AuthActions {}

const getStorageItem = (key: string): string | null => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch {
    return null
  }
}

const setStorageItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
  }
}

const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
  }
}

const clearAuthStorage = (): void => {
  Object.values(STORAGE_KEYS).forEach(removeStorageItem)
}

const isTokenExpired = (): boolean => {
  const expiry = getStorageItem(STORAGE_KEYS.EXPIRY)
  if (!expiry) return true

  const expiryDate = new Date(parseInt(expiry) * 1000)
  return expiryDate <= new Date()
}

const getUserFromStorage = (): DynamicListData | null => {
  const firstName = getStorageItem(STORAGE_KEYS.FIRST_NAME)
  const uid = getStorageItem(STORAGE_KEYS.UID)

  if (!firstName || !uid) return null

  return {
    id: uid,
    type: 'user',
    attributes: {
      first_name: firstName,
      email: uid
    }
  } as DynamicListData
}

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error

  if (error instanceof Error) {
    if (
      error.message.includes('401') ||
      error.message.includes('Unauthorized')
    ) {
      return AUTH_ERRORS.INVALID_CREDENTIALS
    }
    if (error.message.includes('Network')) {
      return AUTH_ERRORS.NETWORK_ERROR
    }
    if (error.message.includes('500') || error.message.includes('Server')) {
      return AUTH_ERRORS.SERVER_ERROR
    }
    return error.message
  }

  return AUTH_ERRORS.UNKNOWN_ERROR
}

export const useAuth = (): UseAuthReturn => {
  const navigate = useNavigate()
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  })

  const checkAuthStatus = useCallback((): boolean => {
    const accessToken = getStorageItem(STORAGE_KEYS.ACCESS_TOKEN)
    const hasValidToken = accessToken && !isTokenExpired()

    if (!hasValidToken && accessToken) {
      clearAuthStorage()
      return false
    }

    return !!hasValidToken
  }, [])

  const initializeAuth = useCallback(() => {
    try {
      const isAuthenticated = checkAuthStatus()
      const user = isAuthenticated ? getUserFromStorage() : null

      setState((prev) => ({
        ...prev,
        isAuthenticated,
        user,
        isLoading: false
      }))
    } catch (error) {
      console.error('Error initializing auth:', error)
      setState((prev) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        isLoading: false
      }))
    }
  }, [checkAuthStatus])

  const login = useCallback(
    async (credentials: LoginFormData): Promise<void> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const response: AuthResponse = await signIn(credentials)

        if (!response.isSuccess || !response.data) {
          throw new Error(response.error || AUTH_ERRORS.INVALID_CREDENTIALS)
        }

        const { data, headers } = response

        setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, headers['access-token'])
        setStorageItem(STORAGE_KEYS.UID, headers.uid)
        setStorageItem(STORAGE_KEYS.EXPIRY, headers.expiry)
        setStorageItem(STORAGE_KEYS.CLIENT, headers.client)
        setStorageItem(STORAGE_KEYS.FIRST_NAME, data.attributes.first_name)

        setState((prev) => ({
          ...prev,
          user: data,
          isAuthenticated: true,
          isLoading: false,
          error: null
        }))

        navigate('/dashboard', { replace: true })
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        toast.error(errorMessage)
        setState((prev) => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: errorMessage
        }))

        clearAuthStorage()
      }
    },
    [navigate]
  )

  const logout = useCallback(() => {
    clearAuthStorage()

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    })

    navigate('/login', { replace: true })
  }, [navigate])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  useEffect(() => {
    const storageKeys = Object.values(STORAGE_KEYS) as string[]

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && storageKeys.includes(e.key)) {
        initializeAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [initializeAuth])

  return {
    ...state,
    login,
    logout,
    clearError,
    checkAuthStatus
  }
}
