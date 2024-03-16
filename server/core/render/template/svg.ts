import { generateStyle } from './style'
import { generateOnlineSvg } from './online'
import { generateCounts } from './counts'
import { generateGames } from './games'
import { generateGroups } from './groups'
import type { TemplateMeta } from '~/types'

export function generateSvg(meta: TemplateMeta) {
  return /* svg */`
  <svg width="400" height="150" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
    ${generateStyle(meta)}
    <foreignObject width="400" height="150">
      <div class="card" xmlns="http://www.w3.org/1999/xhtml">
        <div class="top">
          <div class="user-info">
            <img class="avatar" src="${meta.avatarUrlBase64}" width="60" height="60" />
            <div class="status">
              <div>
                  ${meta.name}
              </div>
              <div>
                  LV. ${meta.playerLevel}
              </div>
              ${generateOnlineSvg(meta)}
            </div>
          </div>
          <div class="counts">
            ${generateCounts(meta)}
          </div>
        </div>

        <div class="bottom">
          <div style="font-size:12px;margin-bottom:12px">
              ${meta.playTime} ${meta.i18n.get('hours')} (${meta.i18n.get('past_2_weeks')})
          </div>
          <div class="game-list">
            ${generateGames(meta)}
          </div>
        </div>

        <div class="icon-list">
            ${generateGroups(meta)}
            ${meta.badge ? `<img height="35" width="35" src="${meta.badgeIcon}" />` : ''}
        </div>
      </div>
    </foreignObject>
  </svg>
 `
}
