import path from 'path'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import i18n from 'i18n'
import {
  getBadges,
  getPlayerSummaries,
  getRecentlyPlayedGames,
  getSteamProfile,
} from '../src/request/steamApi'
import type { MyResponseType } from '../src/types/index'
import { steamCard } from '../src/render/steamCard'
import { imageUrl2Base64 } from '../src/utils/tools'
import errorCard from '../src/render/errorCard'
import { crawler, data, setting } from '../src/logic'

const key: any = process.env.STEAM_KEY
const JPEG_PREFIX = 'data:image/jpeg;base64,'
const PNG_PREFIX = 'data:image/png;base64,'
export default async(req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Content-Type', 'image/svg+xml')
  res.setHeader('Cache-Control', `public, max-age=${300}`)
  try {
    // eslint-disable-next-line prefer-const
    let { steamid, settings, group, badge } = req.query as any

    const { settingMap } = setting(settings, group, badge)

    i18n.configure({
      locales: ['en', 'zh-CN'],
      directory: path.join(__dirname, '../locales'),
    })
    i18n.setLocale(settingMap.lang)
    const numberReg = /[A-Za-z]/
    if (steamid.match(numberReg) !== null)
      res.send(errorCard(i18n.__('invalid_steamid'), i18n))

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

    const { gameCount, groupCount, badgeIconUrl, groupIconList } = crawler(profile) as any
    const { games, playTime, badgeCount, playerLevel, avatarUrl, name, isOnline } = data(player?.response?.players[0], playedGames, badges)

    let badgeIcon = await imageUrl2Base64(badgeIconUrl)
    let avatarUrlBase64 = await imageUrl2Base64(avatarUrl)
    badgeIcon = PNG_PREFIX + badgeIcon
    avatarUrlBase64 = avatarUrlBase64 ? JPEG_PREFIX + avatarUrlBase64 : ''

    for (let i = 0; i < groupIconList.length; i++) {
      groupIconList[i] = await imageUrl2Base64(groupIconList[i])
      groupIconList[i] = JPEG_PREFIX + groupIconList[i]
    }

    for (let i = 0; i < games.length; i++) {
      const url = `https://steamcdn-a.akamaihd.net/steam/apps/${games[i].appid}/header.jpg`
      games[i] = await imageUrl2Base64(url)
      games[i] = JPEG_PREFIX + games[i]
    }

    res.send(
      steamCard(
        name,
        avatarUrlBase64,
        playerLevel,
        gameCount,
        badgeCount,
        isOnline,
        games,
        settingMap.theme,
        settingMap.badge,
        settingMap.group,
        playTime,
        groupIconList,
        groupCount,
        badgeIcon,
        i18n,
      ),
    )
  }
  catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: card.ts ~ line 177 ~ async ~ error', error)
    res.send(errorCard(error, i18n))
  }
}
