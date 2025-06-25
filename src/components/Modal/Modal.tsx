import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment, type JSX } from 'react'

import ImageModal from '../../assets/images/modalImage.png'
import Cancel from '../../assets/icons/cancel.svg'
import { useNavigate } from 'react-router'
import { ModalProps } from './Modal.type'

export const Modal: React.FC<ModalProps> = ({
  open,
  setOpen,
  coin
}): JSX.Element => {
  const navigate = useNavigate()
  const handleCancel = (): void => {
    setOpen(false)
    navigate('/exchange')
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="z-30 fixed inset-0 "
        open={open}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black-1 bg-opacity-25" />
        </Transition.Child>

        <div
          aria-hidden="true"
          className="fixed inset-0 overflow-y-auto"
          onClick={() => setOpen(false)}
        />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={clsx(
              'absolute left-1/2 translate-y-[-50%] translate-x-[-30%]',
              'top-96',
              'w-full max-w-[95.5%] transform overflow-hidden rounded-2xl bg-white-300  text-left z-50',
              'align-middle shadow-xl transition-all relative',
              'p-12 md:max-w-[35.063rem]'
            )}
          >
            <div className=" flex justify-end items-end mb-2">
              <button type="button" onClick={handleCancel}>
                <img src={Cancel} alt="image-modal" />
              </button>
            </div>
            <div className={clsx('flex flex-row align-center justify-center')}>
              <img src={ImageModal} alt="image-modal" />
            </div>
            <div className="flex flex-col justify-center items-center mt-7">
              <h1 className="text-blue-200 font-semibold text-3xl font-sans">
                ¡Intercambio exitoso!
              </h1>
              <p>Ya cuentas con los {coin && coin.toUpperCase()} en tu saldo</p>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
