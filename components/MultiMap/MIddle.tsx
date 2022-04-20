import React, { useState } from 'react'
import Child from './Child'

type Props = {
  members: Array<{
    hoby: string
    name: string
    team: number
  }>
  team: number
}

export const Middle = ({ members, team }: Props) => {
  const [teamName, setTeamName] = useState('')
  return (
    <>
      <h1>Level {team}</h1>
      <p>Level {teamName}</p>
      <div>
        {members.map((member, index) => (
          <Child
            key={index}
            member={member}
            team={team}
            setTeamName={setTeamName}
          />
        ))}
      </div>
    </>
  )
}

export default Middle
