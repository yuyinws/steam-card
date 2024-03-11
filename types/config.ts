export type Theme = 'dark' | 'light' | 'radical' | 'tokyonight' | 'solarized-light' | 'ocean-dark' | 'gradient1' | 'gradient2' | 'gradient3'
export type Statistic = 'groups' | 'badges' | 'games' | 'screenshots' | 'guides' | 'artworks' | 'reviews'
export type Locales = 'en' | 'zhCN'

export interface ThemeProp {
  bg_color: string
  text_color: string
  online_color: string
  offline_color: string
}

export interface ConfigMeta {
  theme: Theme
  textColor: string
  bgType: 'color' | 'game-cover'
  bgColor: string
  bgGameId: string
  group: boolean
  badge: boolean
  statistics: Statistic[]
}

export interface Config {
  theme: Theme
  group: boolean
  badge: boolean
  lang: Locales
  statistics: string[]
  textColor: string
  bg: string
}
