import { memo, useMemo } from 'react'
import { TransactionRow } from '../TransactionRow/TransactionRow'
import type { CardTransactionsProps } from './CardTransactions.type'
import { TRANSACTION_LABELS } from '../../constants'
import { useTransactionCalculations } from '../../hooks'
import { formatInputValue } from '@/utils'

export const CardTransactions = memo<CardTransactionsProps>(
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

    const formattedSend = formatInputValue(formattedSendAmount, sendCurrency)
    const formattedReceive = formatInputValue(
      formattedReceiveAmount,
      receiveCurrency
    )

    const transactionData = useMemo(
      () => [
        {
          id: 'exchange-amount',
          label: TRANSACTION_LABELS.EXCHANGE_AMOUNT,
          value: `${formattedSend} ${sendCurrency}`,
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
          value: `${formattedReceive} ${receiveCurrency}`,
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
        className={
          'w-[488px] h-[117px] bg-white-400 shadow-md rounded-lg flex flex-col justify-center px-4 font-sans'
        }
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
