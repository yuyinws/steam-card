import type { VercelRequest, VercelResponse } from '@vercel/node'
export default async (req: VercelRequest, res: VercelResponse) => {
  const data = {
    msg: 'hello world!',
  }
  res.status(200).json(data)
}
