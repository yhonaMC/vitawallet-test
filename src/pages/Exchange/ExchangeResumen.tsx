import Arrow from '../../assets/icons/arrow.svg'
import CardTransactions from '../../components/CardTransaction/CardTransactions'
import { Modal } from '../../components/Modal'
import type { ExchangeResumenProps } from './type'

const ExchangeResumen: React.FC<ExchangeResumenProps> = ({
  valueRecived,
  valueSend,
  selectedOptionReceived,
  selectedOptionSend,
  setStep,
  priceSell,
  isOpen,
  setIsOpen
}) => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center gap-5 mb-24">
        <button type="button" onClick={() => setStep(1)}>
          <img src={Arrow} alt="arrow-back" />
        </button>
        <h1 className="font-semibold text-3xl font-sans ">
          Resumen de transacción
        </h1>
      </div>
      <div className="pl-16">
        <CardTransactions
          valueRecived={valueRecived}
          valueSend={valueSend}
          selectedOptionReceived={selectedOptionReceived}
          selectedOptionSend={selectedOptionSend}
          priceSell={priceSell}
        />
      </div>
      <Modal open={isOpen} setOpen={setIsOpen} coin={selectedOptionSend.id} />
    </div>
  )
}

export default ExchangeResumen
