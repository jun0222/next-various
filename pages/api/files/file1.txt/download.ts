import fs from 'fs'
import path from 'path'

export default function handler(req: any, res: any) {
  const filename = 'file1.txt'

  // ファイルパスを設定します。この例ではプロジェクトのpublicディレクトリを指定しています。
  const filePath = path.join(process.cwd(), 'public', filename)

  // ファイルを読み込みます
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.status(404).send('file not found')
    } else {
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
      res.setHeader('Content-Type', 'application/octet-stream')
      res.write(data)
      res.end()
    }
  })

  return res.status(200)
}
