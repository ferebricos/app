import { NavLink } from 'react-router-dom'
import Icon from './../../Icons'
import styles from './LastTopics.module.css'

const LastTopicsMobile= (props) => {
    const tst = props?.lasttopics.map((e) => {
        return (
            <NavLink to={'/topic/'+e.id}>
        <div className={styles.item}>
            <div className={styles.icon}><Icon icon={e.icon} size="16px"/></div>
            <div className={styles.item_title_mobile}>{e.title}</div>
        </div>
        </NavLink>)
    })
    return (
        <div className={styles.mobile_wrapper}>
            <div className={styles.title}>Последние темы</div>
            {tst}
        </div>
    )
}

export default LastTopicsMobile