import { useState, useMemo } from 'react'

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
