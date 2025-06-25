import { memo, useCallback } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild
} from '@headlessui/react'
import { useLocation } from 'react-router-dom'
import type { LayoutProps } from './Layout.type'
import { useAuthContext } from '../../context/AuthContext'
import { useSidebar } from '../../hooks/useSidebar'
import { MobileHeader } from '../MobileHeader/MobileHeader'
import { MobileSidebar } from '../MobileSidebar'
import { DesktopSidebar } from '../DesktopSidebar'
import { useCurrentNavigation } from '../../hooks'

const Layout = memo<LayoutProps>(({ children }) => {
  const { logout } = useAuthContext()
  const location = useLocation()
  const { sidebarOpen, openSidebar, closeSidebar } = useSidebar()
  const { currentNavigation } = useCurrentNavigation(location)

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return (
    <div className="min-h-screen bg-gray-50">
      <Dialog
        open={sidebarOpen}
        onClose={closeSidebar}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={closeSidebar}
                  className="-m-2.5 p-2.5"
                  aria-label="Cerrar menú lateral"
                >
                  <span className="sr-only">Cerrar menú lateral</span>
                </button>
              </div>
            </TransitionChild>

            <MobileSidebar
              currentNavigation={currentNavigation}
              onLogout={handleLogout}
            />
          </DialogPanel>
        </div>
      </Dialog>

      <DesktopSidebar
        currentNavigation={currentNavigation}
        onLogout={handleLogout}
      />

      <MobileHeader
        currentNavigation={currentNavigation}
        onOpenSidebar={openSidebar}
      />

      <main className="py-10 lg:pl-96">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
})

Layout.displayName = 'Layout'

export { Layout }
