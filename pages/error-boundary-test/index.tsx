// react標準エラーバウンダリーを使う場合。通常は_app.tsxをラップする。
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Page1 from '@/components/ErrorBoundary/Page1'
import Page2 from '@/components/ErrorBoundary/Page2'
import Page3 from '@/components/ErrorBoundary/Page3'

const App = () => (
  <ErrorBoundary>
    <Page1 />
    <Page2 />
    <Page3 />
  </ErrorBoundary>
)

export default App
