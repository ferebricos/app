import styles from './Verify.module.css'


const VerifyMobile = (props) => {
    return (
        <div className={styles.mobile_wrapper}>
            <div className={styles.mobile_title}>Верификация аккаунта</div>
                <div className={styles.up}>
                    {props.message}
                </div>
                <div className={styles.down}>
                    
            </div>
        </div>
    )
}

export default VerifyMobile