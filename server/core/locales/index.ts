import en from './en.json' assert {type: 'json'}
import zhCN from './zhCN.json' assert {type: 'json'}

type Locales = 'en' | 'zhCN'

export default (_default: Locales) => {
  const Locales = {
    en: en as any,
    zhCN: zhCN as any,
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

