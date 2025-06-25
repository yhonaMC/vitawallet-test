import { memo } from 'react'
import { NavigationList } from '../NavigationList'
import { LogoutButton } from '../LogoutButton'
import { MobileSidebarProps } from './MobileSidebar.type'

export const MobileSidebar = memo<MobileSidebarProps>(
  ({ currentNavigation, onLogout }) => {
    return (
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar pb-2">
        <nav className="flex flex-1 flex-col mt-24">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <NavigationList
                currentNavigation={currentNavigation}
                variant="mobile"
              />
            </li>
            <li className="mt-auto mb-5 ">
              <LogoutButton onLogout={onLogout} />
            </li>
          </ul>
        </nav>
      </div>
    )
  }
)

MobileSidebar.displayName = 'MobileSidebar'
