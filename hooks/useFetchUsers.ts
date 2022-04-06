// モダンJavaScriptの基礎から始めるReact実践の教科書 p.249
import { useState } from 'react'

export const useFetchUsers = () => {
  const [userList, setUserList] = useState([{ id: 1 }])
  const onClickFetchUser = () => alert('関数実行')

  return { userList, onClickFetchUser }
}
