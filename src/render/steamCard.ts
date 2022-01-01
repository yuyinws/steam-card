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
  playTime: number
) => {
  const card = new Card({
    name: name,
    borderRadius: 4.5,
    avatarUrlBase64: avatarUrlBase64,
    playerLevel: playerLevel,
    gameCount: gameCount,
    badgeCount: badgeCount,
    isOnline: isOnline,
    gameImgList: gameImgList,
    theme: theme,
    playTime: playTime
  })

  card.updateIsOnline()
  card.setStyle()
  card.renderGames()
  return card.render()
}

export { steamCard }
