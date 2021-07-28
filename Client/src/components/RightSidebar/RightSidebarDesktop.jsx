import styles from './RightSidebar.module.css'
import {TopUsersDesktop} from './TopUsers'
import {LastTopicsDesktop} from './LastTopics'
import { NavLink } from 'react-router-dom'

const RightSidebarDesktop = (props) => {
    return (
        <div className={styles.pc_wrapper}>
            <NavLink to={'/addtopic'}>
            <div className={styles.pc_button}>Добавить свою тему</div>
            </NavLink>
            <TopUsersDesktop topusers={props.topusers}/>
            <LastTopicsDesktop lasttopics={props.lasttopics}/>
        </div>
    )
}

export default RightSidebarDesktop