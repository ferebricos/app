import styles from './Searchbar.module.css'

const SearchbarDesktop = (props) => {
    return (
        <div className={styles.pc_wrapper}>
            <input placeholder="Поиск по сайту"></input>
        </div>
    )
}

export default SearchbarDesktop