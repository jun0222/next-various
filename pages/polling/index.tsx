import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  // ここにフォームデータの型を定義します
}

type InitialData = {
  userId: number
  id: number
  title: string
  body: string
}

type PollData = {
  userId: number
  id: number
  title: string
  body: string
}

function usePolling(initialData: InitialData | null) {
  const [pollData, setPollData] = useState<PollData | null>(null)
  const [pollError, setPollError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    let attempts = 0
    const maxAttempts = 3

    const poll = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          //   `https://jsonplaceholder.typicode.com/posts/${initialData?.id}`,
          `localhost:30000/error`,
        ) // ポーリングのAPIリクエスト

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data: PollData = await response.json()
        setPollData(data)
        setIsLoading(false)
        if (intervalId) {
          clearInterval(intervalId)
        }
      } catch (error) {
        attempts++
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

    if (initialData) {
      intervalId = setInterval(poll, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [initialData])

  return { pollData, pollError, isLoading }
}

const YourComponent: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const [initialData, setInitialData] = useState<InitialData | null>(null)
  const [initialError, setInitialError] = useState<string | null>(null)
  const { pollData, pollError, isLoading } = usePolling(initialData)

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      ) // 初回のAPIリクエスト

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data: InitialData = await response.json()
      setInitialData(data)
    } catch (error) {
      setInitialError('Error: failed to fetch initial data')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* フォームフィールドの登録 */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Start Polling'}
      </button>
      {initialError && <div>Error: {initialError}</div>}
      {pollError && <div>Error: {pollError}</div>}
      {pollData && <div>Result: {JSON.stringify(pollData)}</div>}
    </form>
  )
}

export default YourComponent
