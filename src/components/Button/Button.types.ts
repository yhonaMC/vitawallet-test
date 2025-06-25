export interface BaseButtonProps {
  children?: React.ReactNode
  name?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface ButtonStyleProps {
  color?: 'blue' | 'white' | 'red' | 'grey'
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export interface ButtonEventProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
}

export interface ButtonLoadingProps {
  isLoading?: boolean
  loadingText?: string
}

export interface ButtonIconProps {
  leftIcon?: React.ReactNode | string
  rightIcon?: React.ReactNode | string
}

export interface ButtonProps
  extends BaseButtonProps,
    ButtonStyleProps,
    ButtonEventProps,
    ButtonLoadingProps,
    ButtonIconProps {}

export type ButtonColor = 'blue' | 'white' | 'red' | 'grey'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'
