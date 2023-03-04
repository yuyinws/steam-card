import type {
  BaseResponse,
  PlayedGames, PlayerParams,
  PlayerSummaries, RecentlyPlayedGames,
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

export function getSteamProfile(steamid: string) {
  return $fetch<string>(`https://steamcommunity.com/profiles/${steamid}/`)
}
