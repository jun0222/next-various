import { useState } from 'react'

export const App = () => {
  const [bool, setBool] = useState(false)
  return (
    <div>
      <button onClick={() => setBool(!bool)}>true/false</button>
      {bool ? <p>true</p> : <p>false</p>}
    </div>
  )
}

export default App
