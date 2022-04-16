import { useEffect } from 'react'

type Props = {
  setAnimalName: (name: string)=>void // https://zenn.dev/dev63/articles/ae0f9f893dac64#comment-3f1e2ef850eddd
}

export const Child = ({ setAnimalName }: Props) => {
  useEffect(() => {
    const newAnimalName = `pig`
    setAnimalName(newAnimalName)
  }, [])

  return <div>子コンポーネント</div>
}

export default Child
