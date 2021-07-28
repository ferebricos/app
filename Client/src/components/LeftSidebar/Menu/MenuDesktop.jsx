import styles from './Menu.module.css'
import {NavLink} from "react-router-dom";

const MenuDesktop = (props) => {
    const tst = props?.app?.categories
        .map(e => {
            return (
                <NavLink to={'/category/'+e.id} activeClassName={styles.active_link}><li>{e.title}<span>{e.count_topics}</span></li></NavLink>
                )
        })
    return (
        <div className={styles.menu}>
            <div className={styles.title}>Навигация по сайту</div>
            <ul>
                <NavLink to="/" exact activeClassName={styles.active_link}><li>Главная страница</li></NavLink>
                {tst}
            </ul>
        </div>
    )
}


export default MenuDesktop

