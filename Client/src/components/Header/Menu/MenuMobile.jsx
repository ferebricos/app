import styles from './Menu.module.css'
import React, { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react'
import { NavLink } from 'react-router-dom';

const MenuMobile = (props) => {
    const menu = props?.app?.categories
    .map(e => {
        return (<NavLink to={'/category/'+e.id} activeClassName={styles.active_link}><li>{e.title}<span>{e.count_topics}</span></li></NavLink>)
    })
    const [isOpen, setOpen] = useState(false)
    const changeTheme = () => {
        if(props.app.theme == 'light') {
            props.setTheme('dark')
        } else {
            props.setTheme('light')
        }
    }
    return (
        <div>
            <div className={styles.mobile_burger}>
                <Hamburger toggled={isOpen} toggle={setOpen} size={24}
                    onToggle={toggled => {
                        if (toggled) {
                        } else {
                        }
                    }} />
            </div>
            {isOpen &&
                <div className={styles.menu}>
                    <div className={styles.title}>Навигация по сайту</div>
                    <ul>
                        <NavLink to={'/'} exact activeClassName={styles.active_link}><li>Главная страница</li></NavLink>
                        {menu}
                        {
                            props?.app?.user?.isAuth &&
                             <li>
                            <button className={styles.mobile_logout} onClick={props.logout}>
                                Выйти с аккаунта
                            </button>
                        </li>
                        }
                                                <li>
                             <button className={styles.mobile_theme} onClick={changeTheme}>Cменить тему</button>
                             </li>
                        
                    </ul>
                 </div>
            }

        </div>
    )
}

export default MenuMobile