import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.qa.vitawallet.io/api'
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('referral_token')
    const uid = localStorage.getItem('uid')
    const expiry = localStorage.getItem('expiry')
    const client = localStorage.getItem('client')

    config.headers['app-name'] = 'ANGIE'

    if (accessToken) {
      config.headers['access-token'] = `${JSON.parse(accessToken)}`
    }
    if (uid) {
      config.headers['uid'] = JSON.parse(uid)
    }
    if (expiry) {
      config.headers['expiry'] = JSON.parse(expiry)
    }
    if (client) {
      config.headers['client'] = JSON.parse(client)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
