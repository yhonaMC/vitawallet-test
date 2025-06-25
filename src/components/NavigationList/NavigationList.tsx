import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { navigation } from '../../constants'
import type { NavigationListProps } from './NavigationList.type'

export const NavigationList = memo<NavigationListProps>(
  ({ currentNavigation, variant = 'desktop' }) => {
    const getItemClasses = useCallback(
      (itemName: string) => {
        const isActive = currentNavigation === itemName
        const baseClasses =
          'group flex gap-x-3 rounded-r-full h-16 items-center w-[70%] text-2xl font-normal pl-12 leading-6 text-white-100 transition-colors duration-200'

        const activeClasses =
          variant === 'desktop'
            ? 'bg-blue-200 text-white-100 font-semibold'
            : 'bg-blue-200 text-white-100'

        const hoverClasses = 'hover:bg-blue-200 hover:text-white-100'

        return clsx(baseClasses, isActive ? activeClasses : hoverClasses)
      },
      [currentNavigation, variant]
    )

    const listClasses = variant === 'mobile' ? '-mx-2 space-y-7' : 'space-y-7'

    return (
      <ul role="list" className={listClasses}>
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className={getItemClasses(item.name)}
              aria-current={
                currentNavigation === item.name ? 'page' : undefined
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
)

NavigationList.displayName = 'NavigationList'
