import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment, type JSX } from 'react'
import { createPortal } from 'react-dom'

import ImageModal from '../../assets/images/modalImage.png'
import Cancel from '../../assets/icons/cancel.svg'
import { ModalProps } from './Modal.type'

export const Modal: React.FC<ModalProps> = ({
  open,
  setOpen,
  coin,
  setStep
}): JSX.Element => {
  const handleCancel = (): void => {
    setOpen(false)
    setStep(1)
  }

  const modalContent = (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0"
        style={{ zIndex: 99999 }}
        open={open}
        onClose={() => {}} // Prevenir cierre automático
        static // Prevenir cierre al hacer click fuera
      >
        {/* Overlay oscuro de fondo */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 1
            }}
          />
        </Transition.Child>

        {/* Contenedor del modal */}
        <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: 2 }}>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'w-full max-w-[95.5%] transform overflow-hidden rounded-2xl bg-white text-left',
                  'align-middle shadow-2xl transition-all relative',
                  'p-12 md:max-w-[35.063rem]'
                )}
                style={{ zIndex: 3, backgroundColor: 'white' }}
              >
                <div className="flex justify-end items-end mb-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <img src={Cancel} alt="close-modal" className="w-6 h-6" />
                  </button>
                </div>
                <div
                  className={clsx('flex flex-row align-center justify-center')}
                >
                  <img src={ImageModal} alt="success-modal" />
                </div>
                <div className="flex flex-col justify-center items-center mt-7">
                  <h1 className="text-blue-200 font-semibold text-3xl font-sans">
                    ¡Intercambio exitoso!
                  </h1>
                  <p className="text-gray-700">
                    Ya cuentas con los {coin && coin.toUpperCase()} en tu saldo
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )

  // Renderizar el modal usando createPortal para evitar conflictos de z-index
  return createPortal(modalContent, document.body)
}
