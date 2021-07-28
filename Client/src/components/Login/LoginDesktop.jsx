import styles from './Login.module.css'
import {LoginFormDesktop} from './../Forms/Login'

const LoginDesktop = (props) => {
    return (
        <div className={styles.pc_wrapper}>
            <div className={styles.title}>Вход в аккаунт</div>
            <div className={styles.pc_second_wrapper}>
                <div className={styles.left}>
                    <LoginFormDesktop app={props.app}/>
                </div>
                <div className={styles.right}>
                    
            </div>
            </div>
        </div>
    )
}

export default LoginDesktop