import { useState, useMemo } from 'react'

// Custom hook for password visibility management - Single Responsibility
export const usePasswordVisibility = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  const inputType = useMemo(
    () => (isVisible ? 'text' : 'password'),
    [isVisible]
  )

  return {
    isVisible,
    toggleVisibility,
    inputType
  }
}
