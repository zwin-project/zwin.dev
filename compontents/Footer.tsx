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
        <p className={styles.copyright}>© Z Window System, 2023</p>
        <ul className={styles.link}>
          <Link className={styles.wraplink} href="http://discord.gg/PPJEFrdE9f">
            <DiscordIcon className={styles.discord} />
          </Link>
          <Link className={styles.wraplink} href="https://github.com/zigen-project">
            <GithubIcon className={styles.github} />
          </Link>
          <Link className={styles.wraplink} href="https://twitter.com/zigen_project">
            <TwitterIcon className={styles.twitter} />
          </Link>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
