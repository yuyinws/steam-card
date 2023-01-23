import type { Count } from 'types'
import type { I18n } from '../locales'
import { themes } from './theme'

class Card {
  private name = ''
  private avatarUrlBase64 = ''
  private playerLevel = 0
  private gamesSvg = ''
  private gameImgList = []
  private groupIconList = []
  private groupSvg = ''
  private badgeIcon = ''
  private badgeSvg = ''
  private theme = 'dark'
  private bgColor = ''
  private textColor = ''
  private playTime = 0
  private style = {
    bgColor: '',
    borderColor: '',
    fontColor: '',
    onlineColor: '',
    offlineColor: '',
  }

  private isOnline = 0

  private onlineSvg = ''

  private i18n: I18n
  private countSvg = ''
  private counts: Count[]

  public constructor({
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
  }: any) {
    this.name = name
    this.avatarUrlBase64 = avatarUrlBase64
    this.playerLevel = playerLevel
    this.isOnline = isOnline
    this.gameImgList = gameImgList
    this.theme = theme
    this.playTime = playTime
    this.groupIconList = groupIconList
    this.badgeIcon = badgeIcon
    this.i18n = i18n
    this.counts = counts
    this.bgColor = bgColor
    this.textColor = textColor
  }

  public setStyle() {
    const { bg_color, text_color, online_color, offline_color } = themes[this.theme]
    this.style.bgColor = this.bgColor || bg_color
    this.style.fontColor = this.textColor || text_color
    this.style.onlineColor = online_color
    this.style.offlineColor = offline_color
  }

  public updateIsOnline() {
    let onlineText = ''
    let onlineClassName = ''
    if (this.isOnline > 0) {
      onlineText = this.i18n.get('online')
      onlineClassName = 'online'
    }
    else {
      onlineText = this.i18n.get('offline')
      onlineClassName = 'offline'
    }
    this.onlineSvg = `<span class="${onlineClassName}">${onlineText}</span>`
  }

  public renderGames() {
    let gamesSvg = ''
    this.gameImgList.forEach((game: string) => {
      gamesSvg += `
      <img width="70" height="33" src="${game}"></img>
      `
    })
    this.gamesSvg = gamesSvg
  }

  public renderGroup() {
    let groupSvg = ''
    this.groupIconList.forEach((group: string) => {
      groupSvg += `
        <img width="35" height="35" src="${group}"></img>
      `
    })
    this.groupSvg = groupSvg
  }

  public renderBadge() {
    this.badgeSvg = `
      <img height="35" width="35" src="${this.badgeIcon}" />
    `
  }

  public renderCounts() {
    this.counts.forEach((count: Count) => {
      this.countSvg += `
        <div class="count-item">
          <div class="count">${count.count || 0}</div>
          <div class="name">${count.name}</div>
        </div>
      `
    })
  }

  public render() {
    return `
    <svg width="400" height="150" xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg">
    <style>
        .card {
        color: ${this.style.fontColor};
        background-color: ${this.style.bgColor};
        font-size:14px;
        height:130px;
        width:380px;
        padding: 10px;
        gap:10px;
        display:flex;
        flex-direction:column;
        font-family: "Microsoft YaHei";
        border-radius: 5px;
        }

        .online {
        color: ${this.style.onlineColor};
        }

        .offline {
        color: ${this.style.offlineColor};
        }
        
        .top {
        display: flex;
        justify-content: space-between;
        }
        
        .avatar {
        border-radius: 5px;
        }
        
        .user-info {
        display: flex;
        gap:10px;
        }
        
        .status {
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        }
        
        .counts {
        font-size:12px;
        display:flex;
        gap:20px;
        }
  
        .count-item {
        display:flex;
        flex-direction: column;
        align-items: center;
        }
  
        .game-list {
        display:flex;
        gap:8px;
        }
  
        .icon-list {
          position: absolute;
          right: 7px;
          top: 50px;
          display: flex;
          gap: 10px;
        }
    </style>
    <foreignObject width="400" height="150">
      <div class="card"
        xmlns="http://www.w3.org/1999/xhtml">
        <div class="top">
          <div class="user-info">
            <img class="avatar" src="${this.avatarUrlBase64}" width="60" height="60" />
            <div class="status">
              <div style="font-size:12px;font-weight:bold">
                  ${this.name}
              </div>
              <div style="font-size:12px;font-weight:bold">
                  LV. ${this.playerLevel}
              </div>
              <div style="font-size:12px;font-weight:bold">
                  ${this.onlineSvg}
              </div>
            </div>
          </div>
          <div class="counts">
              ${this.countSvg}
          </div>
        </div>
  
        <div class="bottom">
          <div style="font-size:12px;margin-bottom:12px">
              ${this.playTime} ${this.i18n.get('hours')} (${this.i18n.get('past_2_weeks')})
          </div>
          <div class="game-list">
              ${this.gamesSvg}
          </div>
        </div>
  
        <div class="icon-list">
            ${this.groupSvg}
            ${this.badgeSvg}
        </div>
      </div>
    </foreignObject>
  </svg>  
`
  }
}

export default Card
