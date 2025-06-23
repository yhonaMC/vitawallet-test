import { memo, useMemo } from 'react'
import { TransactionItem } from '../TransactionItem/TransactionItem'
import { EmptyState } from '../EmptyState/EmptyState'
import type { RecordProps } from './type'
import { RECORD_LABELS, RECORD_STYLES } from '../../constants'
import { determineTransactionSign } from '../../utils'

const Record = memo<RecordProps>(({ transactions = [] }) => {
  const hasTransactions = useMemo(
    () => transactions && transactions.length > 0,
    [transactions]
  )

  const transactionItems = useMemo(
    () =>
      transactions?.map((transaction, index) => ({
        id: transaction.attributes?.encrypt_id || `transaction-${index}`,
        description:
          transaction.attributes?.category_translate || 'Sin descripción',
        value: transaction.attributes?.amount || '0',
        currency: transaction.attributes?.currency || '',
        positive: determineTransactionSign(transaction.attributes?.amount),
        transaction
      })) || [],
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
            isPositive={item.positive}
          />
        ))}
      </div>
    </section>
  )
})

Record.displayName = 'Record'

export default Record
