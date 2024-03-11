import { describe, expect, it } from 'vitest'
import { parseUrlConfig } from '~/server/core/logic/parse'

describe('parse url config', () => {
  it('empty', () => {
    expect(parseUrlConfig('')).toMatchInlineSnapshot(`
      {
        "config": {
          "badge": false,
          "bg": "",
          "group": false,
          "lang": "zhCN",
          "statistics": [
            "games",
            "groups",
            "badges",
          ],
          "textColor": "",
          "theme": "dark",
        },
      }
    `)
  })

  it('game cover', () => {
    expect(parseUrlConfig('bg-game-222')).toMatchInlineSnapshot(`
      {
        "config": {
          "badge": false,
          "bg": "bg-game-222",
          "group": false,
          "lang": "zhCN",
          "statistics": [
            "games",
            "groups",
            "badges",
          ],
          "textColor": "",
          "theme": "dark",
        },
      }
    `)
  })

  it('text color', () => {
    expect(parseUrlConfig('text-222333')).toMatchInlineSnapshot(`
      {
        "config": {
          "badge": false,
          "bg": "",
          "group": false,
          "lang": "zhCN",
          "statistics": [
            "games",
            "groups",
            "badges",
          ],
          "textColor": "#222333",
          "theme": "dark",
        },
      }
    `)
  })

  it('theme', () => {
    expect(parseUrlConfig('tokyonight')).toMatchInlineSnapshot(`
      {
        "config": {
          "badge": false,
          "bg": "",
          "group": false,
          "lang": "zhCN",
          "statistics": [
            "games",
            "groups",
            "badges",
          ],
          "textColor": "",
          "theme": "tokyonight",
        },
      }
    `)
  })

  it('color background', () => {
    expect(parseUrlConfig('bg-222-333')).toMatchInlineSnapshot(`
      {
        "config": {
          "badge": false,
          "bg": "#222,#333",
          "group": false,
          "lang": "zhCN",
          "statistics": [
            "games",
            "groups",
            "badges",
          ],
          "textColor": "",
          "theme": "dark",
        },
      }
    `)
  })

  it('multiple config', () => {
    expect(parseUrlConfig('gradient1,badge,group,badges,games,en')).toMatchInlineSnapshot(`
      {
        "config": {
          "badge": true,
          "bg": "",
          "group": true,
          "lang": "en",
          "statistics": [
            "badges",
            "games",
            "groups",
          ],
          "textColor": "",
          "theme": "gradient1",
        },
      }
    `)
  })
})
