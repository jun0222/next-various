import { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const path = './pages'
    const files = fs.readdirSync(path)
    res.json({
      paths: files,
    })
    return res.status(200).json(files)
  }
}
