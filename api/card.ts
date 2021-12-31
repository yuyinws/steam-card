import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  getPlayerSummaries,
  getRecentlyPlayedGames,
  getOwnedGames,
  getBadges,
} from '../src/request/steamApi'
import { MyResponseType } from '../src/types/index'
import { steamCard } from '../src/render/steamCard'
import { imageUrl2Base64 } from '../src/utils/tools'

const key: any = process.env.STEAM_KEY
export default async (req: VercelRequest, res: VercelResponse) => {
  const { steamid } = req.query as any
  try {
    const AllData: Array<MyResponseType> = await Promise.all([
      getPlayerSummaries({ key: key, steamids: steamid }),
      getRecentlyPlayedGames({
        format: 'json',
        steamid: steamid,
        key: key,
        count: 10,
      }),
      getOwnedGames({ format: 'json', key: key, steamid: steamid }),
      getBadges({ key: key, steamid: steamid }),
    ])

    const [player, playedGames, ownedGames, badges] = AllData
    const userInfo = player?.response?.players[0]
    const {
      avatarfull: avatarUrl,
      personaname: name,
      personastate: isOnline,
    } = userInfo
    const gameCount = ownedGames.response.game_count
    const badgeCount = badges.response.badges.length
    const playerLevel = badges.response.player_level
    const games: any = playedGames.response.games

    let gameImgList: string[] = []
    for (let i: number = 0; i < games.length; i++) {
      const url = `https://media.steampowered.com/steamcommunity/public/images/apps/${games[i].appid}/${games[i].img_logo_url}.jpg`
      const imgBase64 = await imageUrl2Base64(url)
      gameImgList.push(`data:image/jpeg;base64,${imgBase64}`)
    }
    let avatarUrlBase64 = await imageUrl2Base64(avatarUrl)
    avatarUrlBase64 =  'data:image/jpeg;base64,' + avatarUrlBase64
    // const name = "YuYin"
    // const avatarUrl = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8d/8dfe278c7493b6984540e57ecd57b791df13841e_full.jpg"
    // const playerLevel = 1233
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(
      steamCard(
        name,
        avatarUrlBase64,
        playerLevel,
        gameCount,
        badgeCount,
        isOnline,
        gameImgList
      )
    )
  } catch (error) {
    res.json('Ops!')
    console.log(error)
  }
}
