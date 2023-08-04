import React, { useState, useEffect } from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'fetch-mock'
import App from '../pages/fetch-test'

describe('App', () => {
  afterEach(() => {
    /* fetchMockをリセット */
    fetchMock.restore()
  })

  test('fech mock test', async () => {
    /* /apiでのgetのfetchに対してデータを返すmock */
    fetchMock.get('/api/example', {
      message: 'backend-index-api-mock',
    })

    const mockFunc = jest.fn()

    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: 'api-test' }))

    /* waitFor→getByでfetchの処理が終わるのを待つ */
    await waitFor(() => screen.getByText(/backend-index-api-mock/))
    /* findByでもOK */
    await screen.findByText(/backend-index-api-mock/)

    screen.debug()
  })
})
