// https://zenn.dev/longbridge/articles/0c7c9ce5c60487
// https://marsquai.com/745ca65e-e38b-4a8e-8d59-55421be50f7e/f83dca4c-79db-4adf-b007-697c863b82a5/1df35b56-cba0-472f-8393-813e16a861c7/
// Next.jsだとサーバー側に自動的にエラーを送信する、TypeScriptの場合はランタイムエラーをコンパイルエラーにするので検証時注意。

import React, { ErrorInfo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // エラーハンドリングロジック
    if (process.env.NODE_ENV !== 'production') {
      console.error('Uncaught error:', error, errorInfo)
    }
  }

  public render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      // // publicのhtmlを返す
      // window.location.href = '/error.html'
      // // pages/_error.tsxを返す
      // const router = useRouter()
      // router.push('/_error')

      return <h1>Something went wrong.</h1>
    }
    return children
  }
}
export default ErrorBoundary
