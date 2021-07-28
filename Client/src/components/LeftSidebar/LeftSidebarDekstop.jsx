import styles from './LeftSidebar.module.css'
import {ProfileDesktop} from './Profile'
import {MenuDesktop} from './Menu'

const LeftSidebarDesktop = (props) => {
    return (
        <div className={styles.leftsidebar}>
            <ProfileDesktop logout={props.logout} app={props.app}/>
            <MenuDesktop app={props.app}/>
        </div>
    )
}

export default LeftSidebarDesktop