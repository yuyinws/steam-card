import type { TemplateMeta } from '~/types'

export function generateGames(meta: TemplateMeta) {
  let gamesSvg = ''
  meta.gameImgs.forEach((game: string) => {
    gamesSvg += /* html */`
    <img width="70" height="33" src="${game}" />
    `
  })

  return gamesSvg
}
