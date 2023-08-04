import React from 'react'

interface ErrorProps {
  statusCode: number | undefined
}

const ErrorPage: React.FC<ErrorProps> = ({ statusCode }) => {
  return (
    <div>
      <h1>エラーが発生しました</h1>
      <p>
        {statusCode
          ? `サーバーエラーが発生しました。エラーコード: ${statusCode}`
          : 'クライアント側でエラーが発生しました。'}
      </p>
    </div>
  )
}

export default ErrorPage
