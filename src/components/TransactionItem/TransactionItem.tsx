import { memo } from 'react'
import clsx from 'clsx'

export interface TransactionItemProps {
  description: string
  value: string | number
  currency: string
  isPositive: boolean
}

const TRANSACTION_STYLES = {
  container:
    'flex justify-between py-4 border-b border-grey-200 transition-colors hover:bg-gray-50',
  description: 'text-black-100 text-base font-normal',
  value: 'font-semibold flex w-fit justify-end items-end gap-1',
  positive: 'text-blue-200',
  negative: 'text-red-100'
} as const

export const TransactionItem = memo<TransactionItemProps>(
  ({ description, value, currency, isPositive }) => {
    const valueClasses = clsx(
      TRANSACTION_STYLES.value,
      isPositive ? TRANSACTION_STYLES.positive : TRANSACTION_STYLES.negative
    )

    const formattedCurrency = currency.toUpperCase()
    const displayValue = typeof value === 'number' ? value.toFixed(2) : value

    return (
      <div className={TRANSACTION_STYLES.container} role="listitem">
        <span className={TRANSACTION_STYLES.description}>{description}</span>
        <span className={valueClasses}>
          <span>
            {isPositive ? '+' : '-'}
            {Math.abs(Number(displayValue))}
          </span>
          <span className="text-sm">{formattedCurrency}</span>
        </span>
      </div>
    )
  }
)

TransactionItem.displayName = 'TransactionItem'
