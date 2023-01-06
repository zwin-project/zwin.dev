import router from "next/router";

const Header = () => {
  const toggleLang = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, router.asPath, { locale: newLocale })
  }

  return (
    <header>
      <button onClick={() => toggleLang('en')}>EN</button> / <button onClick={() => toggleLang('ja')}>JA</button>
    </header>
  )
}

export default Header
