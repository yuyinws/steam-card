import request from './axios'
import type { BaseParams, OwnedGames, PlayerSummaries, RecentlyPlayedGames } from '~/types/index'

export const getPlayerSummaries = (params: PlayerSummaries) => {
  return request({
    url: '/ISteamUser/GetPlayerSummaries/v0002/',
    params,
  })
}

export const getRecentlyPlayedGames = (params: RecentlyPlayedGames) => {
  return request({
    url: '/IPlayerService/GetRecentlyPlayedGames/v0001/',
    params,
  })
}

export const getOwnedGames = (params: OwnedGames) => {
  return request({
    url: '/IPlayerService/GetOwnedGames/v0001/',
    params,
  })
}

export const getSteamLevel = (params: BaseParams) => {
  return request({
    url: '/IPlayerService/GetSteamLevel/v1/',
    params,
  })
}

export const getBadges = (params: BaseParams) => {
  return request({
    url: '/IPlayerService/GetBadges/v1/',
    params,
  })
}

export const getImage = (url: string) => {
  return request({
    url,
    responseType: 'arraybuffer',
  })
}

export const getSteamProfile = (id: any) => {
  return request({
    url: `https://steamcommunity.com/profiles/${id}/`,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
    },
  })
}
