export interface BaseResponse<T> {
  response: T
}

export interface PlayerSummaries {
  players: Player[]
}

export interface Player {
  steamid: string
  personastate: number
  avatarfull: string
  personaname: string
}

interface Game {
  appid: number
  name: string
  playtime_2weeks: number
}

export interface PlayedGames {
  total_count: number
  games: Game[]
}

export interface BadgesResponse {
  player_level: number
  badges: []
}

export interface OwnedGames {
  game_count: number
  games: {
    appid: number
    playtime_forever: number
  }[]
}
