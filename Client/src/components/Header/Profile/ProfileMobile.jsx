import { NavLink } from 'react-router-dom'
import Useravatar from '../../Useravatar'
import styles from './Profile.module.css'

const ProfileMobile = (props) => {
    if (!props?.app?.initialized) {
        //  Пока не пришли данные о пользователе
        return (
            <div className={styles.mobile_useravatar}></div>
        )
    }
    if (props?.app?.user?.isAuth == true) {
        //  Если пользовательно авторизован
        return (
            <div className={styles.mobile_wrapper}>
                <div className={styles.mobile_username}>
                    {props?.app?.user?.id}
                </div>
                <div className={styles.mobile_useravatar}>
                    <Useravatar img={props?.app?.user?.useravatar}/>
                </div>
            </div>
        )
    } else {
        //  Если пользовательно не авторизован
        return (
            <div className={styles.mobile_wrapper}>
                <NavLink to={'/login'}>
                <div className={styles.mobile_signin}>Войти</div>
                </NavLink>
                <NavLink to={'/register'}>
                <div className={styles.mobile_register}>Регистрация</div>
                </NavLink>
            </div>
        )
    }
}

export default ProfileMobile