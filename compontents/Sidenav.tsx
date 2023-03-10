import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { whatIsIt, gettingStarted } from "../content/content"
import styles from '../styles/Sidenav.module.scss'
import NavItem from "./NavItem"
import DiscordSection from "./DiscordSection"

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
              <NavItem
                key={article.path}
                isLarge={false}
                active={id == article.path}
                href={article.path}
                text={t([path, 'articles', article.path].join('.'))}
              />
            ))}
          </div>
        ))}
        <div className={styles.divider} />
        <DiscordSection alignCenter={false} />
      </div>
    </div>
  )
}

export default Sidenav
