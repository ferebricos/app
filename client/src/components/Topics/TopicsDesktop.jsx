import styles from './Topics.module.css'
import { CategoryDesktop } from './../Categories/Category'
import { TopicsItemDesktop } from './TopicsItem'
import { PaginatorDesktop } from './../Paginator'


const TopicsDesktop = (props) => {
    const list = props?.topics
        .map(e => {
            return (<TopicsItemDesktop category_id={props.category.id} item={e} />)
        })
    return (
        <div className={styles.pc_wrapper}>
            <div className={styles.pc_category_wrapper}>
                <CategoryDesktop category={props.category} />
            </div>
            <div className={styles.pc_items_wrapper}>
                {list}
            </div>
            <div className={styles.paginator}>
                
                <PaginatorDesktop  callback={props.callback} link={props.link} info={props.info} />
            </div>

        </div>
    )
}

export default TopicsDesktop