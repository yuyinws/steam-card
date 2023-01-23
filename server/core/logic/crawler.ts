import { load } from 'cheerio'

export function crawler(html: string) {
  const $ = load(html)

  let gameCount = '0'
  let screenshotCount = '0'
  let artWorkCount = '0'
  let reviewCount = '0'
  let guideCount = '0'
  let badgeCount = '0'

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

    switch (itemName) {
      case 'Games':
        gameCount = itemCount
        break
      case 'Screenshots':
        screenshotCount = itemCount
        break
      case 'Artwork':
        artWorkCount = itemCount
        break
      case 'Reviews':
        reviewCount = itemCount
        break
      case 'Guides':
        guideCount = itemCount
        break
      case 'Badges':
        badgeCount = itemCount
        break
    }
  })

  const playerLevel = $('.persona_name,.persona_level').find('.friendPlayerLevelNum').text()

  return {
    gameCount,
    groupCount,
    badgeIconUrl,
    groupIconList,
    screenshotCount,
    artWorkCount,
    reviewCount,
    guideCount,
    badgeCount,
    playerLevel,
  }
}
