import { useEffect } from 'react'

type Props = {
  setAnimalName: React.Dispatch<React.SetStateAction<string>>
}

export const Child = ({ setAnimalName }: Props) => {
  useEffect(() => {
    const newAnimalName = `pig`
    setAnimalName(newAnimalName)
  }, [])

  return <div>子コンポーネント</div>
}

export default Child
