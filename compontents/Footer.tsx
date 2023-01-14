import styles from '../styles/Footer.module.scss'
import GithubIcon from '../public/icons/github.svg'
import TwitterIcon from '../public/icons/twitter.svg'
import DiscordIcon from '../public/icons/discord.svg'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { breakpointSidebar } from './common'

const Footer = () => {
  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpointSidebar}px)`
  })
  return (
    <footer className={styles.footerwrap}>
      <div className={styles.footer + ' ' + (!isLarge ? styles.mobile : '')}>
        <p className={styles.copyright}>© Zwin, 2023</p>
        <ul className={styles.link}>
          <a target="_blank" rel="noreferrer" className={styles.wraplink} href="http://discord.gg/PPJEFrdE9f">
            <DiscordIcon className={styles.discord} />
          </a>
          <a target="_blank" rel="noreferrer" className={styles.wraplink} href="https://github.com/zwin-project">
            <GithubIcon className={styles.github} />
          </a>
          <a target="_blank" rel="noreferrer" className={styles.wraplink} href="https://twitter.com/zwin_project">
            <TwitterIcon className={styles.twitter} />
          </a>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
