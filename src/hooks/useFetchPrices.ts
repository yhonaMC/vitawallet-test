import { useEffect, useState, useCallback, useRef } from 'react'
import { getPrices } from '../api/get'
import type { PricesResponse } from '../pages/Exchange/type'

interface UseFetchPricesOptions {
  enablePolling?: boolean
  pollingInterval?: number
  shouldFetch?: boolean
}

interface UseFetchPricesReturn {
  prices: PricesResponse | undefined
  isLoading: boolean
  error: string | null
  refetchPrices: () => Promise<void>
  getPrice: (sellCurrency: string, buyCurrency: string) => number | undefined
}

const CACHE_KEY = 'vitawallet_prices'
const CACHE_DURATION = 5 * 60 * 1000

export const useFetchPrices = (
  options: UseFetchPricesOptions = {}
): UseFetchPricesReturn => {
  const {
    enablePolling = false,
    pollingInterval = 20000,
    shouldFetch = true
  } = options

  const [prices, setPrices] = useState<PricesResponse | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<number | null>(null)
  const isMountedRef = useRef(true)
  const getCachedPrices = useCallback((): {
    prices: PricesResponse | null
    isExpired: boolean
  } => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return { prices: null, isExpired: true }

      const { data, timestamp } = JSON.parse(cached)
      const isExpired = Date.now() - timestamp > CACHE_DURATION

      return { prices: isExpired ? null : data, isExpired }
    } catch (error) {
      console.error('Error reading cached prices:', error)
      return { prices: null, isExpired: true }
    }
  }, [])

  const setCachedPrices = useCallback((pricesData: PricesResponse) => {
    try {
      const timestamp = Date.now()
      const cacheData = {
        data: pricesData,
        timestamp
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
      console.log(
        '✅ Prices updated in localStorage at:',
        new Date(timestamp).toLocaleTimeString()
      )
    } catch (error) {
      console.error('Error caching prices:', error)
    }
  }, [])

  const fetchPrices = useCallback(
    async (forceRefresh = false): Promise<void> => {
      if (!shouldFetch || !isMountedRef.current) return

      if (!forceRefresh) {
        const { prices: cachedPrices, isExpired } = getCachedPrices()
        if (cachedPrices && !isExpired) {
          setPrices(cachedPrices)
          setError(null)
          return
        }
      }

      try {
        setIsLoading(true)
        setError(null)

        const response = await getPrices()

        if (isMountedRef.current && response?.prices) {
          setPrices(response.prices)
          setCachedPrices(response.prices)
          console.log('🔄 Fresh prices fetched and cached successfully')
        } else {
          throw new Error('Invalid response from prices API')
        }
      } catch (err) {
        console.error('Error fetching prices:', err)
        if (isMountedRef.current) {
          const errorMessage =
            err instanceof Error ? err.message : 'Error fetching prices'
          setError(errorMessage)

          const { prices: cachedPrices } = getCachedPrices()
          if (cachedPrices) {
            setPrices(cachedPrices)
          }
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false)
        }
      }
    },
    [shouldFetch, getCachedPrices, setCachedPrices]
  )

  const refetchPrices = useCallback(async (): Promise<void> => {
    await fetchPrices(true)
  }, [fetchPrices])

  const getPrice = useCallback(
    (sellCurrency: string, buyCurrency: string): number | undefined => {
      if (!prices) {
        return undefined
      }

      const rate = prices[sellCurrency]?.[`${buyCurrency}_sell`]
      return rate
    },
    [prices]
  )

  useEffect(() => {
    const loadInitialPrices = async () => {
      const { prices: cachedPrices, isExpired } = getCachedPrices()
      if (cachedPrices && !isExpired) {
        setPrices(cachedPrices)
        setError(null)
        return
      }

      await fetchPrices(true)
    }

    loadInitialPrices()
  }, [])

  useEffect(() => {
    if (shouldFetch) {
      fetchPrices()
    }
  }, [fetchPrices, shouldFetch])
  useEffect(() => {
    if (enablePolling && shouldFetch) {
      console.log(
        `🔄 Starting polling every ${pollingInterval}ms (${
          pollingInterval / 1000
        }s)`
      )
      intervalRef.current = setInterval(() => {
        console.log('⏰ Polling tick - fetching prices...')
        fetchPrices()
      }, pollingInterval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        console.log('⏹️ Polling stopped')
      }
    }
    console.log('intervalRef ID:', intervalRef.current)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [enablePolling, shouldFetch, pollingInterval, fetchPrices])

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  return {
    prices,
    isLoading,
    error,
    refetchPrices,
    getPrice
  }
}
