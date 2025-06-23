export interface LoginFormData {
  email: string
  password: string
  dev_mode: boolean
}

export interface LoginValidationRules {
  email: {
    required: { value: boolean; message: string }
    pattern: { value: RegExp; message: string }
  }
  password: {
    required: { value: boolean; message: string }
  }
}

export interface LoginFormState {
  isSubmitting: boolean
  showPassword: boolean
}
