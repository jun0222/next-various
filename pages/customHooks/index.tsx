// モダンJavaScriptの基本から始めるReact実践の教科書 p.245

import { useState } from 'react'
import { useFetchUsers } from '../../hooks/useFetchUsers'

export const App = () => {
  const { userList, onClickFetchUser } = useFetchUsers()
  console.log(userList)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  return (
    <div>
      <button onClick={onClickFetchUser}>Fetch User</button>

      {isError && <p>Error!</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        userList.map((user) => <p key={user.id}>{`${user.id}${user.name}`}</p>)
      )}
    </div>
  )
}

export default App
