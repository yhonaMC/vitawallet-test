import { memo } from 'react'
import clsx from 'clsx'
import Coin from '../../assets/images/coin.png'
import type { HeaderProps } from './types'

const Header = memo<HeaderProps>(
  ({ name, className = '', variant = 'default', showIcon = true }) => {
    const containerClasses = clsx(
      'flex items-center gap-3',
      variant === 'compact'
        ? 'justify-between'
        : 'justify-center lg:justify-between',
      className
    )

    const titleClasses = clsx(
      'font-normal',
      variant === 'compact' ? 'text-xl' : 'text-[1.75rem]'
    )

    const nameClasses = clsx(name && 'text-blue-200')

    return (
      <header className={containerClasses}>
        <div className="flex items-center gap-3">
          {showIcon && (
            <img src={Coin} alt="Vita Wallet Logo" className="w-auto h-auto" />
          )}
          <h1 className={titleClasses}>
            ¡Hola
            {name && <span className={nameClasses}> {name}!</span>}
            {!name && <span> bienvenido a vita wallet!</span>}
          </h1>
        </div>
      </header>
    )
  }
)

Header.displayName = 'Header'

export default Header
