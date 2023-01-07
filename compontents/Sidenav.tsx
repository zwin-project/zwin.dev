import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { whatIsIt, gettingStarted } from "../content/content"
import styles from '../styles/Sidenav.module.scss'
import DiscordIcon from '../public/icons/discord.svg'
import ChevronRight from '../public/icons/chevron_right.svg'

export enum SidenavPath {
  whatIsIt,
  gettingStarted
}

const Sidenav = (props: { kind: SidenavPath }) => {
  const content =
    props.kind == SidenavPath.whatIsIt ? whatIsIt :
      props.kind == SidenavPath.gettingStarted ? gettingStarted :
        whatIsIt
  const path = content.path

  const { t } = useTranslation('common')
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={styles.sidenavwrap}>
      <div className={styles.sidenav}>
        {...content.subsections.map(subsection => (
          <div className={styles.subsection} key={subsection}>
            <p className={styles.subsectiontitle}>
              {t([path, 'subsections', subsection].join('.'))}
            </p>
            {...content.articles.filter((article) => article.subsection == subsection).map(article => (
              <li key={article.path} className={styles.article + ' ' + (id == article.path ? styles.active : '')}>
                <Link className={styles.wraplink} href={article.path}>
                  {t([path, 'articles', article.path].join('.'))}
                </Link>
              </li>
            ))}
          </div>
        ))}
        <div className={styles.divider} />
        <div className={styles.discordsection}>
          <h4>{t('sidenav.discord_title')}</h4>
          <p className={styles.desc}>{t('sidenav.discord_desc')}</p>
          <Link className={styles.wraplink} href="http://discord.gg/PPJEFrdE9f">
            <div className={styles.discordbutton}>
              <DiscordIcon className={styles.discord} />
              <p>{t('sidenav.discord_button')}</p>
              <ChevronRight className={styles.chevron} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidenav
