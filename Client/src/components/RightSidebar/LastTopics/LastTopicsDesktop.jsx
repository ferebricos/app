import { NavLink } from 'react-router-dom'
import Icon from './../../Icons'
import styles from './LastTopics.module.css'

const LastTopicsDesktop = (props) => {
    const tst = props?.lasttopics.map((e) => {
        return (
            <NavLink to={'/topic/'+e.id}>
        <div className={styles.item}>
            <div className={styles.icon}><Icon icon={e.icon} size="16px"/></div>
            <div className={styles.item_title}>{e.title}</div>
        </div>
        </NavLink>)
    })
    return (
        <div className={styles.pc_wrapper}>
            <div className={styles.title}>Последние темы</div>
            {tst}
        </div>
    )
}

export default LastTopicsDesktop