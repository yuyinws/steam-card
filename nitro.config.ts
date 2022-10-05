// nitro.config.ts
import { defineNitroConfig } from 'nitropack'
export default defineNitroConfig({
  vercel: {
    config: {
      routes: [
        {
          src: '/',
          dest: 'https://www.baidu.com',
        },
      ],
    },
  },
})
