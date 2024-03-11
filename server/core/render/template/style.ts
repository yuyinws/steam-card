import { themes } from '../theme'
import type { TemplateMeta } from '~/types'

export function generateStyle(meta: TemplateMeta) {
  const { bg_color, text_color, online_color, offline_color } = themes[meta.theme]
  let backgroundStyle = ''
  if (meta.bg.includes('game')) {
    const arrs = meta.bg?.split('-')
    backgroundStyle = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${arrs[1]}) no-repeat center`
  }
  else {
    backgroundStyle = `linear-gradient(90deg, ${meta.bg || bg_color});`
  }

  return /* html */`
    <style>
      .card {
        color: ${meta.textColor || text_color};
        background: ${backgroundStyle};
        font-size: 14px;
        height: 130px;
        width: 380px;
        padding: 10px;
        gap: 10px;
        display: flex;
        flex-direction: column;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        border-radius: 5px;
      }

      .online {
        color: ${online_color};
      }

      .offline {
        color: ${offline_color};
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
        font-size: 12px;
        font-weight: bold;
      }
        
      .counts {
        font-size: 12px;
        display: flex;
        gap: 20px;
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
  `
}
