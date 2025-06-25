import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../Login'
import { useAuth } from '@/hooks/useAuth'
import { useLoginForm } from '@/hooks/useLoginForm'
import type { LoginFormData } from '../types'

vi.mock('@/hooks/useAuth')
vi.mock('@/hooks/useLoginForm')

vi.mock('../components/LoginHeader', () => ({
  default: ({ title, className }: { title: string; className: string }) => (
    <header data-testid="login-header" className={className}>
      {title}
    </header>
  )
}))

vi.mock('../components/LoginForm', () => ({
  default: ({
    isValid,
    isSubmitting,
    onSubmit,
    className
  }: {
    control: unknown
    validationRules: unknown
    isValid: boolean
    isSubmitting: boolean
    onSubmit: () => void
    className: string
  }) => (
    <form
      data-testid="login-form"
      className={className}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        data-testid="submit-button"
      >
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}))

vi.mock('../components/LoginIllustration', () => ({
  default: ({
    src,
    alt,
    className
  }: {
    src: string
    alt: string
    className: string
  }) => (
    <img
      data-testid="login-illustration"
      src={src}
      alt={alt}
      className={className}
    />
  )
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Login Component', () => {
  const mockLogin = vi.fn()
  const mockHandleSubmit = vi.fn()

  const defaultAuthState = {
    login: mockLogin,
    isLoading: false,
    user: null,
    isAuthenticated: false,
    error: null,
    logout: vi.fn(),
    clearError: vi.fn(),
    checkAuthStatus: vi.fn()
  }

  const defaultFormState = {
    control: {},
    handleSubmit: mockHandleSubmit,
    isValid: true,
    isSubmitting: false,
    validationRules: {
      email: {
        required: { value: true, message: 'Correo requerido' },
        pattern: { value: /test/, message: 'Email inválido' }
      },
      password: {
        required: { value: true, message: 'Contraseña requerida' }
      }
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useAuth as Mock).mockReturnValue(defaultAuthState)
    ;(useLoginForm as Mock).mockReturnValue(defaultFormState)
  })

  describe('Rendering', () => {
    it('should render all main components correctly', () => {
      renderWithRouter(<Login />)

      const header = screen.getByTestId('login-header')
      const form = screen.getByTestId('login-form')
      const illustration = screen.getByTestId('login-illustration')

      expect(header).toBeDefined()
      expect(form).toBeDefined()
      expect(illustration).toBeDefined()
    })

    it('should render with correct title', () => {
      renderWithRouter(<Login />)

      const header = screen.getByTestId('login-header')
      expect(header.textContent).toBe('Iniciar sesión')
    })

    it('should have correct main layout structure', () => {
      renderWithRouter(<Login />)

      const main = screen.getByRole('main')
      expect(main.className).toContain('min-h-screen')
      expect(main.className).toContain('bg-white-300')
      expect(main.className).toContain('flex')
      expect(main.className).toContain('flex-col')
    })

    it('should render illustration with correct alt text', () => {
      renderWithRouter(<Login />)

      const illustration = screen.getByTestId('login-illustration')
      expect(illustration.getAttribute('alt')).toBe(
        'Ilustración de inicio de sesión con persona y elementos financieros'
      )
    })
  })

  describe('Form Integration', () => {
    it('should call useLoginForm with handleFormSubmit callback', () => {
      renderWithRouter(<Login />)

      expect(useLoginForm).toHaveBeenCalledWith(expect.any(Function))
    })

    it('should pass correct props to LoginForm', () => {
      renderWithRouter(<Login />)

      const form = screen.getByTestId('login-form')
      expect(form.className).toContain('w-full')
    })

    it('should enable submit button when form is valid and not submitting', () => {
      renderWithRouter(<Login />)

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton.hasAttribute('disabled')).toBe(false)
      expect(submitButton.textContent).toBe('Iniciar sesión')
    })

    it('should disable submit button when form is invalid', () => {
      ;(useLoginForm as Mock).mockReturnValue({
        ...defaultFormState,
        isValid: false
      })

      renderWithRouter(<Login />)

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton.hasAttribute('disabled')).toBe(true)
    })
  })

  describe('Loading States', () => {
    it('should show loading state when auth is loading', () => {
      ;(useAuth as Mock).mockReturnValue({
        ...defaultAuthState,
        isLoading: true
      })

      renderWithRouter(<Login />)

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton.hasAttribute('disabled')).toBe(true)
    })

    it('should show loading state when form is submitting', () => {
      ;(useLoginForm as Mock).mockReturnValue({
        ...defaultFormState,
        isSubmitting: true
      })

      renderWithRouter(<Login />)

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton.hasAttribute('disabled')).toBe(true)
      expect(submitButton.textContent).toBe('Iniciando sesión...')
    })

    it('should combine both loading states correctly', () => {
      ;(useAuth as Mock).mockReturnValue({
        ...defaultAuthState,
        isLoading: true
      })
      ;(useLoginForm as Mock).mockReturnValue({
        ...defaultFormState,
        isSubmitting: true
      })

      renderWithRouter(<Login />)

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton.hasAttribute('disabled')).toBe(true)
    })
  })

  describe('Form Submission', () => {
    it('should call login function when form is submitted', async () => {
      const testFormData: LoginFormData = {
        email: 'test@example.com',
        password: 'password123',
        dev_mode: true
      }

      const mockHandleFormSubmit = vi.fn(async (data: LoginFormData) => {
        await mockLogin(data)
      })

      ;(useLoginForm as Mock).mockImplementation((callback) => {
        mockHandleFormSubmit.mockImplementation(callback)
        return {
          ...defaultFormState,
          handleSubmit: () => mockHandleFormSubmit(testFormData)
        }
      })

      renderWithRouter(<Login />)

      const submitButton = screen.getByTestId('submit-button')
      submitButton.click()

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(testFormData)
      })
    })

    it('should handle form submission errors gracefully', async () => {
      const mockError = new Error('Login failed')
      mockLogin.mockRejectedValueOnce(mockError)

      const mockHandleFormSubmit = vi.fn(async () => {
        throw mockError
      })

      ;(useLoginForm as Mock).mockReturnValue({
        ...defaultFormState,
        handleSubmit: mockHandleFormSubmit
      })

      renderWithRouter(<Login />)

      const submitButton = screen.getByTestId('submit-button')
      submitButton.click()

      await waitFor(() => {
        expect(mockHandleFormSubmit).toHaveBeenCalled()
      })
    })
  })

  describe('Hook Integration', () => {
    it('should use useAuth hook correctly', () => {
      renderWithRouter(<Login />)

      expect(useAuth).toHaveBeenCalled()
    })

    it('should use useLoginForm hook with correct callback', () => {
      renderWithRouter(<Login />)

      expect(useLoginForm).toHaveBeenCalledWith(expect.any(Function))
    })
  })

  describe('Component Memory Optimization', () => {
    it('should be memoized component', () => {
      expect(Login.displayName).toBe('Login')
    })
  })

  describe('Error Handling', () => {
    it('should handle auth errors correctly', () => {
      ;(useAuth as Mock).mockReturnValue({
        ...defaultAuthState,
        error: 'Credenciales inválidas'
      })

      renderWithRouter(<Login />)

      const form = screen.getByTestId('login-form')
      expect(form).toBeDefined()
    })
  })

  describe('Responsive Layout', () => {
    it('should have responsive classes for mobile and desktop', () => {
      renderWithRouter(<Login />)

      const main = screen.getByRole('main')
      expect(main.className).toContain('flex-col')

      const container = main.firstElementChild as HTMLElement
      expect(container?.className).toContain('px-4')
      expect(container?.className).toContain('sm:px-6')
      expect(container?.className).toContain('lg:px-16')
      expect(container?.className).toContain('xl:px-20')
    })

    it('should have responsive layout for form and illustration', () => {
      renderWithRouter(<Login />)

      const form = screen.getByTestId('login-form')
      const formContainer = form.closest('div') as HTMLElement
      expect(formContainer?.className).toContain('w-full')
      expect(formContainer?.className).toContain('max-w-md')
      expect(formContainer?.className).toContain('lg:max-w-lg')
      expect(formContainer?.className).toContain('xl:max-w-xl')

      const illustration = screen.getByTestId('login-illustration')
      expect(illustration.className).toContain('flex-1')
      expect(illustration.className).toContain('lg:max-w-2xl')
      expect(illustration.className).toContain('xl:max-w-3xl')
    })
  })
})
