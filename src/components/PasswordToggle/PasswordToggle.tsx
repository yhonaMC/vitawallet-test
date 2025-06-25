import { memo } from 'react'
import EyeOpen from '../../assets/icons/eyeOpenIcon.svg'
import EyeClose from '../../assets/icons/eyeCloseIcon.svg'
import type { PasswordToggleProps } from './PasswordToggle.type'

const PasswordToggle = memo<PasswordToggleProps>(
  ({ isVisible, onToggle, className = '' }) => {
    const icon = isVisible ? EyeOpen : EyeClose
    const ariaLabel = isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'

    return (
      <button
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors ${className}`}
        type="button"
        aria-label={ariaLabel}
        onClick={onToggle}
        tabIndex={0}
      >
        <img src={icon} alt={ariaLabel} className="w-5 h-5" />
      </button>
    )
  }
)

PasswordToggle.displayName = 'PasswordToggle'

export default PasswordToggle
