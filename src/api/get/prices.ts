import { ENDPOINT_PRICE } from '../../constants'
import api from '../interceptor/Api'
import type { PriceResponse } from './types'

export const getPrices = async (): Promise<PriceResponse | null> => {
  let res = null as PriceResponse | null
  await api.get(`${ENDPOINT_PRICE}`).then(
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
