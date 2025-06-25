import { Controller } from 'react-hook-form'
import { Input, CustomSelect } from '@/components'
import Dollar from '@/assets/icons/dollar.svg'
import {
  formatInputValue,
  formatBalanceDisplay,
  handleInputValidation
} from '@/utils'
import { ArrayCrypto } from '@/constants'
import { ExchangeFormProps, valueSelect } from '../type'

const ExchangeForm: React.FC<ExchangeFormProps> = ({
  setSelectedOptionSend,
  selectedOptionSend,
  setSelectedOptionReceived,
  selectedOptionReceived,
  setEditingField,
  balance,
  control,
  errors
}) => {
  const handleSendCurrencyChange = (
    value: React.SetStateAction<valueSelect>
  ) => {
    const newOption =
      typeof value === 'function' ? value(selectedOptionSend) : value
    if (newOption.id === selectedOptionReceived.id) {
      setSelectedOptionReceived(selectedOptionSend)
    }
    setSelectedOptionSend(newOption)
  }

  const handleReceiveCurrencyChange = (
    value: React.SetStateAction<valueSelect>
  ) => {
    const newOption =
      typeof value === 'function' ? value(selectedOptionReceived) : value
    if (newOption.id === selectedOptionSend.id) {
      setSelectedOptionSend(selectedOptionReceived)
    }
    setSelectedOptionReceived(newOption)
  }

  const handleSendAmountChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    handleInputValidation(value, 'send', onChange, setEditingField)
  }

  const handleReceiveAmountChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    handleInputValidation(value, 'receive', onChange, setEditingField)
  }

  return (
    <>
      <form>
        <div className="flex flex-col gap-12 justify-center items-center lg:justify-start lg:items-start w-full">
          <h1 className="font-semibold text-[1.75rem] text-black-100 font-sans">
            ¿Qué deseas intercambiar?
          </h1>
          <h3 className="font-semibold text-base text-blue-200 mb-12">
            Saldo disponible: ${' '}
            {formatBalanceDisplay(
              balance[selectedOptionSend.id] || 0,
              selectedOptionSend.id
            )}{' '}
            {selectedOptionSend.id.toUpperCase()}
          </h3>
        </div>

        <div className="w-full max-w-[24.188rem]">
          <div className="w-full space-y-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-normal font-sans text-gray-900">
                Monto a intercambiar
              </h3>
              <div className="flex items-center w-full gap-2">
                <CustomSelect
                  options={ArrayCrypto}
                  selectedOption={selectedOptionSend}
                  setSelectedOption={handleSendCurrencyChange}
                  className="flex-shrink-0"
                />
                <Controller
                  name="amount_sent"
                  control={control}
                  rules={{
                    required: 'El monto es requerido',
                    min: { value: 0.01, message: 'El monto debe ser mayor a 0' }
                  }}
                  render={({ field }) => (
                    <Input
                      name="amount_sent"
                      type="text"
                      placeholder="0,00"
                      value={formatInputValue(
                        field.value || '',
                        selectedOptionSend.id
                      )}
                      onChange={(e) =>
                        handleSendAmountChange(e.target.value, field.onChange)
                      }
                      iconLeft={true}
                      icon={Dollar}
                      className="flex-1"
                      disabled={false}
                      maxLength={20}
                    />
                  )}
                />
              </div>
              {errors.amount_sent && (
                <p className="text-sm text-red-600">
                  {errors.amount_sent.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-base font-normal font-sans text-gray-900">
                Quiero recibir
              </h3>
              <div className="flex items-center w-full gap-2">
                <CustomSelect
                  options={ArrayCrypto}
                  selectedOption={selectedOptionReceived}
                  setSelectedOption={handleReceiveCurrencyChange}
                  className="flex-shrink-0"
                />
                <Controller
                  name="amount_received"
                  control={control}
                  render={({ field }) => (
                    <Input
                      name="amount_received"
                      type="text"
                      placeholder="0,00"
                      value={formatInputValue(
                        field.value || '',
                        selectedOptionReceived.id
                      )}
                      onChange={(e) =>
                        handleReceiveAmountChange(
                          e.target.value,
                          field.onChange
                        )
                      }
                      className="flex-1"
                      disabled={false}
                      maxLength={20}
                    />
                  )}
                />
              </div>
              {errors.amount_received && (
                <p className="text-sm text-red-600">
                  {errors.amount_received.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ExchangeForm
