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

  $('.count_link_label').each((i, el) => {
    const itemName = $(el).text()
    let count = $(el).next().text()
    count = count.toString().replaceAll('\n', '').replaceAll('\t', '')

    switch (itemName) {
      case 'Games':
        gameCount = count
        break
      case 'Screenshots':
        screenshotCount = count
        break
      case 'Artwork':
        artWorkCount = count
        break
      case 'Reviews':
        reviewCount = count
        break
      case 'Guides':
        guideCount = count
        break
      case 'Badges':
        badgeCount = count
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
