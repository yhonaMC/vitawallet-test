import { memo, forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import clsx from 'clsx'
import type { InputProps } from './types'

import { usePasswordVisibility } from '../../hooks'
import PasswordToggle from '../PasswordToggle/PasswordToggle'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import CheckEmailIcon from '../../assets/icons/check-email.svg'

const BaseInput = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        name,
        placeholder,
        type,
        label,
        className = '',
        disabled = false,
        onBlur,
        onChange,
        value = '',
        isPassword = false,
        iconLeft = false,
        icon,
        error,
        ...rest
      },
      ref
    ) => {
      const { isVisible, toggleVisibility, inputType } = usePasswordVisibility()
      const finalType = isPassword ? inputType : type
      const hasError = Boolean(error)

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const isValidEmail =
        type === 'email' && value && emailRegex.test(value) && !hasError

      const inputClasses = clsx(
        'w-full h-14 px-4 rounded-lg border outline-none transition-all duration-200 font-medium text-base',
        'focus:ring-2 focus:ring-blue-200 focus:border-blue-200',
        hasError
          ? 'border-red-100 focus:ring-red-100 focus:border-red-100'
          : 'border-grey-100 hover:border-grey-200',
        disabled && 'bg-grey-200 cursor-not-allowed opacity-60',
        iconLeft && 'pl-12',
        (isPassword || isValidEmail) && 'pr-12',
        className
      )

      const labelClasses = clsx(
        'block text-sm font-medium mb-2 transition-colors',
        hasError ? 'text-red-100' : 'text-black-100'
      )

      return (
        <div className="w-full">
          {label && (
            <label htmlFor={name} className={labelClasses}>
              {label}
            </label>
          )}

          <div className="relative">
            <input
              {...rest}
              ref={ref}
              id={name}
              name={name}
              type={finalType}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onBlur={onBlur}
              onChange={onChange}
              className={inputClasses}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${name}-error` : undefined}
            />

            {iconLeft && icon && (
              <img
                src={icon}
                alt=""
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
            )}

            {isPassword && (
              <PasswordToggle
                isVisible={isVisible}
                onToggle={toggleVisibility}
              />
            )}

            {isValidEmail && (
              <img
                src={CheckEmailIcon}
                alt="Email válido"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
            )}
          </div>

          <ErrorMessage
            message={typeof error === 'string' ? error : error?.message || ''}
            variant="inline"
          />
        </div>
      )
    }
  )
)

BaseInput.displayName = 'BaseInput'

const Input = memo<InputProps>(
  ({ control, register, rulesInput, name, ...props }) => {
    if (control) {
      return (
        <Controller
          name={name}
          control={control}
          rules={rulesInput}
          render={({ field, fieldState }) => (
            <BaseInput
              {...props}
              {...field}
              name={name}
              error={fieldState.error}
            />
          )}
        />
      )
    }

    if (register) {
      const registration = register(name, rulesInput)
      return <BaseInput {...props} {...registration} name={name} />
    }

    return <BaseInput {...props} name={name} />
  }
)

Input.displayName = 'Input'

export default Input
