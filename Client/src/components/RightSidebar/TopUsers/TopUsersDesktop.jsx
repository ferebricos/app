import Useravatar from '../../Useravatar'
import styles from './TopUsers.module.css'

const TopUsersDesktop = (props) => {
    const tst = props?.topusers.map((e, index) => {
        return (
            <div className={styles.pc_item}>
                <div className={styles.pc_number}>{index+1}</div>
                <div className={styles.pc_info}>
                    <div>{e.username}</div>
                    <div>Сообщений: {e.count_messages}</div>
                </div>
                <div className={styles.pc_ava}>
                    <Useravatar img={e.avatar}/>
                </div>
            </div>)
    })
    return (
        <div className={styles.topusers}>
            <div className={styles.title}>Самые активные пользователи</div>
            {tst}
        </div>
    )
}

export default TopUsersDesktop