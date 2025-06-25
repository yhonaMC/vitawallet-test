import type { Dispatch, SetStateAction } from 'react'

export interface valueSelect {
  id: string
  icon: string
}

interface TraditionalSelectProps {
  options: valueSelect[]
  setSelectedOption: Dispatch<SetStateAction<valueSelect>>
  selectedOption: valueSelect
  placeholder?: string
  disabled?: boolean
  className?: string
}

interface ControllerSelectProps {
  options: valueSelect[]
  value: valueSelect
  onChange: (value: valueSelect) => void
  onBlur?: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  name?: string
  error?: string
}

export type SelectProps = TraditionalSelectProps | ControllerSelectProps

export const isControllerProps = (
  props: SelectProps
): props is ControllerSelectProps => {
  return 'value' in props && 'onChange' in props
}

export const isTraditionalProps = (
  props: SelectProps
): props is TraditionalSelectProps => {
  return 'selectedOption' in props && 'setSelectedOption' in props
}
