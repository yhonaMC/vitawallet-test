import { memo } from 'react'
import type { MobileHeaderProps } from './MobileHeader.type'

export const MobileHeader = memo<MobileHeaderProps>(
  ({ currentNavigation, onOpenSidebar }) => {
    return (
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-blue-300 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden focus:outline-none focus:ring-offset-2 rounded-md"
          aria-label="Abrir menú de navegación"
        >
          <span className="sr-only">Abrir menú lateral</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white-100">
          {currentNavigation}
        </div>
      </div>
    )
  }
)

MobileHeader.displayName = 'MobileHeader'
