import type { TemplateMeta } from '~/types'

export function generateGroups(meta: TemplateMeta) {
  if (!meta.group)
    return ''

  let groupsSvg = ''
  meta.groupIconList.forEach((game: string) => {
    groupsSvg += /* html */`
    <img width="35" height="35" src="${game}" />
    `
  })

  return groupsSvg
}
