import { memo } from 'react'
import type { Control } from 'react-hook-form'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'
import { useAuth } from '../../../hooks/useAuth'
import type { LoginFormData, LoginValidationRules } from '../types'
import { LABELS, LOGIN_FIELDS, PLACEHOLDERS } from '../../../constants'

interface LoginFormProps {
  control: Control<LoginFormData>
  validationRules: LoginValidationRules
  isValid: boolean
  isSubmitting: boolean
  onSubmit: () => void
  className?: string
}

const LoginForm = memo<LoginFormProps>(
  ({
    control,
    validationRules,
    isValid,
    isSubmitting,
    onSubmit,
    className = ''
  }) => {
    const { error, clearError } = useAuth()

    return (
      <form
        className={`w-full max-w-sm lg:max-w-md xl:max-w-lg ${className}`}
        onSubmit={onSubmit}
      >
        {error && (
          <ErrorMessage
            message={error}
            variant="banner"
            onClose={clearError}
            className="mb-6"
          />
        )}

        <div className="mb-6">
          <Input
            name={LOGIN_FIELDS.EMAIL}
            label={LABELS.EMAIL}
            type="email"
            placeholder={PLACEHOLDERS.EMAIL}
            control={control}
            rulesInput={validationRules.email}
          />
        </div>

        <div className="mb-2">
          <Input
            name={LOGIN_FIELDS.PASSWORD}
            label={LABELS.PASSWORD}
            type="password"
            placeholder={PLACEHOLDERS.PASSWORD}
            control={control}
            rulesInput={validationRules.password}
            isPassword
          />
        </div>

        <div className="flex items-center justify-end mb-8 lg:mb-12">
          <a
            className="inline-block font-normal text-xs text-black-100 hover:text-blue-200 transition-colors duration-200"
            href="#"
            tabIndex={0}
            aria-label={LABELS.FORGOT_PASSWORD}
          >
            {LABELS.FORGOT_PASSWORD}
          </a>
        </div>

        <Button
          name={isSubmitting ? LABELS.SUBMITTING : LABELS.SUBMIT}
          disabled={!isValid || isSubmitting}
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          loadingText={LABELS.SUBMITTING}
        />
      </form>
    )
  }
)

LoginForm.displayName = 'LoginForm'

export default LoginForm
