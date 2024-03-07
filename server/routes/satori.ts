import { join } from 'node:path'
import { cwd } from 'node:process'
import { readFile } from 'node:fs/promises'
import satori from 'satori'
import { html } from 'satori-html'

export default defineEventHandler(async (event) => {
  try {
    setHeader(event, 'Content-Type', 'image/svg+xml')

    const fontPath = join(
      cwd(),
      'server',
      'core',
      'fonts',
      'PressStart2P-Regular.ttf',
    )

    const fontData = await readFile(fontPath)

    const svg = await satori(
      html`<div style="color: black;">hel4444lo, world</div>`,
      {
        width: 600,
        height: 400,
        fonts: [
          {
            name: 'Roboto',
            // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
            data: fontData,
            weight: 400,
            style: 'normal',
          },
        ],
      },
    )

    return svg
  }
  catch (error) {
    return {
      error: String(error),
    }
  }
})
