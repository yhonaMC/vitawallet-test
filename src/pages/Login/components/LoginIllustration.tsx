import { memo } from 'react'

interface LoginIllustrationProps {
  src: string
  alt: string
  className?: string
}

const LoginIllustration = memo<LoginIllustrationProps>(
  ({ src, alt, className = '' }) => {
    return (
      <div
        className={`hidden lg:flex items-center justify-center ${className}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full max-w-lg xl:max-w-xl object-contain"
          loading="lazy"
        />
      </div>
    )
  }
)

LoginIllustration.displayName = 'LoginIllustration'

export default LoginIllustration
