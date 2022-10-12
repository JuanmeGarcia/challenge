import type { AppProps } from 'next/app'
import '../sass/main.scss'
import { SearchContextProvider } from '../context/useSearchContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <Component {...pageProps} />
    </SearchContextProvider>
  )
}

export default MyApp
