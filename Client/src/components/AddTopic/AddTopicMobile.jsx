import styles from './AddTopic.module.css'
import {AddTopicFormMobile} from './../Forms/AddTopic'

const AddTopicMobile = (props) => {
    return (
        <div className={styles.mobile_wrapper}>
        <AddTopicFormMobile categories={props.categories}/>
        </div>
    )
}

export default AddTopicMobile