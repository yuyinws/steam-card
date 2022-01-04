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
  badgeIcon: string
  // eslint-disable-next-line max-params
) => {
  const card = new Card({
    name: name,
    avatarUrlBase64: avatarUrlBase64,
    playerLevel: playerLevel,
    gameCount: gameCount,
    badgeCount: badgeCount,
    isOnline: isOnline,
    gameImgList: gameImgList,
    theme: theme,
    playTime: playTime,
    groupIconList: groupIconList,
    groupCount: groupCount,
    badgeIcon: badgeIcon
  })

  card.updateIsOnline()
  card.setStyle()
  card.renderGames()
  if (isGroup) {
    card.renderGroup()
  }
  if (isBadge) {
    card.renderBadge()
  }
  return card.render()
}

export { steamCard }
