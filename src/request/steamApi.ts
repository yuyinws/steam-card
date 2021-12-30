import { PlayerSummaries, RecentlyPlayedGames, OwnedGames,BaseParams } from '../types'
import request from './axios'

export const getPlayerSummaries = (params: PlayerSummaries) => {
  return request({
    url: '/ISteamUser/GetPlayerSummaries/v0002/',
    params: params,
  })
}

export const getRecentlyPlayedGames = (params: RecentlyPlayedGames) => {
  return request({
    url: '/IPlayerService/GetRecentlyPlayedGames/v0001/',
    params: params,
  })
}

export const getOwnedGames = (params: OwnedGames) => {
  return request({
    url: '/IPlayerService/GetOwnedGames/v0001/',
    params: params,
  })
}

export const getSteamLevel = (params: BaseParams) => {
  return request({
    url: '/IPlayerService/GetSteamLevel/v1/',
    params: params,
  })
}
