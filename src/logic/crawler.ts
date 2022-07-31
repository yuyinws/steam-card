import { load } from 'cheerio'

export function crawler(html: any) {
  const $ = load(html)

  let gameCount = '0'
  let screenshotCount = '0'
  let artWorkCount = '0'
  let reviewCount = '0'
  let guideCount = '0'

  const groupIconList: string[] = []
  $('.profile_group_links')
    .children()
    .last()
    .children()
    .each((i, el) => {
      const groupIconUrl = $(el).children().first().children().children().attr('src') as string
      groupIconList.unshift(groupIconUrl)
    })

  let groupCount = $('.profile_group_links')
    .children()
    .first()
    .children()
    .find('.profile_count_link_total')
    .text()

  groupCount = groupCount.toString().replaceAll('\n', '').replaceAll('\t', '')

  const badgeIconUrl = $('.favorite_badge_icon').children().attr('src') as string

  $('.profile_item_links').children().each((i, el) => {
    const itemName = $(el).children().find('.count_link_label').text()
    let itemCount = $(el).children().find('.profile_count_link_total').text()
    itemCount = itemCount.toString().replaceAll('\n', '').replaceAll('\t', '')

    if (itemName === 'Games')
      gameCount = itemCount

    if (itemName === 'Screenshots')
      screenshotCount = itemCount

    if (itemName === 'Artwork')
      artWorkCount = itemCount

    if (itemName === 'Reviews')
      reviewCount = itemCount

    if (itemName === 'Guides')
      guideCount = itemCount
  })

  return {
    gameCount,
    groupCount,
    badgeIconUrl,
    groupIconList,
    screenshotCount,
    artWorkCount,
    reviewCount,
    guideCount,
  }
}
