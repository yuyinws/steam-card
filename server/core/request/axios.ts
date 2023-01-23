import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import * as tunnel from 'tunnel'

const agent = tunnel.httpOverHttp({
  proxy: {
    host: process.env.PROXY_HOST as string,
    port: Number(process.env.PROXY_PORT),
  },
})

const instance = axios.create({
  baseURL: 'https://api.steampowered.com',
  httpsAgent: process.env.MODE === 'development' ? agent : false,
})

instance.interceptors.response.use((response) => {
  return response
}, (err) => {
  if (err.response?.status === 404 && err.response.request.host === 'steamcdn-a.akamaihd.net')
    return err
  else
    return Promise.reject(err)
})

const request = async<T = any> (config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await instance.request<T>(config)
    return data
  }
  catch (error) {
    // console.log(error)
    throw new Error(error as string)
  }
}

export default request
