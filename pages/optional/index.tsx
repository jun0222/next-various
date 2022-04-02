import User from '../api/optional'

const user: User = {
  id: 1,
  name: 'John',
  age: 30,
  // hobbies: ['Sports', 'Cooking'] // これを追加しても正しく動作する
}

const Optional = () => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.age}</p>
      <ul>
        {user.hobbies?.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
        {/*
            {user.hobbies.map((hobby, index) => <li key={index}>{hobby}</li>)}
            だとエラーになる。オブジェクトは 'undefined' である可能性があります。ts(2532)
        */}
      </ul>
    </div>
  )
}

export default Optional
