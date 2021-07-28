import styles from './Header.module.css'
import { LogoIcon } from './../../assets/icons'
import { MenuMobile } from './Menu'
import { ProfileMobile } from './Profile'

const HeaderMobile = (props) => {

    return (
        <header>
            <div className={styles.mobile_wrapper}>
                <div className={styles.mobile_logo}>
                    <LogoIcon width='24px' height='24px' color='var(--text-1)' />
                </div>
                <div className={styles.mobile_menu}>
                    <MenuMobile logout={props.logout} app={props.app} setTheme={props.setTheme}/>
                </div>
                <div className={styles.mobile_profile}>
                    <ProfileMobile app={props.app} />
                </div>
            </div>
        </header>
    )
}

export default HeaderMobile