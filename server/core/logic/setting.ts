import type { Config, Statistic } from 'types'
import { defaultStatistics, statisticsList, themeList } from '@/utils/constant'

export function setting(_setting: string) {
  const setting: Config = {
    theme: 'dark',
    group: false,
    badge: false,
    lang: 'zhCN',
    statistics: [],
    textColor: '',
    bgColor: '',
  }

  const textReg = /text-([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/
  const bgReg = /^bg-([0-9a-fA-F]{6})(?:-([0-9a-fA-F]{6}))?$/

  const statisticSet: Set<Statistic> = new Set()

  if (_setting) {
    const settings = _setting.split(',')
    settings.forEach((item: any) => {
      if (themeList.includes(item)) {
        setting.theme = item
      }
      else if ((item.match(textReg) || {}).input) {
        setting.textColor = `#${item.split('-')[1]}`
      }
      else if ((item.match(bgReg) || {}).input) {
        let bgColor = ''
        const colors = item.split('-')
        colors.shift()
        if (colors.length === 1)
          colors.push(colors[0])
        for (let i = 0; i < colors.length; i++) {
          bgColor += `#${colors[i]}`
          if (i < colors.length - 1)
            bgColor += ','
        }
        setting.bgColor = bgColor
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
