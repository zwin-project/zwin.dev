import Link from 'next/link'
import { isNativeError } from 'util/types'
import styles from '../styles/DocsNav.module.scss'

const Button = (props: {
  path: string,
  title: string,
  isNext: boolean
}) => {
  return (
    <Link href={props.path}>
      <div className={styles.button}>
        <p className={styles.desc}>{ props.isNext ? 'Next' : 'Previous' }</p>
        <p className={styles.buttontitle}>{props.title}</p>
      </div>
    </Link>
  )
}

const DocsNav = (props: {
  next?: {
    path: string,
    title: string
  },
  previous?: {
    path: string,
    title: string
  }
}) => {
  return (
    <div className={styles.docsnav}>
      {props.previous != undefined &&
        <Button path={props.previous.path} title={props.previous.title} isNext={false}/> 
      }
      {props.previous == undefined &&
        <div className={styles.spacer}></div>
      }
      {props.next != undefined &&
        <Button path={props.next.path} title={props.next.title} isNext={true}/> 
      }
      {props.next == undefined &&
        <div className={styles.spacer}></div>
      }
    </div>
  )
}

export default DocsNav
