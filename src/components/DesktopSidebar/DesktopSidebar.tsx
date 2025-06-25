import { memo } from 'react'
import { NavigationList } from '../NavigationList'
import { LogoutButton } from '../LogoutButton'
import type { DesktopSidebarProps } from './DesktopSidebar.type'

export const DesktopSidebar = memo<DesktopSidebarProps>(
  ({ currentNavigation, onLogout }) => {
    return (
      <div className="relative hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[23.25rem] lg:flex-col overflow-x-hidden">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar">
          <nav className="flex flex-1 flex-col mt-24">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <NavigationList
                  currentNavigation={currentNavigation}
                  variant="desktop"
                />
              </li>
              <li className="mt-auto mb-5 ">
                <LogoutButton onLogout={onLogout} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
)

DesktopSidebar.displayName = 'DesktopSidebar'
