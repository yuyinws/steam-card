import type { Config, Statistic } from 'types'
import { defaultStatistics, statisticsList, themes } from '@/utils/constant'

export function parseUrlConfig(_setting: string) {
  const config: Config = {
    theme: 'dark',
    group: false,
    badge: false,
    lang: 'zhCN',
    statistics: [],
    textColor: '',
    bg: '',
  }

  const statisticSet: Set<Statistic> = new Set()

  if (_setting) {
    const settings = _setting.split(',')
    settings.forEach((item: any) => {
      if (themes.includes(item)) {
        config.theme = item
      }
      else if (item.includes('text-')) {
        config.textColor = `#${item.split('-')[1]}`
      }
      else if (item.includes('bg-')) {
        let bg = ''
        if (item.includes('game')) {
          bg = item
        }
        else {
          const colors = item.split('-')
          colors.shift()
          if (colors.length === 1)
            colors.push(colors[0])
          for (let i = 0; i < colors.length; i++) {
            bg += `#${colors[i]}`
            if (i < colors.length - 1)
              bg += ','
          }
        }

        config.bg = bg
      }
      else if (item === 'group') {
        config.group = true
      }
      else if (item === 'badge') {
        config.badge = true
      }
      else if (item === 'zhCN') {
        config.lang = 'zhCN'
      }
      else if (item === 'en') {
        config.lang = 'en'
      }
      else if (statisticsList.includes(item)) {
        statisticSet.add(item)
      }
    })
  }

  defaultStatistics.forEach((item) => {
    statisticSet.add(item)
  })

  const statistics = Array.from(statisticSet)

  if (statistics.length > 3)
    statistics.splice(3, statistics.length - 3)

  config.statistics = statistics
  return {
    config,
  }
}
