import { memo } from 'react'
import clsx from 'clsx'
import { formatCurrency } from '../../utils'
import {
  TRANSACTION_ITEM_STYLES,
  TRANSACTION_TYPE_CONFIG
} from '../../constants'
import type { TransactionItemProps } from './TrasactionItem.type'

export const TransactionItem = memo<TransactionItemProps>(
  ({ description, value, currency, transactionType }) => {
    const getTransactionConfig = (type: string) => {
      const config =
        TRANSACTION_TYPE_CONFIG[type as keyof typeof TRANSACTION_TYPE_CONFIG]
      return config || { prefix: '', styleClass: 'positive' }
    }

    const transactionConfig = getTransactionConfig(transactionType)

    const valueClasses = clsx(
      TRANSACTION_ITEM_STYLES.value,
      TRANSACTION_ITEM_STYLES[
        transactionConfig.styleClass as keyof typeof TRANSACTION_ITEM_STYLES
      ]
    )

    const formattedCurrency = currency.toUpperCase()
    const displayValue = typeof value === 'number' ? value.toFixed(2) : value

    return (
      <div className={TRANSACTION_ITEM_STYLES.container} role="listitem">
        <span className={TRANSACTION_ITEM_STYLES.description}>
          {description}
        </span>
        <span className={valueClasses}>
          <span className={TRANSACTION_ITEM_STYLES.valueContainer}>
            <span>{transactionConfig.prefix}</span>
            {formatCurrency(displayValue, currency, 'es-US', true)}
          </span>
          <span className={TRANSACTION_ITEM_STYLES.currency}>
            {formattedCurrency}
          </span>
        </span>
      </div>
    )
  }
)

TransactionItem.displayName = 'TransactionItem'
