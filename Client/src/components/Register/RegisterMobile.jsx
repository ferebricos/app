import styles from './Register.module.css'
import {RegisterFormMobile} from './../Forms/Register'

const RegisterMobile = (props) => {
    return (

        <div className={styles.mobile_wrapper}>
            <div className={styles.mobile_title}>Создание нового аккаунта</div>
                <div className={styles.up}>
                    <RegisterFormMobile/>
                </div>
                <div className={styles.down}>
                    123
            </div>
        </div>
    )
}

export default RegisterMobile