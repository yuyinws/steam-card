import axios, { AxiosRequestConfig } from 'axios'
import { MyResponseType } from '@/types/'

const instance = axios.create({
  baseURL: 'https://api.steampowered.com/ISteamUser/',
})

export const request = async (
  config: AxiosRequestConfig
): Promise<MyResponseType> => {
  const response = await instance.request<MyResponseType>(config)
  response.code === 0
    ? console.log(response.message) // 成功消息提示
    : console.error(response.message) // 失败消息提示
  return response
}
