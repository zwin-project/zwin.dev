import { TableOfContent } from "./common"
import styles from "../styles/TOC.module.scss"

const TOC = (props: {toc: TableOfContent[]}) => {
  return (
    <div className={styles.toc}>
      <h4>Table of Contents</h4>
      {props.toc.map((elm: TableOfContent) => {
        return <li key={elm.href}>
          <a href={elm.href}>{elm.title}</a>
        </li>
      })}
    </div>
  )
}

export default TOC
