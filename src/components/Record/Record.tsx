import { memo, useMemo } from 'react'
import { TransactionItem } from '../TransactionItem/TransactionItem'
import { EmptyState } from '../EmptyState/EmptyState'
import type { RecordProps } from './Record.type'
import {
  RECORD_LABELS,
  RECORD_STYLES,
  TRANSACTION_CATEGORY_DESCRIPTIONS,
  TRANSACTION_DEFAULTS
} from '../../constants'

const Record = memo<RecordProps>(({ transactions = [] }) => {
  const hasTransactions = useMemo(
    () => transactions && transactions.length > 0,
    [transactions]
  )

  const getTransactionDescription = (category?: string): string => {
    if (!category) return TRANSACTION_DEFAULTS.description
    return (
      TRANSACTION_CATEGORY_DESCRIPTIONS[
        category as keyof typeof TRANSACTION_CATEGORY_DESCRIPTIONS
      ] || TRANSACTION_DEFAULTS.description
    )
  }

  const transactionItems = useMemo(
    () =>
      transactions?.map((transaction, index) => {
        const { encrypt_id, category, amount, currency } =
          transaction.attributes || {}

        return {
          id: encrypt_id || `transaction-${index}`,
          description: getTransactionDescription(category),
          value: amount || TRANSACTION_DEFAULTS.amount,
          currency: currency || TRANSACTION_DEFAULTS.currency,
          transactionType: category,
          transaction
        }
      }) || [],
    [transactions]
  )

  if (!hasTransactions) {
    return <EmptyState message={RECORD_LABELS.emptyMessage} />
  }

  return (
    <section aria-label="Historial de transacciones">
      <h2 className={RECORD_STYLES.title}>{RECORD_LABELS.title}</h2>

      <div className={RECORD_STYLES.container} role="list">
        {transactionItems.map((item) => (
          <TransactionItem
            key={item.id}
            description={item.description}
            value={item.value}
            currency={item.currency}
            transactionType={item.transactionType}
          />
        ))}
      </div>
    </section>
  )
})

Record.displayName = 'Record'

export default Record
