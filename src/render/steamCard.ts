import Card from './Card'

const steamCard = (
  name: string,
  avatarUrlBase64: string,
  playerLevel: number,
  gameCount: string,
  badgeCount: number,
  isOnline: number,
  gameImgList: string[],
  theme: string,
  isBadge: boolean,
  isGroup: boolean,
  playTime: number,
  groupIconList: string[],
  groupCount: string,
  badgeIcon: string,
  i18n: any,
  // eslint-disable-next-line max-params
) => {
  const card = new Card({
    name,
    avatarUrlBase64,
    playerLevel,
    gameCount,
    badgeCount,
    isOnline,
    gameImgList,
    theme,
    playTime,
    groupIconList,
    groupCount,
    badgeIcon,
    i18n,
  })

  card.updateIsOnline()
  card.setStyle()
  card.renderGames()
  if (isGroup)
    card.renderGroup()

  if (isBadge)
    card.renderBadge()

  return card.render()
}

export { steamCard }
