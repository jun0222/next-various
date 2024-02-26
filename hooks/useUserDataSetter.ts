import { useUser } from '../contexts/UserContext'
import { useCallback } from 'react'

export const useUserDataSetter = () => {
  const { user, setUser } = useUser()

  const fetchAndSetUser = useCallback(async () => {
    // 仮のユーザーデータ取得処理
    const userData = { name: '山田太郎', age: 30 }
    setUser(userData)
  }, [setUser]) // 依存配列にsetUserを含める

  return { user, fetchAndSetUser }
}
