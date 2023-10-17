// __tests__/msw-openapi-ssr-test.test.tsx
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getServerSideProps } from '../pages/msw-test-ssr'

// MSWのセットアップ
const server = setupServer(
  rest.get('http://api.example.com/v1/users/:userId', (req, res, ctx) => {
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

describe('getServerSideProps', () => {
  it('fetches user information and returns as props', async () => {
    const response = await getServerSideProps()

    expect(response).toEqual({
      props: {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@test.com',
        },
      },
    })
  })
})
