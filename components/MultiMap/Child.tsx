import { useEffect } from 'react'

type Props = {
  member: {
    hoby: string
    name: string
    team: number
  }
  team: number
  setTeamName: (title: string) => void
}

export const Child = ({ member, setTeamName }: Props) => {
  useEffect(() => {
      const newTeamName = `レベル${member.team}`
      setTeamName(newTeamName)
  }, [])

  return <div></div>
}

export default Child
