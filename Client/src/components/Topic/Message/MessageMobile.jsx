import styles from './Message.module.css'
import './hljs.css'
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/ru';
import markdown from 'markdown-it'
import markdown_hljs from 'markdown-it-highlightjs'
import Useravatar from '../../Useravatar';

const MessageDesktop = (props) => {
    let md = new markdown()
    .use(markdown_hljs, {

    })
    .disable(['image', 'lheading'])
    let attachments = []
    let isAttachments = false;
    if(props?.main) {
        if(props.main.main_message_attachments.attachments.length != 0) {
            isAttachments = true
            attachments = props.main.main_message_attachments.attachments.map(e => {
                return (<div>{e}</div>)
            })
        }
    }
    if(props?.message) {
        if(props.message.message_attachments.attachments.length != 0) {
            isAttachments = true
            attachments = props.message.message_attachments.attachments.map(e => {
                return (<div>{e}</div>)
            })
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.pc_info}>
                <div className={styles.pc_avatar}>
                {props?.main && <Useravatar img={props?.main.author_avatar}/>}
                {props?.message && <Useravatar img={props?.message.author_avatar}/>}
                </div>
                <div className={styles.pc_author}>
                    {props?.main && props?.main.author_username}
                    {props?.message && props?.message.author_username}
                    <span>
                        {props?.main && '@'+props?.main.author_login}
                        {props?.message && '@'+props?.message.author_login}
                    </span>
                </div>
            </div>
            {props?.main && <div className={styles.pc_title}>{props?.main.title}</div>}
            {props?.main && <div className={styles.pc_message}
                        dangerouslySetInnerHTML={{
                            __html: md.render(props?.main.main_message_body || '')
                        }}></div>}
            {props?.message && <div className={styles.pc_message}
                        dangerouslySetInnerHTML={{
                            __html: md.render(props?.message.message_body || '')
                        }}></div>}
            {isAttachments && <div>
                    <div className={styles.pc_attachments}>Прикреплённые материалы</div>
                    {attachments}
                </div>}
                <div className={styles.mobile_line}>
                
                    <div className={styles.mobile_date}>
                        {props?.main && <Moment date={props?.main.main_message_date} fromNow />}
                        {props?.message && <Moment date={props?.message.message_date} fromNow />}
                    </div>
                    <div className={styles.mobile_message_id}>
                        {props?.main && '#'+props?.main.main_message_id}
                        {props?.message && '#'+props?.message.message_id}
                    </div>
                </div>

        </div>
    )
}

export default MessageDesktop