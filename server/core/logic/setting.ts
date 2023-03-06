import type { Config, Statistic } from 'types'
import { defaultStatistics, statisticsList, themes } from '@/utils/constant'

export function setting(_setting: string) {
  const setting: Config = {
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
        setting.theme = item
      }
      else if (item.includes('text-')) {
        setting.textColor = `#${item.split('-')[1]}`
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

        setting.bg = bg
      }
      else if (item === 'group') {
        setting.group = true
      }
      else if (item === 'badge') {
        setting.badge = true
      }
      else if (item === 'zhCN') {
        setting.lang = 'zhCN'
      }
      else if (item === 'en') {
        setting.lang = 'en'
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

  setting.statistics = statistics
  return {
    setting,
  }
}
