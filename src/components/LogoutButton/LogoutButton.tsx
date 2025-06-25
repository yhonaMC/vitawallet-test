import { memo } from 'react'
import { LogoutButtonProps } from './LogoutButton.type'

export const LogoutButton = memo<LogoutButtonProps>(
  ({ onLogout, className = '' }) => {
    const defaultClasses =
      'cursor-pointer flex pl-12 text-2xl text-white-100 hover:bg-blue-200 hover:text-white-100 rounded-r-full h-16 items-center w-[70%] transition-colors duration-200'

    return (
      <div className={`${defaultClasses} ${className}`}>
        <button
          type="button"
          onClick={onLogout}
          className="w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-sidebar rounded-r-full"
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </div>
    )
  }
)

LogoutButton.displayName = 'LogoutButton'
