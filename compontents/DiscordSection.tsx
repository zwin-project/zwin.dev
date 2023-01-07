import { useTranslation } from "next-i18next"
import styles from '../styles/DiscordSection.module.scss'
import DiscordIcon from '../public/icons/discord.svg'
import ChevronRight from '../public/icons/chevron_right.svg'
import Link from "next/link"

const DiscordSection = (props: { alignCenter: boolean }) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.discordsection + ' ' + (props.alignCenter ? styles.center : '')}>
      <h4>{t('sidenav.discord_title')}</h4>
      <p className={styles.desc}>{t('sidenav.discord_desc')}</p>
      <a target="_blank" rel="noreferrer" className={styles.wraplink} href="http://discord.gg/PPJEFrdE9f">
        <div className={styles.discordbutton}>
          <DiscordIcon className={styles.discord} />
          <p>{t('sidenav.discord_button')}</p>
          <ChevronRight className={styles.chevron} />
        </div>
      </a>
    </div>
  )
}

export default DiscordSection
