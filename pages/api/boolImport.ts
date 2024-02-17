import { boolValue } from './boolExport'
import type { NextApiRequest, NextApiResponse } from 'next'

export const usuallyValue = boolValue + '1' // ここが違う。もっと依存させる？

export default (req: NextApiRequest, res: NextApiResponse) => {
  const getBool = boolValue ? 'true' : 'false'
  // console.log(boolValue)
  res.status(200).json({ bool: getBool })
}
