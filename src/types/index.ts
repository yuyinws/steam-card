
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
  'Accept-Language'?: string,
}

export interface OwnedGames extends BaseParams {
  format: string
}
