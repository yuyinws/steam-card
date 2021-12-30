import axios, { AxiosRequestConfig } from 'axios'
import { MyResponseType } from '@/types/'

const proxy = {
  host: '127.0.0.1',
  port: 7890,
}

const instance = axios.create({
  baseURL: 'https://api.steampowered.com',
  proxy: process.env.MODE === 'development' ? proxy : undefined,
})

const request = async (config: AxiosRequestConfig): Promise<MyResponseType> => {
  try {
    const { data } = await instance.request<MyResponseType>(config)
    return data
  } catch (error) {
    console.log(error)
    throw new Error(error as any)
  }
}

export default request
