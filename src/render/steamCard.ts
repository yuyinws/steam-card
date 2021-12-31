import Card from './Card'

const steamCard = (
  name: string,
  avatarUrl: string,
  playerLevel: number,
  gameCount: number,
  badgeCount: number,
  isOnline: number,
  games:[]
) => {
  const card = new Card({
    name: name,
    borderRadius: 4.5,
    avatarUrl: avatarUrl,
    playerLevel: playerLevel,
    gameCount: gameCount,
    badgeCount: badgeCount,
    isOnline: isOnline,
    games: games
  })

  card.updateIsOnline()
  card.renderGames()
  return card.render()
}

export { steamCard }
