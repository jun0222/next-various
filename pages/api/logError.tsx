// /pages/api/logError.tsx

import { NextApiRequest, NextApiResponse } from 'next'

interface ErrorInfo {
  message: string
  source: string
  lineno: number
  colno: number
  stack: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const errorInfo: ErrorInfo = req.body

  // エラー情報を適切にロギング
  // 例: ファイルに保存、データベースに格納、通知送信など
  console.error('Client Error: ', errorInfo)

  res.status(200).send('Error logged successfully')
}
