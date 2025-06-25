import type { Dispatch, SetStateAction } from 'react'

export interface ModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  coin: string
  setStep: Dispatch<SetStateAction<number>>
}
