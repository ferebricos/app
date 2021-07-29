import styles from './AddTopic.module.css'
import {AddTopicFormDesktop} from './../Forms/AddTopic'

const AddTopicDesktop = (props) => {
    return (
        <div className={styles.pc_wrapper}>
             <AddTopicFormDesktop categories={props.categories}/>
        </div>
    )
}

export default AddTopicDesktop