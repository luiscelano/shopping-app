import axios from 'axios'
import config from 'src/config/constants'

const { API_URL } = config

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

httpClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default httpClient
