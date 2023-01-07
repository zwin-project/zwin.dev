import Link from "next/link";
import router, { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styles from '../styles/Header.module.scss'
import { whatIsIt, gettingStarted } from "../content/content"
import LogoLight from '../public/logo_light.svg'
import GithubIcon from '../public/icons/github.svg'
import MenuIcon from '../public/icons/menu.svg'
import CloseIcon from '../public/icons/close.svg'
import { useMediaQuery } from "react-responsive";
import { breakpointSidebar } from "./common";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";

const NavButton = (props: { active: boolean, text: string, href: string }) => {
  return (
    <li className={styles.navbutton + ' ' + (props.active ? styles.active : '')}>
      <Link className={styles.wraplink} href={props.href}>{props.text}</Link>
    </li>
  )
}

const LangSwitcher = () => {
  const router = useRouter()
  const toggleLang = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, router.asPath, { locale: newLocale })
  }
  return (
    <div className={styles.langswitcher}>
      <a className={router.locale == 'en' ? styles.active : ''} onClick={() => toggleLang('en')}>EN</a>
      <p>/</p>
      <a className={router.locale == 'ja' ? styles.active : ''} onClick={() => toggleLang('ja')}>JA</a>
    </div>
  )
}

const Header = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpointSidebar}px)`
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    setIsDrawerOpen(false)  
  }, [router.asPath])

  return (
    <header className={styles.headerwrap + ' ' + (!isLarge && isDrawerOpen ? styles.open : '')}>
      <div className={styles.header}>
        <Link className={styles.wraplink} href="/">
          <LogoLight className={styles.logo} />
        </Link>
        {isLarge && <div className={styles.nav}>
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
            <GithubIcon className={styles.github} />
          </Link>
          <LangSwitcher />
        </div>}
        {!isLarge && <a className={styles.wraplink} onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          {!isDrawerOpen && <MenuIcon className={styles.menu} />}
          {isDrawerOpen && <CloseIcon className={styles.close} />}
        </a>}
      </div>
      {/* menu opened */}
      {!isLarge && <MobileNav />}
    </header>
  )
}

const MobileNav = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={styles.mobilenav}>
      <div className={styles.mobilenavinner}>
        <div className={styles.toprow}>
          <LangSwitcher />
          <Link className={styles.wraplink} href="https://github.com/zigen-project">
            <GithubIcon className={styles.github} />
          </Link>
        </div>
        <div className={styles.divider} />
        <div className={styles.navitemwrap}>
          <NavItem
            isLarge={true}
            active={router.pathname == '/'}
            href="/"
            text={t('top')}
          />
          <NavItem
            isLarge={true}
            active={router.pathname.split('/')[1] == 'roadmap'}
            href="/roadmap"
            text={t('roadmap')}
          />
        </div>
        <div className={styles.divider} />
        <div className={styles.navitemwrap}>
          <p className={styles.section}>{t('what_is_it.what_is_it')}</p>
          {...whatIsIt.articles.map((article) => (
            <NavItem
              key={article.path}
              isLarge={true}
              active={router.pathname.split('/')[1] == 'what_is_it' && id == article.path}
              href={'/what_is_it/' + article.path}
              text={t(['what_is_it', 'articles', article.path].join('.'))}
            />
          ))}
        </div>
        <div className={styles.divider} />
        <div className={styles.navitemwrap}>
          <p className={styles.section}>{t('getting_started.getting_started')}</p>
          {...gettingStarted.articles.map((article) => (
            <NavItem
              key={article.path}
              isLarge={true}
              active={router.pathname.split('/')[1] == 'getting_started' && id == article.path}
              href={'/getting_started/' + article.path}
              text={t(['getting_started', 'articles', article.path].join('.'))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
