import { useState, useCallback } from 'react'

interface UseSidebarReturn {
  sidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

export const useSidebar = (): UseSidebarReturn => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = useCallback(() => {
    setSidebarOpen(true)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  return {
    sidebarOpen,
    openSidebar,
    closeSidebar
  }
}
