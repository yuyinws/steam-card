import { blockApps } from './blockApps'

export function data(userInfo: any, playedGames: any, badges: any) {
  const { avatarfull: avatarUrl, personaname: name, personastate: isOnline } = userInfo

  // '<' cause svg render error
  const _name = name.replaceAll('<', '&lt;')

  let playTime = 0
  let games = playedGames.response.games || []

  const badgeCount = badges.response.badges.length
  const playerLevel = badges.response.player_level

  games.forEach((game: any) => {
    playTime += game.playtime_2weeks
  })

  playTime = parseInt(String(playTime / 60), 10)
  games = games.filter((game: any) => !blockApps.includes(game.appid))
  games.splice(5, games.length - 5)

  return { games, playTime, badgeCount, playerLevel, avatarUrl, name: _name, isOnline }
}
