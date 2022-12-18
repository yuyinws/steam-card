import {
  getBadges,
  getPlayerSummaries,
  getRecentlyPlayedGames,
  getSteamProfile,
} from 'server/core/request/steamApi'
import type { Count, MyResponseType } from 'server/core/types/index'
import { steamCard } from 'server/core/render/steamCard'
import { imageUrl2Base64 } from 'server/core/utils/tools'
import errorCard from 'server/core/render/errorCard'
import { crawler, data, setting } from 'server/core/logic'
import initLocale from 'server/core/locales'

const i18n = initLocale('zhCN')
const key: string = process.env.STEAM_KEY || ''
const cacheTime: string = process.env.CACHE_TIME || '3600'
const JPEG_PREFIX = 'data:image/jpeg;base64,'
const PNG_PREFIX = 'data:image/png;base64,'

export default defineEventHandler(async (event) => {
  try {
    setHeader(event, 'Content-Type', 'image/svg+xml')
    setHeader(event, 'Cache-Control', `public, max-age=${cacheTime}`)
    const { _ } = event.context.params
    const splitArr = _.split('/')
    const steamid = splitArr[0]
    const settings = splitArr[1]
    const { setting: _setting } = setting(settings)
    i18n.setLocale(_setting.lang as any)
    const numberReg = /[A-Za-z]/
    if (steamid.match(numberReg) !== null)
      return errorCard(i18n.get('invalid_steamid'), i18n.get('error-info'))

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

    const {
      gameCount,
      groupCount,
      badgeIconUrl,
      groupIconList,
      screenshotCount,
      artWorkCount,
      reviewCount,
      guideCount,
    } = crawler(profile) as any
    const { games, playTime, badgeCount, playerLevel, avatarUrl, name, isOnline } = data(player?.response?.players[0], playedGames, badges)
    let badgeIcon = ''
    if (badgeIconUrl) {
      badgeIcon = await imageUrl2Base64(badgeIconUrl)
      badgeIcon = PNG_PREFIX + badgeIcon
    }

    let avatarUrlBase64 = await imageUrl2Base64(avatarUrl)
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

    const counts: Count[] = []

    _setting.counts.forEach((item) => {
      switch (item) {
        case 'games':
          counts.push({
            name: i18n.get('games'),
            count: gameCount,
          })
          break
        case 'screenshots':
          counts.push({
            name: i18n.get('screenshots'),
            count: screenshotCount,
          })
          break
        case 'artworks':
          counts.push({
            name: i18n.get('artworks'),
            count: artWorkCount,
          })
          break
        case 'reviews':
          counts.push({
            name: i18n.get('reviews'),
            count: reviewCount,
          })
          break
        case 'guides':
          counts.push({
            name: i18n.get('guides'),
            count: guideCount,
          })
          break
        case 'groups':
          counts.push({
            name: i18n.get('groups'),
            count: groupCount,
          })
          break
        case 'badges':
          counts.push({
            name: i18n.get('badges'),
            count: badgeCount,
          })
          break
      }
    })

    return steamCard(
      name,
      avatarUrlBase64,
      playerLevel,
      isOnline,
      games,
      _setting.theme,
      _setting.badge,
      _setting.group,
      _setting.bgColor,
      _setting.textColor,
      playTime,
      groupIconList,
      badgeIcon,
      i18n,
      counts,
    )
  }
  catch (error) {
    return errorCard(error as string, 'error')
  }
})
