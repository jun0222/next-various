import { Configuration, DefaultApi, User } from '../../openapi/client'
import React, { useEffect, useState } from 'react'
// ヘッダーを設定する
export const configuration = new Configuration({
  basePath: 'http://localhost:3000/api',
  headers: {
    'Custom-Header': 'HeaderValueeeeeeeeeeeeeeeeeeee!!!!!!!!!',
  },
})

const ApiAddHeader = () => {
  const [user, setUser] = useState<User | undefined>()

  // 生成されたクライアントのインスタンスを作成
  const apiClient = new DefaultApi(configuration)

  // エンドポイントにリクエストを投げる関数
  const requestApiEndpoint = async () => {
    try {
      // エンドポイントに対応する関数を呼び出す（この例では `getSomething` と仮定）
      const response = await apiClient.usersUserIdGet({ userId: '1' })
      setUser(response)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  // リクエストを投げる
  useEffect(() => {
    requestApiEndpoint()
  }, [])

  return (
    <div>
      <p>user-id:{user?.id}</p>
      <p>user-name:{user?.name}</p>
      <p>user-email:{user?.email}</p>
    </div>
  )
}

export default ApiAddHeader
