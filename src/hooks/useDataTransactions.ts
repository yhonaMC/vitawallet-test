import { useState, useEffect, useCallback } from 'react'
import { getProfile } from '../api/get/profile'
import { getTransactions, type Empty } from '../api/get'
import type { CardsArray } from '../pages/Dashboard'

interface CurrencyAmount {
  currency: string
  amount: number
}

interface UseDataTransactionsReturn {
  balance: CardsArray[]
  name: string
  transactions: Empty[] | undefined
  isLoading: boolean
  error: string | null

  refetchData: () => void
  getAmountByCurrency: (
    currency: string,
    data: CurrencyAmount[]
  ) => number | undefined
  setBalance: (balance: CardsArray[]) => void
  setName: (name: string) => void
}

export const useDataTransactions = (): UseDataTransactionsReturn => {
  const [balance, setBalance] = useState<CardsArray[]>([])
  const [name, setName] = useState<string>('')
  const [transactions, setTransactions] = useState<Empty[] | undefined>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [refetch, setRefetch] = useState<boolean>(false)

  const getAmountByCurrency = useCallback(
    (currency: string | 'USD', data: CurrencyAmount[]): number | undefined => {
      const foundCurrency = data.find((item) => item.currency === currency)
      return foundCurrency?.amount
    },
    []
  )

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await getProfile()

      if (response?.data) {
        const userName = response.data.attributes.first_name
        const balances = response.data.attributes?.balances ?? {}

        const balanceArray: CardsArray[] = Object.entries(balances).map(
          ([currency, amount]) => ({
            currency,
            amount: Number(amount) || 0
          })
        )

        setBalance(balanceArray)
        setName(userName)
        setError(null)
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error fetching profile'
      setError(errorMessage)
      console.error('Error fetching user profile:', err)
    }
  }, [])

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await getTransactions()
      setTransactions(response?.data || [])
      setError(null)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error fetching transactions'
      setError(errorMessage)
      console.error('Error fetching transactions:', err)
    }
  }, [])

  const fetchAllData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      await Promise.all([fetchUserProfile(), fetchTransactions()])
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [fetchUserProfile, fetchTransactions])

  const refetchData = useCallback(() => {
    setRefetch((prev) => !prev)
  }, [])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData, refetch])

  return {
    balance,
    name,
    transactions,
    isLoading,
    error,
    refetchData,
    getAmountByCurrency,
    setBalance,
    setName
  }
}
