import { memo } from 'react'
import type { LoadingSpinnerProps } from './LoadingSpinner.type'

const LoadingSpinner = memo<LoadingSpinnerProps>(
  ({ size = 'md', color = 'blue', className = '' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    }

    const colorClasses = {
      blue: 'text-blue-600',
      white: 'text-white',
      gray: 'text-gray-600'
    }

    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner
