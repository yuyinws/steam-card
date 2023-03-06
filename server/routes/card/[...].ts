import { getPlayerSummaries, getRecentlyPlayedGames, getSteamProfile } from 'server/core/request/steamApi'
import { steamCard } from 'server/core/render/steamCard'
import errorCard from 'server/core/render/errorCard'
import { crawler, data, setting } from 'server/core/logic'
import initLocale from 'server/core/locales'
import type { Count } from 'types'
import { imageUrl2Base64, transparentImageBase64 } from 'server/core/utils'
import { getGameCoverUrl } from '@/utils/common'

const i18n = initLocale('zhCN')
const key: string = process.env.STEAM_KEY || ''
const cacheTime: string = process.env.CACHE_TIME || '3600'
const blockUsers: string = process.env.BLOCK_USERS || ''
const JPEG_PREFIX = 'data:image/jpeg;base64,'
const PNG_PREFIX = 'data:image/png;base64,'

export default defineEventHandler(async (event) => {
  try {
    setHeader(event, 'Content-Type', 'image/svg+xml')
    setHeader(event, 'Cache-Control', `public, max-age=${cacheTime}`)
    const { _ } = event.context.params as { _: string }
    const splitArr = _.split('/')
    const steamid = splitArr[0]
    const settings = splitArr[1]
    const { setting: _setting } = setting(settings)
    i18n.setLocale(_setting.lang as any)
    const numberReg = /[A-Za-z]/
    if (steamid.match(numberReg) !== null)
      return errorCard(i18n.get('invalid_steamid'), i18n.get('error-info'))

    if (blockUsers.split(',').includes(steamid))
      return errorCard('Sorry, your account had been banned.', i18n.get('error-info'))

    const AllData = await Promise.all([
      getPlayerSummaries({ key, steamids: steamid }),
      getRecentlyPlayedGames({
        format: 'json',
        steamid,
        key,
        count: 0,
      }),
      getSteamProfile(steamid),
    ])
    const [player, playedGames, profile] = AllData

    const {
      gameCount,
      groupCount,
      badgeIconUrl,
      groupIconList,
      screenshotCount,
      artWorkCount,
      reviewCount,
      guideCount,
      badgeCount,
      playerLevel,
    } = crawler(profile)
    const { games, playTime, avatarUrl, name, isOnline } = data(player.response.players[0], playedGames.response)
    let badgeIcon = ''
    if (badgeIconUrl) {
      badgeIcon = await imageUrl2Base64(badgeIconUrl)
      badgeIcon = badgeIcon ? PNG_PREFIX + badgeIcon : transparentImageBase64
    }

    let avatarUrlBase64 = await imageUrl2Base64(avatarUrl)
    avatarUrlBase64 = avatarUrlBase64 ? JPEG_PREFIX + avatarUrlBase64 : transparentImageBase64

    for (let i = 0; i < groupIconList.length; i++) {
      groupIconList[i] = await imageUrl2Base64(groupIconList[i])
      groupIconList[i] = JPEG_PREFIX + groupIconList[i]
    }

    const gameImgs = []

    for (let i = 0; i < games.length; i++) {
      const url = getGameCoverUrl(games[i].appid)
      gameImgs[i] = await imageUrl2Base64(url)
      gameImgs[i] = gameImgs[i] ? JPEG_PREFIX + gameImgs[i] : transparentImageBase64
    }

    const counts: Count[] = []

    _setting.statistics.forEach((item) => {
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

    if (_setting.bg.includes('bg-game')) {
      const arrs = _setting.bg.split('-')
      let url = ''
      if (arrs.length < 3) {
        const { appid } = await $fetch(`/info/games/${steamid}`)
        url = getGameCoverUrl(appid!)
      }
      else {
        url = getGameCoverUrl(arrs[2])
      }
      let gameBase64 = await imageUrl2Base64(url)
      gameBase64 = JPEG_PREFIX + gameBase64
      _setting.bg = `game-${gameBase64}`
    }

    return steamCard(
      name,
      avatarUrlBase64,
      playerLevel,
      isOnline,
      gameImgs,
      _setting.theme,
      _setting.badge,
      _setting.group,
      _setting.bg,
      _setting.textColor,
      playTime,
      groupIconList,
      badgeIcon,
      i18n,
      counts,
    )
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: [...].ts:148 ~ defineEventHandler ~ error:', error)
    return errorCard(error as string, 'error')
  }
})
