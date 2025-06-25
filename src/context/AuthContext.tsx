import { createContext, useContext, memo, type ReactNode } from 'react'
import { useAuth } from '@/hooks'
import { DynamicListData } from '@/api/post/type'

interface AuthContextValue {
  user: DynamicListData | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: {
    email: string
    password: string
    dev_mode: boolean
  }) => Promise<void>
  logout: () => void
  clearError: () => void
  checkAuthStatus: () => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = memo<AuthProviderProps>(({ children }) => {
  const authValue = useAuth()

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
})

AuthProvider.displayName = 'AuthProvider'

const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuthContext }
