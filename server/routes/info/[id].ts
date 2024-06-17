import { getPlayerSummaries } from 'server/core/request/steamApi'

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig(event)
    const steamKey = runtimeConfig.steamKey
    const id = getRouterParam(event, 'id')!
    const { response } = await getPlayerSummaries({
      key: steamKey,
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
