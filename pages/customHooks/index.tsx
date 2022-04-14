// モダンJavaScriptの基本から始めるReact実践の教科書 p.245~

import { useFetchUsers } from '../../hooks/useFetchUsers'

export const App = () => {
  const { userList, loading, error, onClickFetchUser } = useFetchUsers()

  return (
    <div>
      <button onClick={onClickFetchUser}>Fetch User</button>

      {error && <p>Error!</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        userList.map((user) => <p key={user.id}>{`${user.id}${user.name}`}</p>)
      )}
    </div>
  )
}

export default App
