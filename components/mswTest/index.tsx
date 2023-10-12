import React, { useEffect, useState } from 'react'

function MswTest() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/user')
      const data = await response.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export default MswTest
