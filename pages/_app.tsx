import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Context as ResponsiveContext } from "react-responsive";
import { useComponentHydrated } from 'react-hydration-provider';

import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const hydrated = useComponentHydrated();

  return (
    <ResponsiveContext.Provider value={hydrated ? undefined : { width: 1600 }}>
      <Component {...pageProps} />
    </ResponsiveContext.Provider>
  )
}

export default appWithTranslation(MyApp)
