import type { PlayedGames, Player } from 'types'

export function data(userInfo: Player, playedGames: PlayedGames) {
  const { avatarfull: avatarUrl, personaname: name, personastate: isOnline } = userInfo
  const blockApps = process.env.BLOCK_APPS || ''
  const blockAppList = blockApps.split(',')
  // '<' cause svg render error
  const _name = name.replaceAll('<', '&lt;')

  let playTime = 0
  let games = playedGames.games || []

  games.forEach((game) => {
    playTime += game.playtime_2weeks
  })

  playTime = parseInt(String(playTime / 60), 10)
  games = games.filter(game => !blockAppList.includes(String(game.appid)))
  games.splice(5, games.length - 5)

  return { games, playTime, avatarUrl, name: _name, isOnline }
}
