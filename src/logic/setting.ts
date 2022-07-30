import { string2Boolean } from '../utils/tools'

export function setting(_setting: string, group: string, badge: string) {
  const settingMap = {
    theme: 'dark',
    group: false,
    badge: false,
    lang: 'zh-CN',
  }
  if (_setting) {
    const settings = _setting.split(',')
    settings.forEach((item: string) => {
      switch (item) {
        case 'dark':
          settingMap.theme = 'dark'
          break
        case 'light':
          settingMap.theme = 'light'
          break
        case 'group':
          settingMap.group = true
          break
        case 'badge':
          settingMap.badge = true
          break
        case 'zh-CN':
          settingMap.lang = 'zh-CN'
          break
        case 'en':
          settingMap.lang = 'en'
          break
      }
    })
  }

  if (group)
    settingMap.group = string2Boolean(group)

  if (badge)
    settingMap.badge = string2Boolean(badge)

  return {
    settingMap,
  }
}
