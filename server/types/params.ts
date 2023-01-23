interface BaseParams {
  key: string
  steamid?: string
}
export interface PlayerParams extends BaseParams {
  steamids: string
}

export interface RecentlyPlayedGames extends BaseParams {
  format: string
  count: number
}
