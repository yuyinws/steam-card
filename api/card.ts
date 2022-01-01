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
  let { steamid, theme } = req.query as any
  theme = theme || 'dark'
  try {
    const AllData: Array<MyResponseType> = await Promise.all([
      getPlayerSummaries({ key: key, steamids: steamid }),
      getRecentlyPlayedGames({
        format: 'json',
        steamid: steamid,
        key: key,
        count: 0,
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

    let games = playedGames.response.games
    let playTime = 0
    games.forEach((game) => {
      playTime += game.playtime_2weeks
    })
    playTime = parseInt((String(playTime/60)))
    games.splice(10, games.length - 10)

    const gameCount = ownedGames.response.game_count
    const badgeCount = badges.response.badges.length
    const playerLevel = badges.response.player_level
    // const games: any = playedGames.response.games
    let gameImgList: string[] = []
    for (let i: number = 0; i < games.length; i++) {
      const url = `https://media.steampowered.com/steamcommunity/public/images/apps/${games[i].appid}/${games[i].img_logo_url}.jpg`
      const imgBase64 = await imageUrl2Base64(url)
      gameImgList.push(`data:image/jpeg;base64,${imgBase64}`)
    }
    let avatarUrlBase64 = await imageUrl2Base64(avatarUrl)
    avatarUrlBase64 = 'data:image/jpeg;base64,' + avatarUrlBase64
    res.setHeader('Content-Type', 'image/svg+xml')
    res.setHeader('Cache-Control', `public, max-age=${7200}`);
    res.send(
      steamCard(
        name,
        avatarUrlBase64,
        playerLevel,
        gameCount,
        badgeCount,
        isOnline,
        gameImgList,
        theme,
        playTime
      )
    )
  } catch (error) {
    res.json('Ops!')
    console.log(error)
  }
}
