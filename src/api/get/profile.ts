import { ENDPOINT_PROFILE } from '../../constants'
import api from '../interceptor/Api'
import type { ResponseProfile } from '../post/type'

export const getProfile = async (): Promise<ResponseProfile | null> => {
  let res = null as ResponseProfile | null
  await api.get(`${ENDPOINT_PROFILE}`).then(
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
