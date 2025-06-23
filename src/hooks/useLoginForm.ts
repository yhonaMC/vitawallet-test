import { useForm, type SubmitHandler } from 'react-hook-form'
import type { LoginFormData, LoginValidationRules } from '../pages/Login/types'
import { EMAIL_REGEX, VALIDATION_MESSAGES, LOGIN_FIELDS } from '../constants'

// Login form validation rules - Single Responsibility
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

// Custom hook for login form management
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

    // Default behavior (commented code from original component)
    // const res = await signIn(body)
    // if (res.data) {
    //   localStorage.setItem(
    //     'referral_token',
    //     JSON.stringify(res.headers['access-token'])
    //   )
    //   localStorage.setItem(
    //     'first_name',
    //     JSON.stringify(res.data?.attributes.first_name)
    //   )
    //   localStorage.setItem('uid', JSON.stringify(res.headers['uid']))
    //   localStorage.setItem('expiry', JSON.stringify(res.headers.expiry))
    //   localStorage.setItem('client', JSON.stringify(res.headers.client))
    //   navigate('/Dashboard')
    // }
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
