import { getOwnedGames } from 'server/core/request/steamApi'

const key: string = process.env.STEAM_KEY || ''
const blockApps = process.env.BLOCK_APPS || ''

export default defineEventHandler(async (event) => {
  try {
    const apps = blockApps.split(',')
    const id = getRouterParam(event, 'id')
    const { response } = await getOwnedGames({
      key,
      steamid: id,
      format: 'json',
    })

    // find the longest play time game
    const game = response.games.sort((a, b) => b.playtime_forever - a.playtime_forever).find(i => !apps.includes(i.appid?.toString()))
    return {
      appid: game?.appid,
    }
  }
  catch (error) {

  }
})
