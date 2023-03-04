import { steamAuth } from 'server/core/utils/steamAuth'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) as { 'openid.return_to': string }
    const origin = query['openid.return_to'].replace('/auth/callback', '')
    const { callback } = steamAuth(origin)

    const openid = await callback(event.node.req)
    setCookie(event, 'openid', openid)
    return sendRedirect(event, '/', 302)
  }
  catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Auth Fail',
    })
  }
})
