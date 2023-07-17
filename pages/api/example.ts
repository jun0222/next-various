import { NextApiRequest, NextApiResponse } from 'next'

// サンプルレスポンスを返す
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: `now time is ${new Date().toISOString()}` })
}
