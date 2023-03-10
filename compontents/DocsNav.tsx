import Link from 'next/link'
import { isNativeError } from 'util/types'
import styles from '../styles/DocsNav.module.scss'
import ChevronRight from '../public/icons/chevron_right.svg'
import { useMediaQuery } from 'react-responsive'
import { breakpointSidebar } from './common'

const Button = (props: {
  path: string,
  title: string,
  isNext: boolean
}) => {
  return (
    <Link className={styles.wraplink} href={props.path}>
      <div className={styles.button}>
        <p className={styles.desc}>{ props.isNext ? 'Next' : 'Previous' }</p>
        <p className={styles.buttontitle}>{props.title}</p>
        {props.isNext && <ChevronRight className={styles.chevronright} />}
        {!props.isNext && <ChevronRight className={styles.chevronleft} />}
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
  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpointSidebar}px)`
  })
  return (
    <div className={styles.docsnav + ' ' + (!isLarge ? styles.vertical : '')}>
      {props.previous != undefined &&
        <Button path={props.previous.path} title={props.previous.title} isNext={false}/> 
      }
      {(props.previous == undefined && isLarge) &&
        <div className={styles.spacer}></div>
      }
      {props.next != undefined &&
        <Button path={props.next.path} title={props.next.title} isNext={true}/> 
      }
      {(props.next == undefined && isLarge) &&
        <div className={styles.spacer}></div>
      }
    </div>
  )
}

export default DocsNav
