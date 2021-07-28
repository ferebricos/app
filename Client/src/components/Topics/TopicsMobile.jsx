import styles from './Topics.module.css'
import {CategoryMobile} from './../Categories/Category'
import {TopicsItemMobile} from './TopicsItem'
import {PaginatorMobile} from './../Paginator'

const TopicsMobile= (props) => {
    const list = props?.topics
    .map(e => {
        return (<TopicsItemMobile category_id={props.category.id} item={e} />)
    })
    return (
        <div className={styles.mobile_wrapper}>
        <div className={styles.mobile_category_wrapper}>
            <CategoryMobile category={props.category}/>
        </div>
        <div className={styles.mobile_items_wrapper}>
            {list}
            <PaginatorMobile callback={props.callback} link={props.link} info={props.info} />
        </div>
    </div>
    )
}

export default TopicsMobile