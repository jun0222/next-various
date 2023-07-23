import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FileList from '.'
import { DefaultApi } from '../../openapi/client'

// fileのダウンロードをモックする
global.URL.createObjectURL = jest.fn()
HTMLAnchorElement.prototype.click = jest.fn()

// filesFilenameDownloadGetのモック
const mockFilesFilenameDownloadGet = jest.fn().mockResolvedValue(new Blob())

// DefaultApiのモック
jest.mock('../../openapi/client', () => ({
  DefaultApi: jest.fn().mockImplementation(() => ({
    filesFilenameDownloadGet: mockFilesFilenameDownloadGet,
  })),
  Configuration: jest.fn(),
}))

// TODO: テストの段落を整える
test('ファイルのダウンロードが実行される', async () => {
  render(<FileList />)

  // alertをモックする
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

  // Downloadボタンをクリックする
  fireEvent.click(screen.getByText('Download'))

  // alertが表示されることを確認する
  expect(alertSpy).toHaveBeenCalled()

  // checkboxを選択する
  fireEvent.click(screen.getByRole('checkbox', { name: 'file1.txt' }))

  // Downloadボタンをクリックする
  fireEvent.click(screen.getByText('Download'))

  await waitFor(() => {
    // DefaultApiが呼ばれていることを確認する。こちらは実際には必要なさそうだが、テストコードの問題があった時の判断に役立つ
    expect(DefaultApi).toHaveBeenCalled()

    // filesFilenameDownloadGetが呼ばれていることを確認する
    expect(mockFilesFilenameDownloadGet).toHaveBeenCalled()

    // URL.createObjectURLが呼ばれていることを確認する。本来不要だが試しうちリポジトリなので残しておく
    expect(global.URL.createObjectURL).toHaveBeenCalled()

    // HTMLAnchorElement.prototype.clickが呼ばれていることを確認する。本来不要だが試しうちリポジトリなので残しておく
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled()
  })
})
