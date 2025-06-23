import { ENDPOINT_TRANSACTIONS } from '../../constants'
import api from '../interceptor/Api'
import type { transactionResponse } from './types'

export const getTransactions =
  async (): Promise<transactionResponse | null> => {
    let res = null as transactionResponse | null
    await api.get(`${ENDPOINT_TRANSACTIONS}`).then(
      async (response) => {
        res = response.data
      },
      (error) => {
        console.error(error)
        res = error.response.data
      }
    )
    return res
  }
