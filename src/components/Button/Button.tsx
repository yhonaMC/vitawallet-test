import { memo, forwardRef } from 'react'
import { useButtonStyles } from '../../hooks/useButtonStyles'
import { ButtonProps } from './Button.types'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        children,
        name,
        disabled = false,
        type = 'button',
        className = '',
        color = 'blue',
        variant = 'solid',
        size = 'md',
        fullWidth = false,
        isLoading = false,
        loadingText,
        leftIcon,
        rightIcon,
        onClick,
        onFocus,
        onBlur,
        ...rest
      },
      ref
    ) => {
      const buttonClasses = useButtonStyles({
        color,
        variant,
        size,
        disabled: disabled || isLoading,
        isLoading,
        fullWidth,
        className
      })

      const isDisabled = disabled || isLoading

      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled || !onClick) return
        onClick(event)
      }

      const renderIcon = (icon: React.ReactNode | string) => {
        if (typeof icon === 'string') {
          return <img src={icon} alt="" className="w-5 h-5" />
        }
        return icon
      }

      const renderContent = () => {
        if (isLoading) {
          return (
            <>
              <LoadingSpinner size={size} className="mr-2" />
              {loadingText || name || children}
            </>
          )
        }

        return (
          <>
            {leftIcon && <span className="mr-2">{renderIcon(leftIcon)}</span>}
            {name || children}
            {rightIcon && <span className="ml-2">{renderIcon(rightIcon)}</span>}
          </>
        )
      }

      return (
        <button
          {...rest}
          ref={ref}
          type={type}
          disabled={isDisabled}
          className={buttonClasses}
          onClick={handleClick}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-disabled={isDisabled}
          aria-busy={isLoading}
        >
          {renderContent()}
        </button>
      )
    }
  )
)

Button.displayName = 'Button'
