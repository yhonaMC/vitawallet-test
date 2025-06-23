import { memo } from 'react'

interface ErrorMessageProps {
  message: string | null
  onClose?: () => void
  className?: string
  variant?: 'inline' | 'banner'
  showIcon?: boolean
}

const ErrorMessage = memo<ErrorMessageProps>(
  ({
    message,
    onClose,
    className = '',
    variant = 'inline',
    showIcon = false
  }) => {
    if (!message) return null

    const baseClasses =
      variant === 'banner'
        ? 'p-4 mb-4 border border-red-300 rounded-lg bg-red-50'
        : 'text-sm text-red-600 mt-1'

    const iconClasses = variant === 'banner' ? 'w-5 h-5' : 'w-4 h-4'

    return (
      <div className={`${baseClasses} ${className}`} role="alert">
        <div className="flex items-start">
          {showIcon && (
            <svg
              className={`${iconClasses} text-red-500 mr-2 mt-0.5 flex-shrink-0`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div className="flex-1">
            <p
              className={
                variant === 'banner'
                  ? 'text-red-800 font-medium'
                  : 'font-medium'
              }
            >
              {message}
            </p>
          </div>
          {onClose && variant === 'banner' && (
            <button
              type="button"
              className="ml-3 text-red-400 hover:text-red-600 transition-colors duration-200"
              onClick={onClose}
              aria-label="Cerrar mensaje de error"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  }
)

ErrorMessage.displayName = 'ErrorMessage'

export default ErrorMessage
