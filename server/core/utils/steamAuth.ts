import type { IncomingMessage } from 'node:http'
import openid from 'openid'

export function steamAuth(origin: string) {
  const realm = decodeURI(origin)
  const returnUrl = `${realm}/auth/callback`
  const relyingParty = new openid.RelyingParty(
    returnUrl,
    realm,
    true,
    true,
    [],
  )

  async function getRedirectUrl(): Promise<string> {
    return new Promise((resolve) => {
      relyingParty.authenticate(
        'https://steamcommunity.com/openid',
        false,
        (error, authUrl) => {
          if (error)
            return new Error(`Authentication failed: ${error}`)
          if (!authUrl)
            return new Error('Authentication failed.')

          resolve(authUrl)
        },
      )
    })
  }

  async function callback(req: IncomingMessage) {
    return new Promise<string>((resolve) => {
      relyingParty.verifyAssertion(req, (err, result) => {
        if (err)
          throw new Error(err.message)
        if (!result || !result.authenticated)
          throw new Error('Failed to authenticate user.')

        const steamId = result.claimedIdentifier!.replace(
          'https://steamcommunity.com/openid/id/',
          '',
        )

        resolve(steamId)
      })
    })
  }

  return {
    getRedirectUrl,
    callback,
  }
}
