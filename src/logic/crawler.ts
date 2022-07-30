import { load } from 'cheerio'

export function crawler(html: any) {
  const $ = load(html)

  const groupIconList: string[] = []
  $('.profile_group_links')
    .children()
    .last()
    .children()
    .each((i, el) => {
      const groupIconUrl = $(el).children().first().children().children().attr('src') as string
      groupIconList.unshift(groupIconUrl)
    })

  const gameCount = $('.profile_item_links')
    .children()
    .first()
    .children()
    .find('.profile_count_link_total')
    .text()

  const groupCount = $('.profile_group_links')
    .children()
    .first()
    .children()
    .find('.profile_count_link_total')
    .text()

  const badgeIconUrl = $('.favorite_badge_icon').children().attr('src') as string

  return {
    gameCount,
    groupCount,
    badgeIconUrl,
    groupIconList,
  }
}
