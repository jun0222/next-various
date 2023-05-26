import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

// APIからのレスポンスを表すインターフェースを定義します。
interface ApiResponse {
  data: any
}

// 初期APIリクエストを行い、そのレスポンスを元にポーリングを行う関数を定義します。
// これがコンポーネント外部で呼び出す唯一の関数となります。
const usePollingFromApi = () => {
  // フォームデータを管理するためにreact-hook-formを使用します。
  const { handleSubmit } = useForm()

  // APIからの初期データ、ポーリングデータ、およびエラーを管理するためのステートを定義します。
  const [initialData, setInitialData] = useState<ApiResponse | null>(null)
  const [pollData, setPollData] = useState<ApiResponse | null>(null)
  const [initialError, setInitialError] = useState<string | null>(null)
  const [pollError, setPollError] = useState<string | null>(null)

  // ローディング状態を管理するためのステートを定義します。
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // ポーリングのsetIntervalを管理するためのrefを定義します。
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // submitの処理を定義します。ここでは、まず初期APIリクエストを行い、その後でポーリングを行います。
  const onSubmit = handleSubmit(async () => {
    setIsLoading(true)

    // 初期APIリクエストを行います。
    try {
      const response = await axios.get<ApiResponse>(
        'https://jsonplaceholder.typicode.com/todos/1',
      )
      setInitialData(response.data)
      setInitialError(null)
    } catch (error: any) {
      setInitialError(error.message)
      setIsLoading(false)
      return
    }

    // ポーリングを開始します。useEffectではなくここでポーリングを開始しています。
    let pollAttempts = 0

    pollIntervalRef.current = setInterval(async () => {
      try {
        const response = await axios.get<ApiResponse>(
          // 'https://jsonplaceholder.typicode.com/todos/1',
          'localhost:30000/error',
        )
        setPollData(response.data)
        setPollError(null)
        pollAttempts = 0

        // ポーリングのレスポンスが期待する値であれば、ポーリングを停止します。
        // ここでは、レスポンスデータが正しく存在するかどうかをチェックします。
        // 実際のコードでは、ここで具体的な条件を指定する必要があります。
        if (response.data) {
          clearInterval(pollIntervalRef.current as NodeJS.Timeout)
          setIsLoading(false)
        }
      } catch (error: any) {
        pollAttempts++

        // 3回連続でポーリングが失敗した場合、エラーを表示します。
        if (pollAttempts >= 3) {
          setPollError(error.message)
          clearInterval(pollIntervalRef.current as NodeJS.Timeout)
          setIsLoading(false)
        }
      }
    }, 1000)
  })

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [])

  return { onSubmit, initialData, pollData, initialError, pollError, isLoading }
}

// 実際のコンポーネントです。
const MyComponent: React.FC = () => {
  const {
    onSubmit,
    initialData,
    pollData,
    initialError,
    pollError,
    isLoading,
  } = usePollingFromApi()

  return (
    <div>
      <form onSubmit={onSubmit}>
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {initialError && <p>Error: {initialError}</p>}
      {pollError && <p>Error: {pollError}</p>}
      {initialData && <p>Initial Data: {JSON.stringify(initialData)}</p>}
      {pollData && <p>Poll Data: {JSON.stringify(pollData)}</p>}
    </div>
  )
}

export default MyComponent

// オーダー
// ・動作を確認するから実装してほしい
// ・pollingでsetinterval使って欲しい
// ・あけてくれているところも仮でデータ入れて。
// ・ポーリングはuseEffectじゃ無理？特に問題なさそうならuseeffectして欲しい。
// ・先に別のapiを叩いて、帰ってきたレスポンスをpollの引数として渡し、pollから投げるリクエストに入れたいし、typescriptにも対応していて欲しい。
// ・apiリクエストからpollingの実行という一連の動作はreact-hook-formのsubmitを実行した時にしてほしい。
// ・ポーリング処理はカスタムフッっくとして実装してほしい
// ・あと1秒毎のポーリングで3回叩いてダメならエラーにして画面に表示してほしい
// ・URLはJsonplaceholderにして
// ・3回失敗したらエラーメッセージ出すだけじゃなくてリトライしないで
// ・ポーリング中はローディング中...と表示して、submit押せないようにしてほしい。で、終わったら解除してほしい
// ・setintervalはuseRefで管理してほしい
// ・初回レンダリング時はuseEffectを実行しないようにしてほしい
// ・ポーリングする関数は別apiを呼び出して、そのレスポンスを引数にして呼び出す関数から呼び出してほしい。コンポーネントからはその関数を呼び出すだけでいいようにしてほしい。
// ・全行に解説のコメントを書いてほしい
// ・コメントアウトつけるつけないで簡単にAPIエラー時の挙動を見られるようにしてほしい
// ・ポーリングして欲しい値が取れたらポーリングを止めてほしい
// ・fetchでapi叩いて欲しい
