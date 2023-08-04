import React from 'react'
import { render } from '@testing-library/react'
import ApiAddHeader, { configuration } from '.'
import { DefaultApi } from '../../openapi/client'

// モックデータ
const mockResponse = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
}

// `usersUserIdGet` メソッドをモック
const usersUserIdGetMock = jest.fn()
DefaultApi.prototype.usersUserIdGet = usersUserIdGetMock

describe('ApiAddHeader', () => {
  it('fetches user data with correct header', async () => {
    // `usersUserIdGet` メソッドが呼び出されたときの挙動を定義
    usersUserIdGetMock.mockResolvedValueOnce(mockResponse)

    // コンポーネントをレンダリング
    render(<ApiAddHeader />)

    // モックが正しく呼び出されたことを確認
    expect(usersUserIdGetMock).toHaveBeenCalledTimes(1)

    // ここでヘッダーが正しいことを確認
    expect(configuration).toEqual(
      expect.objectContaining({
        headers: {
          'Custom-Header': 'HeaderValueeeeeeeeeeeeeeeeeeee!!!!!!!!!',
        },
      }),
    )
  })

  it('should have custom header middleware', async () => {
    const middleware = configuration.middleware?.find((m) => m.pre)

    // middlewareが存在することの確認
    expect(middleware).toBeDefined()

    if (middleware && middleware.pre) {
      // 任意のコンテキストを作成してpre関数に渡す
      const context = {
        init: {},
        url: 'http://example.com',
        fetch: jest.fn(),
      }

      // pre関数を実行
      const newContext = await middleware.pre(context)

      // ヘッダーが正しく設定されていることの確認
      expect(newContext.init.headers).toEqual({
        'Custom-Header-middle': 'inMiddlewareHeader!!!!!!!!!!!!',
      })
    }
  })

  // エラーハンドリングをpostにpushして追加するhooksのテスト
  //   it('should handle post middleware logic', async () => {
  //     const middleware = configuration.middleware?.find(m => m.post);

  //     expect(middleware).toBeDefined();

  //     if (middleware && middleware.post) {
  //       // 任意のコンテキストと応答を作成してpost関数に渡す
  //       const context = {
  //         init: {},
  //         url: 'http://example.com',
  //       };

  //       const response = new Response();

  //       // post関数を実行
  //       const newContext = await middleware.post(context, response);

  //       // エラーハンドリングや他のロジックが正しく動作するか確認
  //       expect(newContext.init).toEqual(...); // 期待する結果に応じて
  //     }
  //   });
})
