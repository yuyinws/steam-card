interface Setting {
  theme: string
  lang: string
  group: boolean
  badge: boolean
  counts: string[]
  textColor: string
  bgColor: string
}

export function setting(_setting: string) {
  const setting: Setting = {
    theme: 'dark',
    group: false,
    badge: false,
    lang: 'zhCN',
    counts: [],
    textColor: '',
    bgColor: '',
  }

  const textReg = /text-([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/
  const bgReg = /bg-([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/

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
        case 'tokyonight':
          setting.theme = 'tokyonight'
          break
        case 'radical':
          setting.theme = 'radical'
          break
        case 'solarized-light':
          setting.theme = 'solarized-light'
          break
        case 'ocean-dark':
          setting.theme = 'ocean-dark'
          break
        case (item.match(textReg) || {}).input:
          setting.textColor = `#${item.split('-')[1]}`
          break
        case (item.match(bgReg) || {}).input:
          setting.bgColor = `#${item.split('-')[1]}`
          break
        case 'group':
          setting.group = true
          break
        case 'badge':
          setting.badge = true
          break
        case 'zhCN':
          setting.lang = 'zhCN'
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
