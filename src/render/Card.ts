class Card {
  name = ''
  borderRadius = 4.5
  avatarUrlBase64 = ''
  playerLevel = 0
  gameCount = 0
  badgeCount = 0
  gamesSvg = ''
  gameImgList = []
  theme = 'dark'
  playTime = 0
  style = {
    bgColor: '',
    borderColor: '',
    fontColor: ''
  }
  isOnline = {
    flag: 0,
    text: '离线',
    fill: 'white',
  }
  constructor({
    borderRadius,
    name,
    avatarUrlBase64,
    playerLevel,
    gameCount,
    badgeCount,
    isOnline,
    gameImgList,
    theme,
    playTime
  }) {
    this.borderRadius = borderRadius
    this.name = name
    this.avatarUrlBase64 = avatarUrlBase64
    this.playerLevel = playerLevel
    this.gameCount = gameCount
    this.badgeCount = badgeCount
    this.isOnline.flag = isOnline
    this.gameImgList = gameImgList
    this.theme = theme
    this.playTime = playTime 
  }

  setStyle() {
    if (this.theme === 'dark') {
      this.style.bgColor = '#1B2838'
      this.style.fontColor = 'white'
    } else if (this.theme === 'light'){
      this.style.bgColor = '#F3F4F6'
      this.style.fontColor = '#333'
    }
  }

  updateIsOnline() {
    let { flag } = this.isOnline
    if (flag > 0) {
      this.isOnline.text = '在线'
      this.isOnline.fill = '#10B981'
    } else {
      this.isOnline.fill = this.theme === 'dark' ? 'white' : '#333'
    }
  }

  renderGames() {
    let gamesSvg = ''
    this.gameImgList.forEach((game: any, index: number) => {
      if (index < 5) {
        gamesSvg =
          gamesSvg +
          `<image width="70" xlink:href="${game}" height="25" x="${
            10 + index * 76
          }" y="70"></image>`
      } else {
        gamesSvg =
          gamesSvg +
          `<image width="70" xlink:href="${game}" height="25" x="${
            10 + (index - 5) * 76
          }" y="105"></image>`
      }
    })
    this.gamesSvg = gamesSvg
  }

  render() {
    return `
      <svg 
        width="400" height="140"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg">
          <style>
            .bg {
              fill:#1B2838
            }
            .text {
              fill: ${this.style.fontColor}
            }
          </style>
        <rect rx="4.5" fill="${this.style.bgColor}" stroke="#e4e2e2" stroke-opacity="1" width="100%" height="100%" />
        <g fill="${this.style.fontColor}" font-size="12">
          <image height="28" width="28" x="10" y="10" xlink:href="${this.avatarUrlBase64}"></image>
          <text x="45" y="22" font-size="14">${this.name}</text>
          <text x="45" y="38" font-size="10" fill="${this.isOnline.fill}">${this.isOnline.text}</text>
          <text x="260" y="38" text-anchor="middle">游戏数</text>
          <text x="260" y="18" text-anchor="middle">${this.gameCount}</text>
          <text x="320" y="38" text-anchor="middle">徽章数</text>
          <text x="320" y="18" text-anchor="middle">${this.badgeCount}</text>
          <text x="370" y="38" text-anchor="middle">等级</text>
          <text x="370" y="18" text-anchor="middle">${this.playerLevel}</text>
        </g>
        <g>
          <text x="10" y="60" font-size="10" class="text">${this.playTime}小时（过去 2 周）</text>
        </g>
        <g>
          ${this.gamesSvg}
        </g>
      </svg>
    `
  }
}

export default Card
