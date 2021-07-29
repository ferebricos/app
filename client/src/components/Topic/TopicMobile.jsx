import styles from './Topic.module.css'
import {MessageMobile} from './Message'
import {AddMessageFormMobile} from './../Forms/AddMessage'
import {PaginatorMobile} from './../Paginator'

const TopicDesktop = (props) => {
    const messages = props?.topic?.messages
    .map(e => {
        return (<MessageMobile message={e}/>)
    })
    return (
        <div className={styles.mobile_wrapper}>
            <MessageMobile main={props.topic.topic}/>
            {messages}
            <PaginatorMobile 
            callback={props.paginator_callback}
            link={props.link}
            info={props.info} />
            {props.app.user.isAuth && 
            <div className={styles.mobile_editor}>
                <AddMessageFormMobile callback={props.callback} topic_id={props.topic.info.id} user={{username:props.app.user.username,login:props.app.user.id,avatar:props.app.user.useravatar}}/>
            </div>
            }
        </div>
    )
}

export default TopicDesktop