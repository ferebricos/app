import styles from './Login.module.css'
import {LoginFormMobile} from './../Forms/Login'

const RegisterMobile = (props) => {
    return (

        <div className={styles.mobile_wrapper}>
            <div className={styles.mobile_title}>Создание нового аккаунта</div>
                <div className={styles.up}>
                    <LoginFormMobile app={props.app}/>
                </div>
                <div className={styles.down}>
                    
            </div>
        </div>
    )
}

export default RegisterMobile