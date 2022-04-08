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

  return { userList, onClickFetchUser }
}
