import type { VercelRequest, VercelResponse } from '@vercel/node'
import { registerFont, createCanvas } from 'canvas'
import { join } from 'path'
registerFont(join(__dirname, 'files/fonts/Anton-Regular.ttf'), {
  family: 'Anton',
})

export default async (req: VercelRequest, res: VercelResponse) => {
  const canvas = createCanvas(300, 300)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#333333'
  ctx.fillRect(0, 0, 300, 300)

  ctx.fillStyle = '#ffffff'
  ctx.font = '32px Anton'
  ctx.fillText('Hello', 200, 200)

  res.setHeader('Content-Type', 'image/png')
  canvas.createPNGStream().pipe(res)
}
