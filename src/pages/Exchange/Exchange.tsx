import { useState } from 'react'
import { ArrayCrypto } from '@/utils'
import { postExchange } from '@/api/post/exchange'
import { useFetchPrices, useExchange, useDataTransactions } from '@/hooks'
import toast from 'react-hot-toast'
import { Button } from '@/components'
import clsx from 'clsx'

import ExchangeForm from './components/ExchangeForm'

import ExchangeResumen from './components/ExchangeResumen'

const Exchange = () => {
  const [selectedOptionSend, setSelectedOptionSend] = useState(ArrayCrypto[0])
  const [selectedOptionReceived, setSelectedOptionReceived] = useState(
    ArrayCrypto[1]
  )
  const [valueSend, setValueSend] = useState<string>('')
  const [valueRecived, setValueRecived] = useState<string>('')
  const [editingField, setEditingField] = useState<'send' | 'receive' | null>(
    null
  )
  const [steps, setSteps] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const { balance } = useDataTransactions()

  const hasAmounts = valueSend !== '' || valueRecived !== ''
  const { prices, isLoading, error, getPrice, refetchPrices } = useFetchPrices({
    enablePolling: true,
    pollingInterval: 10000,
    shouldFetch: true
  })

  useExchange(
    prices || {},
    selectedOptionSend.id,
    selectedOptionReceived.id,
    valueSend,
    valueRecived,
    editingField || '',
    setValueSend,
    setValueRecived
  )

  const priceSell = getPrice(selectedOptionSend.id, selectedOptionReceived.id)
  const isFormValid =
    valueSend !== '' && valueRecived !== '' && !isLoading && !error

  const handleExchange = async () => {
    if (!isFormValid) return

    try {
      const body = {
        currency_sent: selectedOptionSend.id,
        currency_received: selectedOptionReceived.id,
        amount_sent: Number(valueSend)
      }

      const response = await postExchange(body)

      if (!response?.error) {
        toast.success('Intercambio realizado exitosamente')
        await refetchPrices()
        setValueSend('')
        setValueRecived('')
        setSteps(1)
        setIsOpen(true)
      } else {
        setIsOpen(false)
        toast.error(response.error || 'Error en el intercambio')
      }
    } catch (err) {
      setIsOpen(false)
      const errorMessage =
        err instanceof Error ? err.message : 'Error inesperado'
      toast.error(errorMessage)
    }
  }

  const handleNextStep = () => {
    if (steps < 2) {
      setSteps(steps + 1)
    } else {
      handleExchange()
    }
  }

  const handlePreviousStep = () => {
    if (steps > 1) {
      setSteps(steps - 1)
    }
  }

  const balanceObject = balance.reduce((acc, item) => {
    acc[item.currency] = item.amount
    return acc
  }, {} as { [currency: string]: number })

  const exchangeFormProps = {
    selectedOptionReceived,
    selectedOptionSend,
    setSelectedOptionReceived,
    setSelectedOptionSend,
    setEditingField,
    setValueRecived,
    valueRecived,
    valueSend,
    setValueSend,
    balance: balanceObject
  }

  const exchangeResumenProps = {
    valueRecived,
    valueSend,
    selectedOptionSend,
    selectedOptionReceived,
    priceSell: priceSell || 0,
    setStep: setSteps,
    isOpen,
    setIsOpen
  }

  return (
    <div className="w-full flex flex-col gap-20 justify-center items-center lg:justify-start lg:items-start lg:pl-36">
      {prices?.error && (
        <div className="w-full max-w-[24.188rem] p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">Error al cargar precios:</p>
        </div>
      )}

      {steps === 1 ? (
        <ExchangeForm {...exchangeFormProps} />
      ) : (
        <ExchangeResumen {...exchangeResumenProps} />
      )}

      <div
        className={clsx(
          'flex flex-col-reverse sm:flex-row justify-center items-center w-full md:justify-start md:items-start gap-2',
          steps === 1
            ? 'mt-[12.2rem] md:mt-[16.2rem] lg:mt-[19.2rem]'
            : 'lg:gap-32 mt-[22.2rem] md:mt-[27.2rem] lg:mt-[25.2rem] lg:pl-12'
        )}
      >
        <Button
          name="Atrás"
          color="white"
          type="button"
          className="w-full lg:w-[11.438rem]"
          onClick={handlePreviousStep}
          disabled={steps === 1}
        />
        <Button
          name={steps === 1 ? 'Continuar' : 'Intercambiar'}
          type="button"
          disabled={!hasAmounts}
          className="w-full lg:w-[11.438rem]"
          onClick={handleNextStep}
        />
      </div>
    </div>
  )
}

export default Exchange
