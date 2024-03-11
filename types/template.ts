import type { Count, Theme } from '.'
import type { I18n } from '~/server/core/locales'

export interface TemplateMeta {
  name: string
  avatarUrlBase64: string
  playerLevel: string
  isOnline: number
  gameImgs: string[]
  theme: Theme
  badge: boolean
  group: boolean
  bg: string
  textColor: string
  playTime: number
  groupIconList: string[]
  badgeIcon: string
  i18n: I18n
  counts: Count[]
}
