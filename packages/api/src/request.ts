import axios from 'axios'
import { api } from './config'

const request = axios.create({
  // withCredentials: true,
  timeout: 5000,
})

export const config = (baseURL: string) => {
  request.defaults.baseURL = baseURL + api
}

request.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      ...(config?.headers || {}),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
})

export default request

export type RequestType = typeof request
