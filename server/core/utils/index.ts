import { getImage } from '../request/steamApi'

export const imageUrl2Base64 = async (url: string): Promise<string> => {
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

export const string2Boolean = (value: string) => {
  return value === 'true'
}

export const transparentImageBase64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
