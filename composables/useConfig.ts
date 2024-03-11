import { defineStore } from 'pinia'
import { cloneDeep, isEqual } from 'lodash'
import type { ConfigMeta } from '~/types'

export const useConfig = defineStore('config', () => {
  const configMeta = ref<ConfigMeta>({
    theme: 'dark',
    textColor: '',
    bgType: 'color',
    bgColor: '',
    bgGameId: '',
    badge: true,
    group: true,
    statistics: ['groups', 'badges', 'games'],
  })

  const steamCardUrl = ref('')
  const imgLoading = ref(true)

  watch(steamCardUrl, () => {
    imgLoading.value = true
  })

  function parseConfig(locale: string, steamId: string) {
    const _configMeta = cloneDeep(configMeta.value)
    const configArr: string[] = [_configMeta.theme]
    if (locale !== 'zhCN')
      configArr.push(locale)

    if (_configMeta.badge)
      configArr.push('badge')

    if (_configMeta.group)
      configArr.push('group')

    if (_configMeta.textColor) {
      const textColor = _configMeta.textColor.replaceAll('#', '')
      configArr.push(`text-${textColor}`)
    }

    if (_configMeta.bgType === 'color' && _configMeta.bgColor) {
      let bgColor = _configMeta.bgColor.replaceAll('#', '')
      bgColor = bgColor.split(',').join('-')
      configArr.push(`bg-${bgColor}`)
    }
    else if (_configMeta.bgType === 'game-cover') {
      const bgGameId = _configMeta.bgGameId

      if (bgGameId)
        configArr.push(`bg-game-${bgGameId}`)
      else
        configArr.push('bg-game')
    }

    if (!isEqual(_configMeta.statistics, ['groups', 'badges', 'games']))
      configArr.push(..._configMeta.statistics)

    steamCardUrl.value = `/card/${steamId}/${configArr.join(',')}`
  }

  return {
    configMeta,
    parseConfig,
    steamCardUrl,
    imgLoading,
  }
}, {
  persist: true,
})
