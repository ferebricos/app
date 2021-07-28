import styles from './Categories.module.css'
import {CategoryDesktop} from './Category'

const CategoriesDesktop = (props) => {
    const menu = props?.categories
    .map(e => {
        return (<CategoryDesktop category={e}/>)
    })
    return (
        <div className={styles.pc_wrapper}>{menu}</div>
    )
}

export default CategoriesDesktop