import { env } from 'node:process'
import { getPlayerSummaries } from 'server/core/request/steamApi'

const key: string = env.STEAM_KEY || ''

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')!
    const { response } = await getPlayerSummaries({
      key,
      steamids: id,
    })

    return {
      avatar: response.players[0].avatarfull,
      nickName: response.players[0].personaname,
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error),
    })
  }
})
