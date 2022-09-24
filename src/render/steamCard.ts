import Card from './Card'

const steamCard = (
  name: string,
  avatarUrlBase64: string,
  playerLevel: number,
  isOnline: number,
  gameImgList: string[],
  theme: string,
  isBadge: boolean,
  isGroup: boolean,
  bgColor: string,
  textColor: string,
  playTime: number,
  groupIconList: string[],
  badgeIcon: string,
  i18n: any,
  counts,

) => {
  const card = new Card({
    name,
    avatarUrlBase64,
    playerLevel,
    isOnline,
    gameImgList,
    theme,
    bgColor,
    textColor,
    playTime,
    groupIconList,
    badgeIcon,
    i18n,
    counts,
  })

  card.updateIsOnline()
  card.setStyle()
  card.renderGames()
  card.renderCounts()
  if (isGroup)
    card.renderGroup()

  if (isBadge)
    card.renderBadge()

  return card.render()
}

export { steamCard }
