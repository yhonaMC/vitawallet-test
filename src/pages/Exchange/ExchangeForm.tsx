import Input from '../../components/Input/Input'
import CustomSelect from '../../components/Select/Select'
import Dollar from '../../assets/icons/dollar.svg'
import { ArrayCrypto } from '../../utils'
import type { ExchangeFormProps } from './type'

const ExchangeForm: React.FC<ExchangeFormProps> = ({
  setSelectedOptionSend,
  selectedOptionSend,
  setSelectedOptionReceived,
  selectedOptionReceived,
  setEditingField,
  setValueRecived,
  valueSend,
  valueRecived,
  setValueSend,
  balance
}) => {
  const handleSendAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setEditingField('send')
      setValueSend(value)
    }
  }

  const handleReceiveAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setEditingField('receive')
      setValueRecived(value)
    }
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
            {(balance[selectedOptionSend.id] || 0).toLocaleString('es-CL')}{' '}
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
                  setSelectedOption={setSelectedOptionSend}
                  className="flex-shrink-0"
                />
                <Input
                  name="amount_sent"
                  type="text"
                  placeholder="0,00"
                  value={valueSend}
                  onChange={handleSendAmountChange}
                  iconLeft={true}
                  icon={Dollar}
                  className="flex-1"
                  disabled={false}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-base font-normal font-sans text-gray-900">
                Quiero recibir
              </h3>
              <div className="flex items-center w-full gap-2">
                <CustomSelect
                  options={ArrayCrypto}
                  selectedOption={selectedOptionReceived}
                  setSelectedOption={setSelectedOptionReceived}
                  className="flex-shrink-0"
                />
                <Input
                  name="amount_received"
                  type="text"
                  placeholder="0,00"
                  value={valueRecived}
                  onChange={handleReceiveAmountChange}
                  className="flex-1"
                  disabled={false}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ExchangeForm
