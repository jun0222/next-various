import React, { useState } from 'react'
import Child from '../components/MultiMap/Child'

// コンポーネントを増やす場合
// import Middle from '../components/MultiMap/MIddle'

export const App = () => {
  const teams = [1, 2, 3, 4]
  const members = [
    { hoby: 'football', name: 'Taro', team: 1 },
    { hoby: 'ayatori', name: 'Jiro', team: 3 },
    { hoby: 'work', name: 'Ken', team: 3 },
  ]
  // このままフラグメントで展開する場合
  const [teamName, setTeamName] = useState('')
  return (
    <>
      {teams.map((team, index) => (
        // このままフラグメントで展開する場合
        <React.Fragment key={index}>
          {members.some((member) => {
            return member.team === team
          }) && (
            <>
              <h1>team {team}</h1>
            </>
          )}
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
        </React.Fragment>

        // コンポーネントを増やす場合
        // <Middle
        //     key={index}
        //     members={members}
        //     team={team}
        // />
      ))}
    </>
  )
}

export default App
