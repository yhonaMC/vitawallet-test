import { memo } from 'react'

interface LoginHeaderProps {
  title: string
  className?: string
}

const LoginHeader = memo<LoginHeaderProps>(({ title, className = '' }) => {
  return (
    <div
      className={`flex justify-center lg:justify-start lg:items-start ${className}`}
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-left text-black-100 leading-tight">
        {title}
      </h1>
    </div>
  )
})

LoginHeader.displayName = 'LoginHeader'

export default LoginHeader
