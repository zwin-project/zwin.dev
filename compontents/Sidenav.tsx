import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { whatIsIt, gettingStarted } from "../content/content"

export enum SidenavPath {
  whatIsIt,
  gettingStarted
}

const Sidenav = (props: {kind: SidenavPath}) => {
  const content =
    props.kind == SidenavPath.whatIsIt ? whatIsIt :
    props.kind == SidenavPath.gettingStarted ? gettingStarted :
    whatIsIt
  const path = content.path

  const { t } = useTranslation('common')
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      {...content.subsections.map(subsection => (
        <div key={subsection}>
          <p style={{opacity: 0.3}}>
            {t([path, 'subsections', subsection].join('.'))}
          </p>
          {...content.articles.filter((article) => article.subsection == subsection).map(article => (
            <li key={article.path} style={{color: id == article.path ? '#f00' : '#000'}}>
              <Link href={article.path}>
                {t([path, 'articles', article.path].join('.'))}
              </Link>
            </li>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Sidenav
