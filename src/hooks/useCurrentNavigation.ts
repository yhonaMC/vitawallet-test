import { useState, useEffect } from 'react'
import { navigation } from '@/constants'

interface UseCurrentNavigationReturn {
  currentNavigation: string
}

export const useCurrentNavigation = (location: {
  pathname: string
}): UseCurrentNavigationReturn => {
  const [currentNavigation, setCurrentNavigation] = useState<string>(
    navigation[0]?.name || ''
  )

  useEffect(() => {
    const currentPath = location.pathname
    const selectedItem = navigation.find((item) => item.href === currentPath)

    if (selectedItem) {
      setCurrentNavigation(selectedItem.name)
    }
  }, [location.pathname])

  return {
    currentNavigation
  }
}
