import { ArrayBalance, formatCurrency, type CurrencyType } from '../../utils'
import type { CardsProps } from './type'

const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <>
      <h1 className="font-sans text-2xl font-normal flex justify-center md:justify-start">
        Mis saldos
      </h1>
      <div className="flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-start lg:flex-wrap lg:justify-start xl:flex-nowrap xl:justify-start mt-4">
        {cards.map(({ amount, currency }, idx) => {
          const icon = ArrayBalance.find(
            (item) => item.title === currency.toLowerCase()
          )?.icon

          return (
            <div
              key={idx}
              className="flex flex-col bg-white-200 rounded-md w-[17.813rem] px-4 h-[8.063rem] justify-center gap-7 border-2 border-grey-200"
            >
              <div className="flex justify-between text-base font-sans ">
                <h3>{currency.toUpperCase()}</h3>
                <img src={icon} alt={`icon-${currency}`} />
              </div>
              <div className="font-semibold text-2xl">
                <h1>{formatCurrency(amount, currency as CurrencyType)}</h1>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default Cards
