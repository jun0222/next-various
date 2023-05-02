// pages/fetch.js
import React, { useEffect, useState } from 'react'

const FetchPage = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const url = 'https://jsonplaceholder.typicode.com/todos/1'

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error(`Failed to fetch data: ${error}`)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>JSONPlaceholder Data:</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  )
}

export default FetchPage
