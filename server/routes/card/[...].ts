import { getPlayerSummaries, getRecentlyPlayedGames, getSteamProfile } from 'server/core/request/steamApi'
import { crawler, data, parseUrlConfig } from 'server/core/logic'
import initLocale from 'server/core/locales'
import type { Count } from 'types'
import { imageUrl2Base64, transparentImageBase64 } from 'server/core/utils'
import { generateError } from '~/server/core/render/template/error'
import { getGameCoverUrl } from '@/utils/common'
import { generateSvg } from '~/server/core/render/template/svg'

const i18n = initLocale('zhCN')
const JPEG_PREFIX = 'data:image/jpeg;base64,'
const PNG_PREFIX = 'data:image/png;base64,'

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig(event)
    const steamKey = runtimeConfig.steamKey
    const cacheTime = runtimeConfig.cacheTime || '3600'
    const blockUsers = runtimeConfig.blockUsers || ''
    const blockApps = runtimeConfig.blockApps || ''

    setHeader(event, 'Content-Type', 'image/svg+xml')
    setHeader(event, 'Cache-Control', `public, max-age=${cacheTime}`)
    const { _ } = event.context.params as { _: string }
    const splitArr = _.split('/')
    const steamid = splitArr[0]
    const settings = splitArr[1]
    const numberReg = /[A-Z]/i
    if (steamid.match(numberReg) !== null)
      return generateError(i18n.get('invalid_steamid'), i18n.get('error-info'))

    if (blockUsers.split(',').includes(steamid))
      return generateError('Sorry, your account had been banned.', i18n.get('error-info'))

    const { config } = parseUrlConfig(settings)
    i18n.setLocale(config.lang)

    const AllData = await Promise.all([
      getPlayerSummaries({ key: steamKey, steamids: steamid }),
      getRecentlyPlayedGames({
        format: 'json',
        steamid,
        key: steamKey,
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
      avatarUrl,
    } = crawler(profile)

    const { games, playTime, name, isOnline } = data(player.response.players[0], playedGames.response, blockApps)
    let badgeIcon = ''
    if (badgeIconUrl) {
      badgeIcon = await imageUrl2Base64(badgeIconUrl)
      badgeIcon = badgeIcon ? PNG_PREFIX + badgeIcon : transparentImageBase64
    }

    let avatarUrlBase64 = await imageUrl2Base64(avatarUrl!)
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

    config.statistics.forEach((item: any) => {
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

    if (config.bg.includes('bg-game')) {
      const arrs = config.bg.split('-')
      let url = ''
      if (arrs.length < 3) {
        const { appid } = await $fetch<{
          appid: number
        }>(`/info/games/${steamid}`)
        url = getGameCoverUrl(appid!)
      }
      else {
        url = getGameCoverUrl(arrs[2])
      }
      let gameBase64 = await imageUrl2Base64(url)
      gameBase64 = JPEG_PREFIX + gameBase64
      config.bg = `game-${gameBase64}`
    }

    return generateSvg({
      name,
      avatarUrlBase64,
      playerLevel,
      isOnline,
      gameImgs,
      theme: config.theme,
      badge: config.badge,
      group: config.group,
      bg: config.bg,
      textColor: config.textColor,
      playTime,
      groupIconList,
      badgeIcon,
      i18n,
      counts,
    })
  }
  catch (error) {
    console.error('[Steam Card] generate error:', error)
    return generateError(String(error), 'error')
  }
})
