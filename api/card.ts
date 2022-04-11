import path from 'path'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import cheerio from 'cheerio'
import i18n from 'i18n'
import {
  getBadges,
  getPlayerSummaries,
  getRecentlyPlayedGames,
  getSteamProfile,
} from '../src/request/steamApi'
import type { MyResponseType } from '../src/types/index'
import { steamCard } from '../src/render/steamCard'
import { imageUrl2Base64, string2Boolean, themeFormat } from '../src/utils/tools'
import errorCard from '../src/render/errorCard'

const key: any = process.env.STEAM_KEY
const JPEG_PREFIX = 'data:image/jpeg;base64,'
const PNG_PREFIX = 'data:image/png;base64,'
export default async(req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Content-Type', 'image/svg+xml')
  res.setHeader('Cache-Control', `public, max-age=${300}`)
  try {
    // eslint-disable-next-line prefer-const
    let { steamid, theme, group, badge, lang } = req.query as any
    lang = lang || 'zh-CN'
    i18n.configure({
      locales: ['en', 'zh-CN'],
      directory: path.join(__dirname, 'locales'),
    })
    i18n.setLocale(lang)
    const numberReg = /[A-Za-z]/
    if (steamid.match(numberReg) !== null)
      res.send(errorCard('SteamID不合法'))
    // 主题
    theme = themeFormat(theme)
    // 徽章参数
    const isBadge: boolean = string2Boolean(badge)
    // 群组参数
    const isGroup: boolean = string2Boolean(group)

    const AllData: Array<MyResponseType> = await Promise.all([
      getPlayerSummaries({ key, steamids: steamid }),
      getRecentlyPlayedGames({
        format: 'json',
        steamid,
        key,
        count: 0,
      }),
      getSteamProfile(steamid),
      getBadges({ key, steamid }),
    ])
    const [player, playedGames, profile, badges] = AllData
    const $ = cheerio.load(profile as any)
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
    const badgeIconUrl = $('.favorite_badge_icon').children().attr('src') as string
    let badgeIcon = await imageUrl2Base64(badgeIconUrl)
    badgeIcon = PNG_PREFIX + badgeIcon
    // 组icon
    const groupIconList: string[] = []
    $('.profile_group_links')
      .children()
      .last()
      .children()
      .each((i, el) => {
        const groupIconUrl = $(el).children().first().children().children().attr('src') as string
        groupIconList.unshift(groupIconUrl)
      })

    for (let i = 0; i < groupIconList.length; i++) {
      groupIconList[i] = await imageUrl2Base64(groupIconList[i])
      groupIconList[i] = JPEG_PREFIX + groupIconList[i]
    }

    const userInfo = player?.response?.players[0]
    const { avatarfull: avatarUrl, personaname: name, personastate: isOnline } = userInfo

    // 最近游戏
    let games = playedGames.response.games
    // 最近游戏时间
    let playTime = 0
    const gameImgList: string[] = []
    if (games) {
      games.forEach((game: any) => {
        playTime += game.playtime_2weeks
      })
      games = games.filter((game: any) => game.appid)
      games.splice(5, games.length - 5)

      for (const game of games) {
        const url = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`
        const imgBase64 = await imageUrl2Base64(url)
        gameImgList.push(JPEG_PREFIX + imgBase64)
      }
    }

    // 游戏时间

    playTime = parseInt(String(playTime / 60), 10)

    const badgeCount = badges.response.badges.length
    const playerLevel = badges.response.player_level

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
        isBadge,
        isGroup,
        playTime,
        groupIconList,
        groupCount,
        badgeIcon,
        i18n,
      ),
    )
  }
  catch (error: any) {
    // console.log(error)
    res.send(errorCard(error))
  }
}
