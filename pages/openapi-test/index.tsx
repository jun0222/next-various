import React, { useEffect, useState } from 'react'
import { DefaultApi, Configuration, User } from '../../openapi/client' // path to generated api directory

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const configuration = new Configuration({
      basePath: 'https://jsonplaceholder.typicode.com', // jsonplaceholder.typicode.com
    })

    const apiClient = new DefaultApi(configuration)

    const fetchUser = async () => {
      try {
        const response = await apiClient.usersUserIdGet({ userId: '1' }) // replace 1 with your pet id
        setUser(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add other user attributes you want to display */}
    </div>
  )
}

export default UserPage
