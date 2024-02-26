import { useUser } from '../contexts/UserContext'
import { useCallback } from 'react'

/**
 * カスタムフック `useUserDataSetter` を使用して、ユーザー情報を取得し、
 * UserContextにセットする。このフックは、ユーザー情報と、
 * その情報を取得してセットする関数を返す。
 *
 * `useCallback`を使用する理由:
 * `fetchAndSetUser` 関数は、`setUser` ステートセッター関数に依存している。
 * `useCallback`を用いることで、`setUser` 関数が変更されない限り、
 * `fetchAndSetUser`関数の参照をメモ化し、不必要な再レンダリングや
 * `useEffect` の依存配列を使用している場合の無限ループを防ぐ。
 */
export const useUserDataSetter = () => {
  const { user, setUser } = useUser()

  const fetchAndSetUser = useCallback(async () => {
    // 仮のユーザーデータ取得処理
    const userData = { name: '山田太郎', age: 30 }
    setUser(userData)
  }, [setUser]) // 依存配列にsetUserを含める

  return { user, fetchAndSetUser }
}
