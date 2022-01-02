import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  getPlayerSummaries,
  getRecentlyPlayedGames,
  getBadges,
  getSteamProfile,
} from '../src/request/steamApi'
import { MyResponseType } from '../src/types/index'
import { steamCard } from '../src/render/steamCard'
import { imageUrl2Base64 } from '../src/utils/tools'
import errorCard from '../src/render/errorCard'
import cheerio from 'cheerio'

const key: any = process.env.STEAM_KEY
const JPEG_PREFIX: string = 'data:image/jpeg;base64,'
const PNG_PREFIX: string = 'data:image/png;base64,'
export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Content-Type', 'image/svg+xml')
  res.setHeader('Cache-Control', `public, max-age=${300}`)
  try {
    let { steamid, theme } = req.query as any
    const numberReg = /[A-Za-z]/
    if (steamid.match(numberReg) !== null) {
      res.send(errorCard('SteamID不合法'))
    }
    theme = theme || 'dark'
    const AllData: Array<MyResponseType> = await Promise.all([
      getPlayerSummaries({ key: key, steamids: steamid }),
      getRecentlyPlayedGames({
        format: 'json',
        steamid: steamid,
        key: key,
        count: 0,
      }),
      getSteamProfile(steamid),
      getBadges({ key: key, steamid: steamid }),
    ])
    const [player, playedGames, profile, badges] = AllData
    let $ = cheerio.load(profile as any)
    // 游戏数
    const gameCount = $('.profile_item_links')
      .children()
      .first()
      .children()
      .find('.profile_count_link_total')
      .text()

    // 群组数
    const groupCount = $('.profile_group_links')
      .children()
      .first()
      .children()
      .find('.profile_count_link_total')
      .text()

    // 徽章icon
    const badgeIconUrl = $('.favorite_badge_icon')
      .children()
      .children()
      .attr('src') as string
    let badgeIcon = await imageUrl2Base64(badgeIconUrl)
    badgeIcon = PNG_PREFIX + badgeIcon
    // 组icon
    let groupIconList: string[] = []
    $('.profile_group_links')
      .children()
      .last()
      .children()
      .each((i, el) => {
        const groupIconUrl = $(el)
          .children()
          .first()
          .children()
          .children()
          .attr('src') as string
        groupIconList.unshift(groupIconUrl)
      })

    for (let i = 0; i < groupIconList.length; i++) {
      groupIconList[i] = await imageUrl2Base64(groupIconList[i])
      groupIconList[i] = JPEG_PREFIX + groupIconList[i]
    }

    const userInfo = player?.response?.players[0]
    const {
      avatarfull: avatarUrl,
      personaname: name,
      personastate: isOnline,
    } = userInfo

    let games = playedGames.response.games
    let playTime = 0
    games.forEach((game: any) => {
      playTime += game.playtime_2weeks
    })
    playTime = parseInt(String(playTime / 60))
    games.splice(5, games.length - 5)

    const badgeCount = badges.response.badges.length
    const playerLevel = badges.response.player_level
    let gameImgList: string[] = []
    for (let i: number = 0; i < games.length; i++) {
      const url = `https://media.steampowered.com/steamcommunity/public/images/apps/${games[i].appid}/${games[i].img_logo_url}.jpg`
      const imgBase64 = await imageUrl2Base64(url)
      gameImgList.push(JPEG_PREFIX + imgBase64)
    }
    let avatarUrlBase64 = await imageUrl2Base64(avatarUrl)
    avatarUrlBase64 = JPEG_PREFIX + avatarUrlBase64
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
        playTime,
        groupIconList,
        groupCount,
        badgeIcon
      )
    )
  } catch (error: any) {
    res.send(errorCard(error))
  }
}
