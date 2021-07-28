import { NavLink } from 'react-router-dom'
import Icon from './../../Icons'
import Useravatar from './../../Useravatar'
import styles from './Category.module.css'

const CategoryDesktop = (props) => {
        return (
        <div className={styles.pc_wrapper}>
            <div className={styles.pc_icon}><Icon icon={props.category.icon} size="32px"/></div>
            <NavLink to={'/category/'+props.category.id}>
            <div className={styles.pc_desc}>
                <div className={styles.pc_desc_title}>{props.category.title}</div>
            {props.category.description}
            </div>
            </NavLink>
            <div className={styles.pc_info}>
                <div className={styles.pc_info_firstline}>
                    <div className={styles.pc_info_title}>Тем:</div>{props.category.topics}
                    <div className={styles.pc_info_title}>Сообщений:</div>{props.category.messages}
                </div>
                <div className={styles.pc_info_secondline}>
                    <div className={styles.pc_info_title}>Последняя тема:</div>
                    <div>
                        <div className={styles.pc_avatar}>
                            <Useravatar img={props?.category?.last_topic_avatar}/>
                        </div>
                        <div className={styles.pc_title}>
                        <NavLink to={'/topic/'+props.category.last_topic}>
                            <span>
                            {props.category.last_topic_title}</span>
                        </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryDesktop