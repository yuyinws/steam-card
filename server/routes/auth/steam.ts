import { steamAuth } from 'server/core/utils/steamAuth'

export default defineEventHandler(async (event) => {
  try {
    const { origin } = getQuery(event) as { origin: string }
    const { getRedirectUrl } = steamAuth(origin)
    const redirectUrl = await getRedirectUrl()

    return {
      redirectUrl,
    }
  }
  catch (error) {

  }
})
