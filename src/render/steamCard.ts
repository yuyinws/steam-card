import Card from './Card'

const steamCard = (
  name: string,
  avatarUrlBase64: string,
  playerLevel: number,
  gameCount: number,
  badgeCount: number,
  isOnline: number,
  gameImgList:string[]
) => {
  const card = new Card({
    name: name,
    borderRadius: 4.5,
    avatarUrlBase64: avatarUrlBase64,
    playerLevel: playerLevel,
    gameCount: gameCount,
    badgeCount: badgeCount,
    isOnline: isOnline,
    gameImgList: gameImgList
  })

  card.updateIsOnline()
  card.renderGames()
  return card.render()
}

export { steamCard }
