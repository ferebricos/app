import { NavLink } from 'react-router-dom'
import Icon from './../../Icons'
import Useravatar from '../../Useravatar'
import styles from './Category.module.css'

const CategoryMobile = (props) => {
    return (
        <div className={styles.mobile_wrapper}>
            <div className={styles.mobile_icon}><Icon icon={props.category.icon} size="32px"/></div>
            <NavLink to={'/category/'+props.category.id}>
            <div className={styles.mobile_desc}>
                <div className={styles.mobile_desc_title}>{props.category.title}</div>
                {props.category.description}
            </div>
            </NavLink>
            <div className={styles.mobile_info}>
                <div className={styles.mobile_info_firstline}>
                    <div className={styles.mobile_info_title}>Тем:</div>{props.category.count_topics}
                    <div className={styles.mobile_info_title}>Сообщений:</div>{props.category.count_messages}
                </div>
                <div className={styles.mobile_info_title}>Последняя тема:</div>
                <div className={styles.mobile_info_secondline}>
                    
                    <div>
                        <div className={styles.mobile_avatar}>
                            <Useravatar img={props?.category?.last_topic_avatar}/>
                        </div>
                        <div className={styles.mobile_title}>
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

export default CategoryMobile