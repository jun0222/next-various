type User = {
  id: number
  name: string
  age: number
  personalColor?: string
  // personalColor: string;にするとエラーになる
  // プロパティ 'personalColor' は型 '{ id: number; name: string; age: number; hobbies: string[]; }' にありませんが、型 'User' では必須です。
  hobbies?: string[]
}

export default User
