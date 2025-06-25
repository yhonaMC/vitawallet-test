/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister, Control, FieldError } from 'react-hook-form'

// Base input properties - Interface Segregation Principle
export interface BaseInputProps {
  name: string
  placeholder?: string
  type: string
  label?: string
  className?: string
  disabled?: boolean
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  maxLength?: number
}

// Password specific properties
export interface PasswordInputProps {
  isPassword?: boolean
}

// Icon specific properties
export interface IconInputProps {
  iconLeft?: boolean
  icon?: string
}

// Form integration properties
export interface FormInputProps {
  register?: UseFormRegister<any>
  control?: Control<any>
  rulesInput?: Record<string, unknown>
  error?: FieldError | string
}

// Event handling properties
export interface InputEventProps {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

// Complete Input props combining all interfaces
export interface InputProps
  extends BaseInputProps,
    PasswordInputProps,
    IconInputProps,
    FormInputProps,
    InputEventProps {}

// Input variant types
export type InputVariant = 'default' | 'error' | 'success'

// Input size types
export type InputSize = 'sm' | 'md' | 'lg'
