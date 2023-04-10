// まずはNext.jsとその他必要なパッケージをインポート
import React from 'react'
import Head from 'next/head'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface SSRPageProps {
  posts: Post[]
}

// サーバーサイドレンダリングを行うため、getServerSideProps関数を定義
export async function getServerSideProps() {
  // データ取得用のAPIエンドポイント
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts'

  try {
    // APIからデータを取得
    const res = await axios.get(apiUrl)

    // 取得したデータをpropsに渡す
    return {
      props: {
        posts: res.data,
      },
    }
  } catch (error) {
    // エラーが発生した場合、エラー内容をコンソールに出力
    console.error(error)

    // エラーが発生した場合、propsに空の配列を渡す
    return {
      props: {
        posts: [],
      },
    }
  }
}

// メインのコンポーネントを定義
const SSRPage = ({ posts }: SSRPageProps) => {
  return (
    <div>
      <Head>
        {/* HTMLのheadタグ内にページタイトルを設定 */}
        <title>Next.js SSR Example</title>
      </Head>
      <h1>サーバーサイドレンダリングのサンプルページ</h1>
      {/* 取得した投稿データをリストで表示 */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

// メインのコンポーネントをエクスポート
export default SSRPage
