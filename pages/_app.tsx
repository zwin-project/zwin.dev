import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Context as ResponsiveContext } from "react-responsive";
import { useComponentHydrated } from 'react-hydration-provider';

import '../styles/globals.scss'
import GA from '../compontents/GA';
import { existsGaId, pageview } from '../src/gtag'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const hydrated = useComponentHydrated();
  const router = useRouter()

  useEffect(() => {
    if (!existsGaId) return

    const handleRouteChange = (path: string) => {
      pageview(path)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ResponsiveContext.Provider value={hydrated ? undefined : { width: 1600 }}>
      <GA />
      <Component {...pageProps} />
    </ResponsiveContext.Provider>
  )
}

export default appWithTranslation(MyApp)
