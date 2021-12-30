import Card from "./Card"

const steamCard = (name: string) => {
  const card = new Card({
    name: name,
    borderRadius: 4.5
  })

  return card.render()
  
}

export { steamCard }
