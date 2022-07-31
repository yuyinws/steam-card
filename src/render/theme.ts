interface Theme {
  bg_color: string
  text_color: string
  online_color: string
  offline_color: string
}

export const themes: Record<string, Theme> = {
  'dark': {
    bg_color: '#1B2838',
    text_color: 'white',
    online_color: '#10B981',
    offline_color: 'white',
  },
  'light': {
    bg_color: '#F3F4F6',
    text_color: '#363636',
    online_color: '#10B981',
    offline_color: '#363636',
  },
  'radical': {
    bg_color: '#141321',
    text_color: '#a9fef7',
    online_color: '#10B981',
    offline_color: '#a9fef7',
  },
  'tokyonight': {
    text_color: '#38bdae',
    bg_color: '#1a1b27',
    online_color: '#10B981',
    offline_color: '#1a1b27',
  },
  'solarized-light': {
    text_color: '#859900',
    bg_color: '#fdf6e3',
    online_color: '#10B981',
    offline_color: '#fdf6e3',
  },
  'ocean-dark': {
    text_color: '#92D534',
    bg_color: '#151A28',
    online_color: '#10B981',
    offline_color: '#151A28',
  },
}
