
export interface MyResponseType {
  response: any
}

export interface BaseParams {
  key: string
  steamid?:string
}
export interface PlayerSummaries extends BaseParams {
  steamids:string
}

export interface RecentlyPlayedGames extends BaseParams {
  format: string
  count: number
}

export interface OwnedGames extends BaseParams {
  format: string
}
