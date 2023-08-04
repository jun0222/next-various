import { useEffect } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.onerror = (message, source, lineno, colno, error) => {
      // エラーレポートサービスに送信するなど
      const errorInfo = {
        message,
        source,
        lineno,
        colno,
        stack: error ? error.stack : '',
      }

      // エラー情報をサーバーに送信
      fetch('/api/logError', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorInfo),
      })
    }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
