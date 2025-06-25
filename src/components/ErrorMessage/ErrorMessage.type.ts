export interface ErrorMessageProps {
  message: string | null
  onClose?: () => void
  className?: string
  variant?: 'inline' | 'banner'
  showIcon?: boolean
}
