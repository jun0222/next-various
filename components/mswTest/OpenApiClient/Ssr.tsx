import { User } from '../../../openapi/client'
import React from 'react'

interface OpenApiClientProps {
  user: User
}

export const OpenApiClientSsrComponent: React.FC<OpenApiClientProps> = ({
  user,
}) => {
  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h2>User Information</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  )
}
