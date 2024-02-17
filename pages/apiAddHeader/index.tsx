import { Configuration, DefaultApi, User } from '../../openapi/client'
import React, { useEffect, useState } from 'react'
// ヘッダーを設定する
export const configuration = new Configuration({
  basePath: 'http://localhost:3000/api',
  // middlewareの方で設定されていると意味ない。テストコードは実際の動作を見ていないのでOKになる。実際にはapi呼び出しもテストすることになるのでOK
  headers: {
    'Custom-Header': 'HeaderValueeeeeeeeeeeeeeeeeeee!!!!!!!!!',
  },
  middleware: [
    {
      pre: async (context) => {
        const newContext = {
          ...context,
          init: {
            ...context.init,
            headers: {
              'Custom-Header-middle': 'inMiddlewareHeader!!!!!!!!!!!!',
            },
          },
        }
        return newContext
      },
    },
  ],
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
      // console.log(response)
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
