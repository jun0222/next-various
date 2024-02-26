import { useUserDataSetter } from '../hooks/useUserDataSetter'
import React, { useEffect } from 'react'

const ShowUserDataScreen = () => {
  const { user, fetchAndSetUser } = useUserDataSetter()

  useEffect(() => {
    fetchAndSetUser()
  }, [fetchAndSetUser]) // useCallbackによりfetchAndSetUserの参照は不変

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  )
}

export default ShowUserDataScreen
