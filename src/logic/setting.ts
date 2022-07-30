import { string2Boolean } from '../utils/tools'

interface Setting {
  theme: string
  lang: string
  group: boolean
  badge: boolean
  counts: string[]
}

export function setting(_setting: string, group: string, badge: string) {
  const setting: Setting = {
    theme: 'dark',
    group: false,
    badge: false,
    lang: 'zh-CN',
    counts: [],
  }

  const countsSet: Set<string> = new Set()

  if (_setting) {
    const settings = _setting.split(',')
    settings.forEach((item: string) => {
      switch (item) {
        case 'dark':
          setting.theme = 'dark'
          break
        case 'light':
          setting.theme = 'light'
          break
        case 'group':
          setting.group = true
          break
        case 'badge':
          setting.badge = true
          break
        case 'zh-CN':
          setting.lang = 'zh-CN'
          break
        case 'en':
          setting.lang = 'en'
          break
        case 'games':
          countsSet.add('games')
          break
        case 'groups':
          countsSet.add('groups')
          break
        case 'badges':
          countsSet.add('badges')
          break
        case 'screenshots':
          countsSet.add('screenshots')
          break
        case 'artworks':
          countsSet.add('artworks')
          break
        case 'reviews':
          countsSet.add('reviews')
          break
        case 'guides':
          countsSet.add('guides')
          break
      }
    })
  }

  if (group)
    setting.group = string2Boolean(group)

  // eslint-disable-next-line curly
  if (badge) {
    setting.badge = string2Boolean(badge)
  }

  ['games', 'groups', 'badges'].forEach((item: string) => {
    countsSet.add(item)
  })

  const counts = Array.from(countsSet)

  if (counts.length > 3)
    counts.splice(3, counts.length - 3)

  setting.counts = counts

  return {
    setting,
  }
}
