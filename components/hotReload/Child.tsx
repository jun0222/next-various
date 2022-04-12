import { useEffect } from 'react'

type Props = {
  setStr: React.Dispatch<React.SetStateAction<string>>
}

export const Child = ({ setStr }: Props) => {
  useEffect(() => {
    const newStr = 'goodbye'
    setStr(newStr)
  }, [])

  return <div></div>
}

export default Child
