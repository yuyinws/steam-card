import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  getPlayerSummaries,
  getRecentlyPlayedGames,
  getOwnedGames,
  getSteamLevel,
  getBadges
} from '../src/request/steamApi'
import { MyResponseType } from '../src/types/index'
import { steamCard } from '../src/render/steamCard'

const key: any = process.env.STEAM_KEY
export default async (req: VercelRequest, res: VercelResponse) => {
  const { steamid } = req.query as any
  try {
    const AllData: Array<MyResponseType> = await Promise.all([
      getPlayerSummaries({ key: key, steamids: steamid }),
      getRecentlyPlayedGames({ format: 'json', steamid: steamid, key: key ,count:10}),
      getOwnedGames({ format: 'json', key: key, steamid: steamid }),
      getBadges({key: key, steamid: steamid })
    ])

    const [player, playedGames, ownedGames,badges] = AllData
    const userInfo = player?.response?.players[0]
    const { avatarfull: avatarUrl, personaname: name,personastate:isOnline } = userInfo
    const gameCount = ownedGames.response.game_count
    const badgeCount = badges.response.badges.length
    const playerLevel = badges.response.player_level
    const games = playedGames.response.games
    // const name = "YuYin"
    // const avatarUrl = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8d/8dfe278c7493b6984540e57ecd57b791df13841e_full.jpg"
    // const playerLevel = 1233
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(steamCard(name, avatarUrl,playerLevel,gameCount,badgeCount,isOnline,games))
  } catch (error) {
    res.json('Ops!')
    console.log(error)
  }
}
