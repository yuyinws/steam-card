import type { TemplateMeta } from 'types'
import { generateSvg } from './svg'

export async function renderTemplate(meta: TemplateMeta) {
  return generateSvg(meta)
}
