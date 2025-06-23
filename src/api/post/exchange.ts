/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT_TRANSACTION_EXCHANGE } from '../../constants'
import api from '../interceptor/Api'
import type { BodyRequest } from './type'

interface responseExchange {
  data: any
  error?: string
}

export const postExchange = async (
  body: BodyRequest
): Promise<responseExchange | null> => {
  let res = null as responseExchange | null
  try {
    const response = await api.post(`${ENDPOINT_TRANSACTION_EXCHANGE}`, body)
    res = { data: response.data }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      'Unknown error'
    res = { data: null, error: errorMessage }
  }
  return res
}
