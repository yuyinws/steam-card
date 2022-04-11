class Card {
  private name = ''
  private avatarUrlBase64 = ''
  private playerLevel = 0
  private gameCount = '0'
  private badgeCount = 0
  private gamesSvg = ''
  private gameImgList = []
  private groupIconList = []
  private groupCount = '0'
  private groupSvg = ''
  private badgeIcon = ''
  private badgeSvg = ''
  private theme = 'dark'
  private playTime = 0
  private style = {
    bgColor: '',
    borderColor: '',
    fontColor: '',
  }

  private isOnline = {
    flag: 0,
    text: '离线',
    fill: 'white',
  }

  private i18n: any

  public constructor({
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
  }) {
    this.name = name
    this.avatarUrlBase64 = avatarUrlBase64
    this.playerLevel = playerLevel
    this.gameCount = gameCount
    this.badgeCount = badgeCount
    this.isOnline.flag = isOnline
    this.gameImgList = gameImgList
    this.theme = theme
    this.playTime = playTime
    this.groupIconList = groupIconList
    this.groupCount = groupCount
    this.badgeIcon = badgeIcon
    this.i18n = i18n
  }

  public setStyle() {
    if (this.theme === 'dark') {
      this.style.bgColor = '#1B2838'
      this.style.fontColor = 'white'
    }
    else if (this.theme === 'light') {
      this.style.bgColor = '#F3F4F6'
      this.style.fontColor = '#333'
    }
  }

  public updateIsOnline() {
    const { flag } = this.isOnline
    if (flag > 0) {
      this.isOnline.text = this.i18n.__('online')
      this.isOnline.fill = '#10B981'
    }
    else {
      this.isOnline.text = this.i18n.__('offline')
      this.isOnline.fill = this.theme === 'dark' ? 'white' : '#333'
    }
  }

  public renderGames() {
    let gamesSvg = ''
    this.gameImgList.forEach((game: any, index: number) => {
      gamesSvg
        = `${gamesSvg
        }<image width="70" xlink:href="${game}" height="33" x="${10 + index * 76
        }" y="105"></image>`
    })
    this.gamesSvg = gamesSvg
  }

  public renderGroup() {
    let groupSvg = ''
    this.groupIconList.forEach((group: string, index: number) => {
      groupSvg
        = `<image height="35" width="35"  y="50" x="${340 - (index + 1) * 42
        }" xlink:href="${group}"></image>${groupSvg}`
    })
    this.groupSvg = groupSvg
  }

  public renderBadge() {
    this.badgeSvg = `
      <image height="35" width="35" x="347" y="50" xlink:href="${this.badgeIcon}"></image>
    `
  }

  public render() {
    return `
      <svg 
        width="400" height="150"
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
          <image height="50" width="50" x="10" y="10" xlink:href="${this.avatarUrlBase64}"></image>
          <text x="67" y="22" font-size="14">${this.name}</text>
          <text x="67" y="42" font-size="10">LV. ${this.playerLevel}</text>
          <text x="67" y="58" font-size="10" fill="${this.isOnline.fill}">${this.isOnline.text}</text>
          <text x="260" y="38" text-anchor="middle">${this.i18n.__('games')}</text>
          <text x="260" y="18" text-anchor="middle">${this.gameCount}</text>
          <text x="320" y="38" text-anchor="middle">${this.i18n.__('groups')}</text>
          <text x="320" y="18" text-anchor="middle">${this.groupCount}</text>
          <text x="370" y="38" text-anchor="middle">${this.i18n.__('badges')}</text>
          <text x="370" y="18" text-anchor="middle">${this.badgeCount}</text>
        </g>
        <g>
          ${this.groupSvg}
          ${this.badgeSvg}
        </g>
        <g>
          <text x="10" y="95" font-size="12" class="text">${this.playTime} ${this.i18n.__('hours')} (${this.i18n.__('past_2_weeks')})</text>
        </g>
        <g>
          ${this.gamesSvg}
        </g>
      </svg>
    `
  }
}

export default Card
