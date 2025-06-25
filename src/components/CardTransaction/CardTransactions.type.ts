export interface CardTransactionsProps {
  valueSend: string | undefined
  valueRecived: string
  selectedOptionSend: { id: string; icon: string }
  selectedOptionReceived: { id: string; icon: string }
  priceSell: number
}
