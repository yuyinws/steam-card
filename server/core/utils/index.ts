import { Buffer } from 'node:buffer'
import { getImage } from '../request/steamApi'

export async function imageUrl2Base64(url: string): Promise<string> {
  try {
    const image = await getImage(url)
    if (image) {
      const _base64 = Buffer.from(image).toString('base64')
      return _base64
    }
    return ''
  }
  catch (error) {
    return ''
  }
}

export function string2Boolean(value: string) {
  return value === 'true'
}

export const transparentImageBase64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
