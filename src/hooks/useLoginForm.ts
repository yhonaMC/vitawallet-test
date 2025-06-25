import { useForm, type SubmitHandler } from 'react-hook-form'
import { LoginFormData, LoginValidationRules } from '@/pages/Login/types'
import { EMAIL_REGEX, VALIDATION_MESSAGES, LOGIN_FIELDS } from '@/constants'

const getValidationRules = (): LoginValidationRules => ({
  email: {
    required: { value: true, message: VALIDATION_MESSAGES.EMAIL_REQUIRED },
    pattern: {
      value: EMAIL_REGEX,
      message: VALIDATION_MESSAGES.EMAIL_INVALID
    }
  },
  password: {
    required: { value: true, message: VALIDATION_MESSAGES.PASSWORD_REQUIRED }
  }
})

export const useLoginForm = (
  onSubmitCallback?: (data: LoginFormData) => Promise<void>
) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting }
  } = useForm<LoginFormData>({
    defaultValues: {
      [LOGIN_FIELDS.EMAIL]: '',
      [LOGIN_FIELDS.PASSWORD]: '',
      [LOGIN_FIELDS.DEV_MODE]: true
    },
    mode: 'onChange'
  })

  const validationRules = getValidationRules()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const formData = {
      ...data,
      [LOGIN_FIELDS.DEV_MODE]: true
    }

    if (onSubmitCallback) {
      await onSubmitCallback(formData)
    }
  }

  return {
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isSubmitting,
    validationRules
  }
}
