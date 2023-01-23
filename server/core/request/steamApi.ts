import type {
  BaseResponse,
  PlayedGames, PlayerParams,
  PlayerSummaries, RecentlyPlayedGames,
} from 'types'
import request from './axios'

export const getPlayerSummaries = (params: PlayerParams) => {
  return request<BaseResponse<PlayerSummaries>>({
    url: '/ISteamUser/GetPlayerSummaries/v0002/',
    params,
  })
}

export const getRecentlyPlayedGames = (params: RecentlyPlayedGames) => {
  return request<BaseResponse<PlayedGames>>({
    url: '/IPlayerService/GetRecentlyPlayedGames/v0001/',
    params,
  })
}

export const getImage = (url: string) => {
  return request<ArrayBuffer>({
    url,
    responseType: 'arraybuffer',
  })
}

export const getSteamProfile = (id: string) => {
  return request<string>({
    url: `https://steamcommunity.com/profiles/${id}/`,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
    },
  })
}
