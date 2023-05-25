// 必要なReactとreact-hook-formの機能をインポートします。
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// フォームデータの型を定義します。
type FormData = {
  // フォームデータのフィールドとその型をここに定義します。
}

// 最初にフェッチするデータの型を定義します。
type InitialData = {
  userId: number
  id: number
  title: string
  body: string
}

// ポーリングで取得するデータの型を定義します。
type PollData = {
  userId: number
  id: number
  title: string
  body: string
}

// ポーリングのカスタムフックを定義します。これは最初に取得したデータを引数にとります。
function usePolling(initialData: InitialData | null) {
  // ポーリングで取得したデータとエラー、そしてローディング状態を保持するためのステートを定義します。
  const [pollData, setPollData] = useState<PollData | null>(null)
  const [pollError, setPollError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // useEffectフックを使用してポーリングのロジックを実装します。
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    let attempts = 0
    const maxAttempts = 3

    // ポーリングのための非同期関数を定義します。
    const poll = async () => {
      // ポーリングが始まったことを示すためにローディング状態をtrueにします。
      setIsLoading(true)
      try {
        // 最初に取得したデータのIDを元にAPIリクエストを送ります。
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${initialData?.id}`,
        )

        // レスポンスが正常でなければエラーをスローします。
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        // レスポンスからデータを取得します。
        const data: PollData = await response.json()
        // 取得したデータをステートに保存します。
        setPollData(data)
        // ポーリングが終了したことを示すためにローディング状態をfalseにします。
        setIsLoading(false)
        // ポーリングを停止します。
        if (intervalId) {
          clearInterval(intervalId)
        }
      } catch (error) {
        // ポーリングでエラーが発生した場合、試行回数を増やします。
        attempts++
        // 試行回数が設定した最大値に達した場合、エラーメッセージをステートに保存してポーリングを停止します。
        if (attempts === maxAttempts) {
          setPollError(
            'Error: failed to fetch poll data after ' +
              maxAttempts +
              ' attempts',
          )
          setIsLoading(false)
          if (intervalId) {
            clearInterval(intervalId)
          }
        }
      }
    }

    // 最初に取得したデータがあればポーリングを開始します。
    if (initialData) {
      intervalId = setInterval(poll, 1000)
    }

    // コンポーネントがアンマウントされるか、最初に取得したデータが変わったときにポーリングを停止します。
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [initialData]) // 依存性配列に最初に取得したデータを入れます。これにより、最初のデータが変わったときにuseEffect内のコードが再実行されます。

  // ポーリングの結果と状態を返します。
  return { pollData, pollError, isLoading }
}

// コンポーネントを定義します。
const YourComponent: React.FC = () => {
  // react-hook-formの機能をセットアップします。
  const { register, handleSubmit } = useForm<FormData>()
  // 最初に取得するデータとそのエラーを保持するためのステートを定義します。
  const [initialData, setInitialData] = useState<InitialData | null>(null)
  const [initialError, setInitialError] = useState<string | null>(null)
  // ポーリングのカスタムフックを使用します。
  const { pollData, pollError, isLoading } = usePolling(initialData)

  // フォームの送信時のハンドラを定義します。
  const onSubmit = async (formData: FormData) => {
    try {
      // 最初のAPIリクエストを送ります。
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      )

      // レスポンスが正常でなければエラーをスローします。
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // レスポンスからデータを取得します。
      const data: InitialData = await response.json()
      // 取得したデータをステートに保存します。
      setInitialData(data)
    } catch (error) {
      // APIリクエストでエラーが発生した場合、エラーメッセージをステートに保存します。
      setInitialError('Error: failed to fetch initial data')
    }
  }

  // コンポーネントのレンダリングを行います。
  return (
    // フォームをレンダリングします。送信時にonSubmitハンドラが呼ばれます。
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* フォームフィールドをレンダリングします。 */}
      {/* ポーリングが進行中であればボタンは無効化されます。 */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Start Polling'}
      </button>
      {/* エラーメッセージがあれば表示します。 */}
      {initialError && <div>Error: {initialError}</div>}
      {pollError && <div>Error: {pollError}</div>}
      {/* ポーリングで取得したデータがあれば表示します。 */}
      {pollData && <div>Result: {JSON.stringify(pollData)}</div>}
    </form>
  )
}

// コンポーネントをエクスポートします。
export default YourComponent
