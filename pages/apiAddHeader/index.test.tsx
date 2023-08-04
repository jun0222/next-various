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
})
