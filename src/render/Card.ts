class Card {
  name = ''
  borderRadius = 4.5

  constructor({ borderRadius, name }) {
    this.borderRadius = borderRadius
    this.name = name
  }

  render() {
    return `
      <svg 
        width="400" height="120"
        xmlns="http://www.w3.org/2000/svg">
          <style>
            .bg {
              fill:#008000
            }
          </style>
      <rect class="bg" width="100%" height="100%" />
      <circle cx="150" cy="100" r="80" fill="green" />
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">${this.name}</text>
      </svg>
    `
  }
}

export default Card