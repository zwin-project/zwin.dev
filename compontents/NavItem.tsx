import Link from 'next/link'
import styles from '../styles/NavItem.module.scss'

const NavItem = (props: {isLarge: boolean, active: boolean, href: string, text: string}) => {
  return (
    <li className={styles.article + ' '
      + (props.active ? styles.active : '') + ' '
      + (props.isLarge ? styles.large : '')
    }>
    <Link className={styles.wraplink} href={props.href}>
      {props.text}
    </Link>
  </li>
  )
}

export default NavItem
