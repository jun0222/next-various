// モダンJavaScriptの基礎から始めるReact実践の教科書 p.249
import axios from 'axios'
import { useState } from 'react'

export const useFetchUsers = () => {
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const onClickFetchUser = () => {
    setLoading(true)
    setError(false)
  }

  axios
  .get('https://jsonplaceholder.typicode.com/users')
  .then(result => {
    const users = result.data.map(user => {
      id: user.id,
      name: user.name,
      age: user.age
    })

    setUserList(users)
  })
  .catch(error => {
    setError(true)
  })
  .finally(() => {
    setLoading(false)
  })

  return { userList, loading, error, onClickFetchUser }
}
