import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import OpenApiClient from '../components/mswTest/OpenApiClient'

// MSWのセットアップ
const server = setupServer(
  rest.get('http://localhost:3000/api/users/:userId', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: 'Test User',
        email: 'test@test.com',
      }),
    )
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// テスト
describe('OpenApiClient', () => {
  it('renders user information', async () => {
    render(<OpenApiClient />)

    // Check loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()

    // Wait for the async actions to complete
    await waitFor(() => screen.getByText(/User Information/i))

    // Now we can check for the user information
    expect(screen.getByText(/Test User/i)).toBeInTheDocument()
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument()
  })
})
