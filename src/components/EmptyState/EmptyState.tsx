import { memo } from 'react'
import type { EmptyStateProps } from './EmptyState.type'

const EMPTY_STATE_STYLES = {
  container:
    'flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg',
  icon: 'w-16 h-16 text-gray-300 mb-4',
  message: 'text-gray-500 text-base font-normal text-center'
} as const

export const EmptyState = memo<EmptyStateProps>(
  ({ message, className = '' }) => {
    return (
      <div className={`${EMPTY_STATE_STYLES.container} ${className}`}>
        <svg
          className={EMPTY_STATE_STYLES.icon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className={EMPTY_STATE_STYLES.message}>{message}</p>
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'
