import styles from './Paginator.module.css'
import { NavLink } from "react-router-dom";

const PaginatorMobile = (props) => {
    let onPageChange = props?.callback
    let countButtons = Math.ceil(props?.info?.totalCount / props?.info?.pageSize) || 1
    let currentPage = props?.info?.currentPage
    let buttons = [];

    if (currentPage == 1 && countButtons == 1) {
        buttons.push(
            <div>
            </div>
        )
    } else if (currentPage == 1 && countButtons != 1) {
        buttons.push(
            <div className={styles.mobile_wrapper}>
                <div className={styles.page}>{currentPage}</div>
                <NavLink to={props.link + props.info.id + '/' + (parseInt(currentPage) + 1)}><button className={styles.next}>Следующая страница</button></NavLink>
            </div>
        )
    } else if (currentPage == countButtons) {
        buttons.push(
            <div className={styles.mobile_wrapper}>
                <NavLink to={props.link + props.info.id + '/' + (parseInt(currentPage) - 1)}><button className={styles.prev} >Предыдущая страница</button></NavLink>
                <div className={styles.page}>{currentPage}</div>
            </div>
        )

    } else {
        buttons.push(
            <div className={styles.mobile_wrapper}>
                <NavLink to={props.link + props.info.id + '/' + (parseInt(currentPage) - 1)}><button className={styles.prev}>Предыдущая страница</button></NavLink>
                <div className={styles.page}>{currentPage}</div>
                <NavLink to={props.link + props.info.id + '/' + (parseInt(currentPage) + 1)}><button className={styles.next}>Следующая страница</button></NavLink>
            </div>
        )

    }


    return (
        <div >
            {buttons}
        </div>
    )
}

export default PaginatorMobile