export type Theme = 'dark' | 'light' | 'radical' | 'tokyonight' | 'solarized-light' | 'ocean-dark' | 'gradient1'
export type Statistic = 'groups' | 'badges' | 'games' | 'screenshots' | 'guides' | 'artworks' | 'reviews'

export interface ThemeProp {
  bg_color: string
  text_color: string
  online_color: string
  offline_color: string
}

export interface Config {
  steamId?: string
  theme: Theme
  group: boolean
  badge: boolean
  textColor: string
  bgColor: string
  statistics: Statistic[]
  lang: string
}