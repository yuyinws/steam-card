import type { Statistic, Theme } from 'types'

export const themes: Theme[] = ['dark', 'light', 'radical', 'tokyonight', 'solarized-light', 'ocean-dark', 'gradient1', 'gradient2', 'gradient3']

export const languages = [
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en',
  },
]
export const statisticsList: Statistic[] = [
  'groups',
  'badges',
  'games',
  'screenshots',
  'guides',
  'artworks',
  'reviews',
]
export const defaultSteamId = '76561198028121353'

export const defaultStatistics: Statistic[] = ['games', 'groups', 'badges']
