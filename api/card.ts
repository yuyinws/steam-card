import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  getPlayerSummaries,
  getRecentlyPlayedGames,
  getOwnedGames,
  getSteamLevel,
} from '../src/request/steamApi'
import { MyResponseType } from '../src/types/index'
import { steamCard } from '../src/render/steamCard'

const key: any = process.env.STEAM_KEY
export default async (req: VercelRequest, res: VercelResponse) => {
  const { steamid } = req.query as any
  try {
    const AllData: Array<MyResponseType> = await Promise.all([
      getPlayerSummaries({ key: key, steamids: steamid }),
      getRecentlyPlayedGames({ format: 'json', steamid: steamid, key: key }),
      getSteamLevel({ key: key, steamid: steamid }),
      getOwnedGames({ format: 'json', key: key, steamid: steamid }),
    ])
    
    const [player, playedGames, level, ownedGames] = AllData
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(steamCard(player?.response?.players[0]?.personaname))
  } catch (error) {
    res.json('Ops!')
    console.log(error)
  }
}
