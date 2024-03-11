import { } from './style'
import type { TemplateMeta } from '~/types'

export function generateOnlineSvg(meta: TemplateMeta) {
  let onlineText = ''
  let onlineClassName = ''
  if (meta.isOnline > 0) {
    onlineText = meta.i18n.get('online')
    onlineClassName = 'online'
  }
  else {
    onlineText = meta.i18n.get('offline')
    onlineClassName = 'offline'
  }

  return /* html */`
    <div class="${onlineClassName}">${onlineText}</div>
  `
}
