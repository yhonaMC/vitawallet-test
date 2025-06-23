// Base button properties - Interface Segregation Principle
export interface BaseButtonProps {
  children?: React.ReactNode
  name?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

// Styling properties
export interface ButtonStyleProps {
  color?: 'blue' | 'white' | 'red' | 'grey'
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

// Event handling properties
export interface ButtonEventProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
}

// Loading state properties
export interface ButtonLoadingProps {
  isLoading?: boolean
  loadingText?: string
}

// Icon properties
export interface ButtonIconProps {
  leftIcon?: React.ReactNode | string
  rightIcon?: React.ReactNode | string
}

// Complete Button props combining all interfaces
export interface ButtonProps
  extends BaseButtonProps,
    ButtonStyleProps,
    ButtonEventProps,
    ButtonLoadingProps,
    ButtonIconProps {}

// Button color variants
export type ButtonColor = 'blue' | 'white' | 'red' | 'grey'

// Button size variants
export type ButtonSize = 'sm' | 'md' | 'lg'

// Button variant types
export type ButtonVariant = 'solid' | 'outline' | 'ghost'
