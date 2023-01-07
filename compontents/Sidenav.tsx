import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { whatIsIt, gettingStarted } from "../content/content"
import styles from '../styles/Sidenav.module.scss'

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
      </div>
    </div>
  )
}

export default Sidenav
