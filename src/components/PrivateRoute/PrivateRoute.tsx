import { memo } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute = memo<PrivateRouteProps>(({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
})

PrivateRoute.displayName = 'PrivateRoute'

export { PrivateRoute }
