// モダンJavaScriptの基本から始めるReact実践の教科書 p.245

import { useState } from 'react'
import axios from 'axios'

export const App = () => {
  const [userList, setUserList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const onClickFetchUser = () => {
    setIsLoading(true)
    setIsError(false)

    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const users = response.data.map((user) => ({
          id: user.id,
          name: user.name,
        }))
        setUserList(users)
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div>
      <button onClick={onClickFetchUser}>Fetch User</button>

      {isError && <p>Error!</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        userList.map((user) => (
          <p key={user.id}>{`${user.id}${user.name}`}</p>
        ))
      )}
    </div>
  )
}

export default App
