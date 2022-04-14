import { useEffect, useState } from 'react'
import Child from '../../components/hotReload/Child'

export const App = () => {
  const [greeting, setGreeting] = useState('hello')
  const [str, setStr] = useState('')

  useEffect(() => {
    if (str === 'goodbye') {
      const newGreeting = str
      setGreeting(newGreeting)
    }
//   }, [str])
    }, []) // だとhot reload時にしか動かない

  return (
    <div>
      <p>{greeting}</p>
      <Child setStr={setStr} />
    </div>
  )
}

export default App
