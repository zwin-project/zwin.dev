import Link from "next/link";
import router, { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Header = () => {
  const toggleLang = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, router.asPath, { locale: newLocale })
  }
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <header>
      <li><Link href="/">Z Window System</Link></li>
      <li style={{color: router.pathname.split('/')[1] == 'what_is_it' ? '#f00' : '000'}}>
        <Link href="/what_is_it/what_is_z_window_system">{t('what_is_it.what_is_it')}</Link>
      </li>
      <li style={{color: router.pathname.split('/')[1] == 'getting_started' ? '#f00' : '000'}}>
        <Link href="/getting_started/system_requirement">{t('getting_started.getting_started')}</Link>
      </li>
      <li style={{color: router.pathname.split('/')[1] == 'roadmap' ? '#f00' : '000'}}>
        <Link href="/roadmap">{t('roadmap')}</Link>
      </li>
      <div>
        <button onClick={() => toggleLang('en')}>EN</button> / <button onClick={() => toggleLang('ja')}>JA</button>
      </div>
    </header>
  )
}

export default Header
