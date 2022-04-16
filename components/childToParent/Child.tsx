import { Dispatch, SetStateAction, useEffect } from 'react'

type Props = {
  setAnimalName: Dispatch<SetStateAction<string>>
}

export const Child = ({ setAnimalName }: Props) => {
  useEffect(() => {
    const newAnimalName = `pig`
    setAnimalName((name: string) => name + newAnimalName) // // https://zenn.dev/dev63/articles/ae0f9f893dac64#comment-3f1e2ef850eddd
  }, [])

  return <div>子コンポーネント</div>
}

export default Child
