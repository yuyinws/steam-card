import { getPlayerSummaries } from 'server/core/request/steamApi'

const key: string = process.env.STEAM_KEY || ''

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const { response } = await getPlayerSummaries({
      key,
      steamids: id,
    })

    return {
      avatar: response.players[0].avatarfull,
    }
  }
  catch (error) {

  }
})
