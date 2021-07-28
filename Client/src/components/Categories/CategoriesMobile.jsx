import styles from './Categories.module.css'
import {CategoryMobile} from './Category'

const CategoriesDesktop = (props) => {
    const menu = props?.categories
    .map(e => {
        return (<CategoryMobile category={e}/>)
    })
    return (
        <div className={styles.mobile_wrapper}>{menu}</div>
    )
}

export default CategoriesDesktop