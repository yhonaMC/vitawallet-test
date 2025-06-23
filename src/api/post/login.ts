import axios from 'axios'

import { ENDPOINT_LOGIN } from '../../constants'
import type { AuthResponse, DynamicList, SignInRequest } from './type'

export const signIn = async (data: SignInRequest): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(ENDPOINT_LOGIN, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'app-name': 'ANGIE'
      }
    })

    const { data: responseData, headers } = response

    const mappedHeaders: DynamicList = {
      'access-token': headers['access-token'] as string,
      client: headers['client'] as string,
      expiry: headers['expiry'] as string,
      uid: headers['uid'] as string
    }
    return {
      isSuccess: true,
      data: responseData ? responseData.data : null,
      headers: mappedHeaders
    }
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'An unexpected error occurred'

    const defaultHeaders: DynamicList = {
      'access-token': '',
      client: '',
      expiry: '',
      uid: ''
    }

    return {
      isSuccess: false,
      data: null,
      error: errorMessage,
      headers: defaultHeaders
    }
  }
}
