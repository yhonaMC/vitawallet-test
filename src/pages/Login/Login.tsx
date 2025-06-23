import { memo } from 'react'
import { useLoginForm } from '../../hooks/useLoginForm'
import { useAuth } from '../../hooks/useAuth'
import LoginHeader from './components/LoginHeader'
import LoginForm from './components/LoginForm'
import LoginIllustration from './components/LoginIllustration'
import ImageLogin from '../../assets/images/amico.png'
import type { LoginFormData } from './types'

const Login = memo(() => {
  const { login, isLoading } = useAuth()

  const handleFormSubmit = async (data: LoginFormData) => {
    await login(data)
  }

  const { control, handleSubmit, isValid, isSubmitting, validationRules } =
    useLoginForm(handleFormSubmit)

  const isFormLoading = isSubmitting || isLoading

  return (
    <main className="min-h-screen bg-white-300 flex flex-col">
      <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-16 xl:px-20 py-8 lg:py-12">
        <LoginHeader
          title="Iniciar sesión"
          className="mb-12 sm:mb-16 lg:mb-20 "
        />

        <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8 lg:gap-12 xl:gap-16">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl flex-shrink-0">
            <LoginForm
              control={control}
              validationRules={validationRules}
              isValid={isValid}
              isSubmitting={isFormLoading}
              onSubmit={handleSubmit}
              className="w-full"
            />
          </div>

          <LoginIllustration
            src={ImageLogin}
            alt="Ilustración de inicio de sesión con persona y elementos financieros"
            className="flex-1 lg:max-w-2xl xl:max-w-3xl"
          />
        </div>
      </div>
    </main>
  )
})

Login.displayName = 'Login'

export default Login
