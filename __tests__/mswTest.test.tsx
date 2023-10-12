import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import MswTest from '../components/mswTest'
import React from 'react'

const server = setupServer(
  rest.get('/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ]),
    )
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a list of users', async () => {
  render(<MswTest />)
  const user1 = await screen.findByText('John Doe')
  const user2 = await screen.findByText('Jane Doe')
  expect(user1).toBeInTheDocument()
  expect(user2).toBeInTheDocument()
})
