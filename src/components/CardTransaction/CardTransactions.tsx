import { memo, useMemo } from 'react'
import { TransactionRow } from '../TransactionRow/TransactionRow'
import type { CardTransactionsProps } from './CardTransactions.type'
import { CARD_STYLES, TRANSACTION_LABELS } from '../../constants'
import { useTransactionCalculations } from '../../hooks'

const CardTransactions = memo<CardTransactionsProps>(
  ({
    valueRecived,
    valueSend,
    selectedOptionReceived,
    selectedOptionSend,
    priceSell
  }) => {
    const {
      formattedSendAmount,
      formattedReceiveAmount,
      sendCurrency,
      receiveCurrency,
      exchangeRateText
    } = useTransactionCalculations({
      valueRecived,
      valueSend,
      selectedOptionReceived,
      selectedOptionSend,
      priceSell
    })

    const transactionData = useMemo(
      () => [
        {
          id: 'exchange-amount',
          label: TRANSACTION_LABELS.EXCHANGE_AMOUNT,
          value: `$ ${formattedSendAmount} ${sendCurrency}`,
          variant: 'default' as const
        },
        {
          id: 'exchange-rate',
          label: TRANSACTION_LABELS.EXCHANGE_RATE,
          value: exchangeRateText,
          variant: 'default' as const
        },
        {
          id: 'total-receive',
          label: TRANSACTION_LABELS.TOTAL_RECEIVE,
          value: `${formattedReceiveAmount} ${receiveCurrency}`,
          variant: 'highlight' as const
        }
      ],
      [
        formattedSendAmount,
        sendCurrency,
        exchangeRateText,
        formattedReceiveAmount,
        receiveCurrency
      ]
    )

    return (
      <div
        className={CARD_STYLES}
        role="region"
        aria-label="Resumen de transacción"
      >
        {transactionData.map((transaction, index) => (
          <TransactionRow
            key={transaction.id}
            label={transaction.label}
            value={transaction.value}
            variant={transaction.variant}
            isLast={index === transactionData.length - 1}
          />
        ))}
      </div>
    )
  }
)

CardTransactions.displayName = 'CardTransactions'

export default CardTransactions
