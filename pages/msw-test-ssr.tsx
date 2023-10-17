// pages/msw-test-ssr.tsx
import { OpenApiClientSsrComponent } from '../components/mswTest/OpenApiClient/Ssr'
import { Configuration, DefaultApi, User } from '../openapi/client'

type Props = {
  user: User
}

export const getServerSideProps = async () => {
  const configuration = new Configuration()
  const apiClient = new DefaultApi(configuration)
  let user

  try {
    user = await apiClient.usersUserIdGet({ userId: '1' })
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }

  return {
    props: {
      user,
    },
  }
}

const MswTestSsrPage = (props: Props) => {
  return <OpenApiClientSsrComponent {...props} />
}

export default MswTestSsrPage
