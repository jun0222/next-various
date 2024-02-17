// https://zenn.dev/nekoniki/articles/07c09eb6811c85a753de

export const App = () => {
  type Student = {
    name: string
    score: number
  }

  const data: Student[] = [
    { name: '太郎', score: 75 },
    { name: '花子', score: 62 },
    { name: 'John', score: 59 },
  ]

  const totalScore: number = data.reduce(
    (acc: number, val: Student): number => {
      // accは「初期値 or 前回のreturn値」でvalは「配列要素」
      return acc + val.score
    },
    0,
  )

  // console.log(totalScore)

  return <div>{totalScore}</div>
}

export default App
