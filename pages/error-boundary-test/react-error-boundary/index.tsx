// react-error-boundaryを使う場合。通常は_app.tsxをラップする。
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Page1 from '@/components/ErrorBoundary/Page1'
import Page2 from '@/components/ErrorBoundary/Page2'
import Page3 from '@/components/ErrorBoundary/Page3'

type ErrorFallbackProps = {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div role="alert">
      <p>何かがおかしいようです: {error.message}</p>
      <p>react-error-boundaryによるエラーメッセージ</p>
      <button onClick={resetErrorBoundary}>再試行</button>
    </div>
  )
}

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Page1 />
    <Page2 />
    <Page3 />
  </ErrorBoundary>
)

export default App
