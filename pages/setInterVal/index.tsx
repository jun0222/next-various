import React, { useState, useEffect, useRef } from 'react'

interface Data {
  someCondition: boolean
  // 他のデータ型のプロパティも定義してください。
}

const ExampleComponent: React.FC = () => {
  const [data, setData] = useState<Data | null>(null)
  const intervalId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      //   try {
      // 非同期処理を行う (例: APIからデータを取得)
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1',
      )
      const result: Data = await response.json()

      // 状態をセット
      setData(result)

      // 条件に応じてインターバルをクリア
      if (result.someCondition) {
        if (intervalId.current) {
          clearInterval(intervalId.current)
        }
      }
      //   } catch (error) {
      //     console.error('Error fetching data:', error)
      //   }
    }

    // fetchData を定期的に実行
    intervalId.current = setInterval(fetchData, 5000) // 5000ms（5秒）ごとに実行

    // コンポーネントのアンマウント時にインターバルをクリア
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current)
      }
    }
  }, []) // 空の依存配列を渡すことで、この useEffect はコンポーネントのマウント時にのみ実行されます。

  return (
    <div>
      {data ? (
        <div>データ: {JSON.stringify(data)}</div>
      ) : (
        <div>データを取得中...</div>
      )}
    </div>
  )
}

export default ExampleComponent
