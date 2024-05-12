// pages/_app.js
import {NextUIProvider} from '@nextui-org/react'

function MyApp({ Component, pageProps }: {Component: any, pageProps: any}) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp;