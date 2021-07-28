import styles from './TopicsItem.module.css'
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/ru';
import markdown from 'markdown-it'
import markdown_hljs from 'markdown-it-highlightjs'
import { NavLink } from 'react-router-dom';
import Icon from './../../Icons'
import Useravatar from '../../Useravatar';

const TopicsItemDesktop = (props) => {
    let tst = new Date(props.item.last_message_date)
    let md = new markdown()
    .use(markdown_hljs, {

    })
    .disable(['image', 'lheading'])
    return (
        <wrapper className={styles.pc_wrapper}>
            <div className={styles.first}>
                <div className={styles.first_left}>
                    <div className={styles.avatar}>
                        <Useravatar img={props?.item.author_avatar}/>
                    </div>
                    <div className={styles.author}>
                        <div>{props.item.author_username}</div>
                        <div>{'@'+props.item.author_login}</div>
                    </div>
                </div>
                <div className={styles.first_right}>
                    
                    <div className={styles.info}>
                        <div>{props.item.category_title}</div>
                        <div className={styles.date}>
                            <Moment date={props.item.date} fromNow />
                        </div>
                    </div>
                    <div className={styles.icon}><Icon icon={props.item.icon} size="16px"/></div>
                </div>
            </div>
            <NavLink to={'/topic/'+props.item.id}>
            <div className={styles.title}>{props.item.title}</div>
            <div className={styles.text}><div className={styles.pc_message}
                        dangerouslySetInnerHTML={{
                            __html: md.render(props.item.main_message_body || '')
                        }}></div></div>
            </NavLink>
            <div className={styles.last}>
                <div className={styles.last_left}>Сообщений: {props.item.count_messages}</div>
                <div className={styles.last_right}>Последнее сообщение: <Moment date={props.item.last_message_date} fromNow /></div>
            </div>
        </wrapper>
    )
}

export default TopicsItemDesktop