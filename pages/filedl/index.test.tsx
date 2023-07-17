import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FileList from '.'
import { DefaultApi } from '../../openapi/client'

const mockDownloadFile = jest.fn()

jest.mock('../../openapi/client', () => ({
  DefaultApi: jest.fn().mockImplementation(() => ({
    filesFilenameDownloadGet: mockDownloadFile,
  })),
  Configuration: jest.fn(),
}))

// TODO: テストの段落を整える
test('ファイルのダウンロードが実行される', async () => {
  render(<FileList />)

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

  fireEvent.click(screen.getByText('Download'))
  expect(alertSpy).toHaveBeenCalled()

  fireEvent.click(screen.getByRole('checkbox', { name: 'file1.txt' }))
  fireEvent.click(screen.getByText('Download'))

  expect(DefaultApi).toHaveBeenCalled()
})
