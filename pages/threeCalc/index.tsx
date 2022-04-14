import { useState } from "react"

export const App = () => {
  const [bool, setBool] = useState(false)
  return bool?(
    <div>true</div>
  ) : (
    <div>false</div>
  )
}

export default App
