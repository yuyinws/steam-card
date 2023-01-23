import { getImage } from '../request/steamApi'

export const imageUrl2Base64 = async (url: string): Promise<string> => {
  const image = await getImage(url)
  if (image) {
    const _base64 = Buffer.from(image).toString('base64')
    return _base64
  }
  return ''
}

export const string2Boolean = (value: string) => {
  return value === 'true'
}
