import type {
  BaseResponse,
  OwnedGames,
  OwnedParams,
  PlayedGames,
  PlayerParams,
  PlayerSummaries,
  RecentlyPlayedGames,
} from 'types'
import { apiFetch } from './fetch'

export function getImage(url: string) {
  return $fetch<ArrayBuffer>(url, {
    responseType: 'arrayBuffer',
  })
}

export function getPlayerSummaries(params: PlayerParams) {
  return apiFetch<BaseResponse<PlayerSummaries>>('/ISteamUser/GetPlayerSummaries/v0002/', {
    params,
  })
}

export function getRecentlyPlayedGames(params: RecentlyPlayedGames) {
  return apiFetch<BaseResponse<PlayedGames>>('/IPlayerService/GetRecentlyPlayedGames/v0001/', {
    params,
  })
}

export function getOwnedGames(params: OwnedParams) {
  return apiFetch<BaseResponse<OwnedGames>>('/IPlayerService/GetOwnedGames/v0001/', {
    params,
  })
}

export function getSteamProfile(steamid: string) {
  return $fetch<string>(`https://steamcommunity.com/profiles/${steamid}/`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
    },
  })
}
