import styles from './Register.module.css'
import {RegisterFormDesktop} from './../Forms/Register'

const RegisterDesktop = (props) => {
    return (
        <div className={styles.pc_wrapper}>
            <div className={styles.title}>Создание нового аккаунта</div>
            <div className={styles.pc_second_wrapper}>
                <div className={styles.left}>
                    <RegisterFormDesktop/>
                </div>
                <div className={styles.right}>
                    123
            </div>
            </div>
        </div>
    )
}

export default RegisterDesktop