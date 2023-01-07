import { TableOfContent } from "./common"
import styles from "../styles/TOC.module.scss"
import { useTranslation } from "next-i18next"

const TOC = (props: { toc: TableOfContent[] }) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.tocwrap}>
      <div className={styles.toc}>
        <h4>{t('tableofcontents')}</h4>
        <ul className={styles.toccontent}>
          {props.toc.map((elm: TableOfContent) => {
            return <li key={elm.href}>
              <a href={elm.href}>{elm.title}</a>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default TOC
