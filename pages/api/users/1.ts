export default (req: any, res: any) => {
  // リクエストヘッダーをログに出力
  // console.log('Request Headers:', req.headers)

  // ユーザーのデータを定義
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  }

  // ユーザーのデータをJSON形式でレスポンス
  res.status(200).json(user)
}
