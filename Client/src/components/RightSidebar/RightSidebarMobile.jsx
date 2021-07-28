import styles from './RightSidebar.module.css'
import {LastTopicsMobile} from './LastTopics'
import { NavLink } from 'react-router-dom'

const RightSidebarMobile = (props) => {
    return (
        <div className={styles.mobile_wrapper}>
            <NavLink to={'/addtopic'}>
            <div className={styles.mobile_button}>Добавить свою тему</div>
            </NavLink>
            <LastTopicsMobile lasttopics={props.lasttopics}/>
        </div>
    )
}

export default RightSidebarMobile