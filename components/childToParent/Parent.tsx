import { useState } from 'react'
import Child from './Child'

export const Parent = () => {
  const [animalName, setAnimalName] = useState('dog')

  return (
    <>
      <div>animalName:{animalName}</div>
      {animalName === `pig` && <div>子コンポーネントで`pig`を設定しました</div>}
      <Child setAnimalName={setAnimalName} />
    </>
  )
}

export default Parent
