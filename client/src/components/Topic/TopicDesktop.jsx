import styles from './Topic.module.css'
import {MessageDesktop} from './Message'
import {AddMessageFormDesktop} from './../Forms/AddMessage'
import {PaginatorDesktop} from './../Paginator'

const TopicDesktop = (props) => {
    const messages = props?.topic?.messages
    .map(e => {
        return (<MessageDesktop message={e}/>)
    })
    return (
        <div className={styles.pc_wrapper}>
            <MessageDesktop main={props.topic.topic}/>
            {messages}
            <PaginatorDesktop 
            callback={props.paginator_callback}
            link={props.link}
            info={props.info} />
            {props.app.user.isAuth && 
            <div className={styles.pc_editor}>
                <AddMessageFormDesktop callback={props.callback} topic_id={props.topic.info.id} user={{username:props.app.user.username,login:props.app.user.id,avatar:props.app.user.useravatar}}/>
            </div>
            }
        </div>
    )
}

export default TopicDesktop