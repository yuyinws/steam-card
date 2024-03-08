import en from './en.json' assert {type: 'json'}
import zhCN from './zhCN.json' assert {type: 'json'}
import type { Locales } from '~/types'

export interface I18n {
  setLocale: (locale: Locales) => void
  get: (key: string) => string
}

export default (_default: Locales) => {
  const Locales = {
    en: en as Record<string, string>,
    zhCN: zhCN as Record<string, string>,
  }

  let defaultLocale: Locales = _default

  function setLocale(locale: Locales) {
    defaultLocale = locale
  }

  function get(key: string) {
    return Locales[defaultLocale][key] || key
  }

  return {
    setLocale,
    get,
  }
}
