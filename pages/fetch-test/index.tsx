import React, { useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  const apiTest = () => {
    fetch('/api/example')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }

  return (
    <div className="container is-fluid">
      {message && <div>Message:{message}</div>}
      <div>
        <button onClick={apiTest}>api-test</button>
      </div>
    </div>
  )
}

export default App
