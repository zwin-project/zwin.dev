import Link from "next/link";
import router, { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styles from '../styles/Header.module.scss'
import LogoLight from '../public/logo_light.svg'
import GithubIcon from '../public/icons/github.svg'

const NavButton = (props: {active: boolean, text: string, href: string}) => {
  return (
    <li className={styles.navbutton + ' ' + (props.active ? styles.active: '')}>
      <Link className={styles.wraplink} href={props.href}>{props.text}</Link>
    </li>
  )
}

const Header = () => {
  const toggleLang = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, router.asPath, { locale: newLocale })
  }
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <header className={styles.headerwrap}>
      <div className={styles.header}>
        <Link className={styles.wraplink} href="/">
          <LogoLight className={styles.logo}/>
        </Link>
        <div className={styles.nav}>
          <ul className={styles.navbuttons}>
            <NavButton
              active={router.pathname.split('/')[1] == 'what_is_it'}
              href="/what_is_it/what_is_z_window_system"
              text={t('what_is_it.what_is_it')}
            />
            <NavButton
              active={router.pathname.split('/')[1] == 'getting_started'}
              href="/getting_started/system_requirement"
              text={t('getting_started.getting_started')}
            />
            <NavButton
              active={router.pathname.split('/')[1] == 'roadmap'}
              href="/roadmap"
              text={t('roadmap')}
            />
          </ul>
          <Link className={styles.wraplink} href="https://github.com/zigen-project">
            <GithubIcon className={styles.github}/>
          </Link>
          <div className={styles.langswitcher}>
            <a className={router.locale == 'en' ? styles.active : ''} onClick={() => toggleLang('en')}>EN</a>
            <p>/</p>
            <a className={router.locale == 'ja' ? styles.active : ''} onClick={() => toggleLang('ja')}>JA</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
