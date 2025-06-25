import { useMemo } from 'react'
import clsx from 'clsx'
import type {
  ButtonColor,
  ButtonVariant,
  ButtonSize
} from '../components/Button/Button.types'

interface UseButtonStylesProps {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  isLoading?: boolean
  fullWidth?: boolean
  className?: string
}

// Custom hook for button styling logic - Single Responsibility
export const useButtonStyles = ({
  color = 'blue',
  variant = 'solid',
  size = 'md',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  className = ''
}: UseButtonStylesProps) => {
  const buttonClasses = useMemo(() => {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm h-9',
      md: 'px-4 py-3 text-base h-12',
      lg: 'px-6 py-4 text-lg h-14'
    }

    // Color and variant classes
    const getColorClasses = () => {
      if (disabled || isLoading) {
        return 'bg-grey-100 text-grey-200 cursor-not-allowed'
      }

      switch (variant) {
        case 'solid':
          switch (color) {
            case 'blue':
              return 'bg-gradient-to-r from-blue-200 to-blue-100 text-white-100 hover:from-blue-100 hover:to-blue-200 focus:ring-blue-200'
            case 'white':
              return 'bg-white-100 border border-blue-200 text-blue-200 hover:bg-white-200 focus:ring-blue-200'
            case 'red':
              return 'bg-red-100 text-white-300 hover:bg-red-200 focus:ring-red-100'
            case 'grey':
              return 'bg-grey-100 text-black-100 hover:bg-grey-200 focus:ring-grey-100'
            default:
              return 'bg-gradient-to-r from-blue-200 to-blue-100 text-white-100 hover:from-blue-100 hover:to-blue-200 focus:ring-blue-200'
          }
        case 'outline':
          switch (color) {
            case 'blue':
              return 'border-2 border-blue-200 text-blue-200 hover:bg-blue-200 hover:text-white-100 focus:ring-blue-200'
            case 'white':
              return 'border-2 border-white-100 text-white-100 hover:bg-white-100 hover:text-black-100 focus:ring-white-100'
            case 'red':
              return 'border-2 border-red-100 text-red-100 hover:bg-red-100 hover:text-white-300 focus:ring-red-100'
            case 'grey':
              return 'border-2 border-grey-100 text-grey-100 hover:bg-grey-100 hover:text-white-300 focus:ring-grey-100'
            default:
              return 'border-2 border-blue-200 text-blue-200 hover:bg-blue-200 hover:text-white-100 focus:ring-blue-200'
          }
        case 'ghost':
          switch (color) {
            case 'blue':
              return 'text-blue-200 hover:bg-blue-200 hover:bg-opacity-10 focus:ring-blue-200'
            case 'white':
              return 'text-white-100 hover:bg-white-100 hover:bg-opacity-10 focus:ring-white-100'
            case 'red':
              return 'text-red-100 hover:bg-red-100 hover:bg-opacity-10 focus:ring-red-100'
            case 'grey':
              return 'text-grey-100 hover:bg-grey-100 hover:bg-opacity-10 focus:ring-grey-100'
            default:
              return 'text-blue-200 hover:bg-blue-200 hover:bg-opacity-10 focus:ring-blue-200'
          }
        default:
          return 'bg-gradient-to-r from-blue-200 to-blue-100 text-white-100 hover:from-blue-100 hover:to-blue-200 focus:ring-blue-200'
      }
    }

    const widthClasses = fullWidth ? 'w-full' : ''

    return clsx(
      baseClasses,
      sizeClasses[size],
      getColorClasses(),
      widthClasses,
      className
    )
  }, [color, variant, size, disabled, isLoading, fullWidth, className])

  return buttonClasses
}
