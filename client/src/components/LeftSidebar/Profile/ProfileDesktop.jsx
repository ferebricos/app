import { NavLink } from 'react-router-dom'
import Useravatar from '../../Useravatar'
import styles from './Profile.module.css'

const ProfileDestkop = (props) => {
    if (!props?.app?.initialized) {
        //  Пока не пришли данные о пользователе
        return (
            <ProfileDesktopNoInitialized/>
        )
    }
    if (props?.app?.user?.isAuth == true) {
        //  Если пользователь авторизован
        return (
            <ProfileDesktopAuth logout={props.logout} app={props.app}/>
        )
        
    } else {
        //  Если пользователь не авторизован
        return (
            <ProfileDesktopNoAuth/>
        )
    }
}

const ProfileDesktopNoAuth = (props) => {
    return (
        <div className={styles.profile}>
            <div className={styles.welcome}>
                Добро пожаловать на сайт
            </div>
            <div className={styles.info}>Регистрируйтесь и обсуждайте</div>
            <NavLink to={'/register'}>
            <div className={styles.register}>Регистрация</div>
            </NavLink>
            <NavLink to={'/login'}>
            <div className={styles.signin}>Войти</div>
            </NavLink>
        </div>
    )
}

const ProfileDesktopNoInitialized= (props) => {
    return (
        <div className={styles.profile}>
            
        </div>
    )
}

const ProfileDesktopAuth = (props) => {
        return (
            <div className={styles.profile}>
                <div className={styles.up}>
                    <div className={styles.avatar}>
                        <Useravatar img={props?.app?.user?.useravatar}/>
                    </div>
                    <div className={styles.username}>
                        {props?.app?.user?.username}
                    </div>
                    <div className={styles.id}>
                        {'@'+props?.app?.user?.id}
                    </div>
                </div>
                <div className={styles.down}>
                    <button className={styles.logout} onClick={props.logout}>
                        Выйти с аккаунта
                    </button>
                </div>
            </div>
        )
}



export default ProfileDestkop

