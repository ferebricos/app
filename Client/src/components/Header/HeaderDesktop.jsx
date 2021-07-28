import styles from './Header.module.css'
import { LogoIcon } from './../../assets/icons'
import { SearchbarDesktop } from './Searchbar'
import { ProfileDesktop } from './Profile'

const HeaderDesktop = (props) => {
    const changeTheme = () => {
        if(props.app.theme == 'light') {
            props.setTheme('dark')
        } else {
            props.setTheme('light')
        }
    }
    return (
        <header>
            <div className={styles.pc_wrapper}>
                <div className={styles.pc_logo}>
                    <LogoIcon width='32px' height='32px' color='var(--text-1)' />
                </div>
                <div className={styles.pc_profile}>
                    <ProfileDesktop app={props.app}/>
                    <button className={styles.pc_theme} onClick={changeTheme}>Cменить тему</button>
                </div>
            </div>
        </header>
    )
}

export default HeaderDesktop