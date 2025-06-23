import { Dispatch, SetStateAction } from 'react'

export interface SelectProps {
  options: valueSelect[]
  setSelectedOption: Dispatch<SetStateAction<valueSelect>>
  selectedOption: valueSelect
}

export interface valueSelect {
  id: string
  icon: string
}
