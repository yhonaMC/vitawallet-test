/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister, Control, FieldError } from 'react-hook-form'

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

export interface PasswordInputProps {
  isPassword?: boolean
}

export interface IconInputProps {
  iconLeft?: boolean
  icon?: string
}

export interface FormInputProps {
  register?: UseFormRegister<any>
  control?: Control<any>
  rulesInput?: Record<string, unknown>
  error?: FieldError | string
}

export interface InputEventProps {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export interface InputProps
  extends BaseInputProps,
    PasswordInputProps,
    IconInputProps,
    FormInputProps,
    InputEventProps {}

export type InputVariant = 'default' | 'error' | 'success'

export type InputSize = 'sm' | 'md' | 'lg'
