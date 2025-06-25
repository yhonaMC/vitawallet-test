import { memo } from 'react'
import { formatInputValue, validateCurrency } from '@/utils'
import { TransactionItemProps } from './TrasactionItem.type'
import clsx from 'clsx'

export const TransactionItem = memo<TransactionItemProps>(
  ({ description, value, currency, transactionType }) => {
    const formattedCurrency = currency.toUpperCase()
    const displayValue = typeof value === 'number' ? value.toFixed(2) : value

    const valuePrefix =
      transactionType === 'transfer'
        ? '-'
        : transactionType === 'exchange'
        ? ''
        : '+'

    const validateColor = (transactionType: string) => {
      if (transactionType === 'transfer') return 'text-red-100'
      if (transactionType === 'exchange') return 'text-black-100'
      return 'text-blue-200'
    }

    return (
      <div
        className={
          'flex justify-between items-center py-4 border-b border-grey-200'
        }
        role="listitem"
      >
        <span className={clsx('text-black-100 font-normal text-base')}>
          {description}
        </span>
        <span
          className={clsx(
            'flex items-center gap-1 font-semibold text-base',
            validateColor(transactionType)
          )}
        >
          <span className={'flex items-center gap-1'}>
            <span>{valuePrefix}</span>
            <span>
              {validateCurrency(currency, 'except-btc')}
              {formatInputValue(displayValue, currency)}
            </span>
          </span>
          <span className={clsx(' text-base', validateColor(transactionType))}>
            {formattedCurrency}
          </span>
        </span>
      </div>
    )
  }
)

TransactionItem.displayName = 'TransactionItem'
