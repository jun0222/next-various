import { Configuration, DefaultApi, User } from '../../../openapi/client'
import React, { useEffect, useState } from 'react'

const OpenApiClient: React.FC = () => {
  const configuration = new Configuration({
    basePath: 'http://localhost:3000/api',
  })
  const [user, setUser] = useState<User | undefined>()
  const apiClient = new DefaultApi(configuration)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient.usersUserIdGet({ userId: '1' })
        if (!response) return
        setUser(response)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchData()
  }, [apiClient])

  if (!user) return <div>Loading...</div>
  return (
    <div>
      <h2>User Information</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  )
}

export default OpenApiClient
