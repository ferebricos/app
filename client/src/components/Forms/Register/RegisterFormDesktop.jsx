import styles from './RegisterForm.module.css'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form';
import {authAPI} from './../../../api/api'

const onSubmit = async values => {
    const data = {
        "login":values['login'],
        "email":values['email'],
        "password":values['password']
    }
    const response = await authAPI.register(data)
    if(response?.data?.resultCode == 0) {
        for(let key in values) {
            values[key] = undefined
        }
        return { [FORM_ERROR]: [<div className={styles.form_success}>Вы успешно зарегистрировались, обязательно перейдите в почтовый ящик, и подтвердите свой акканут, иначе вы не сможете войти</div>,null,null]}
    } else if(response?.data?.resultCode == 2) {
        return {[FORM_ERROR]: [<div className={styles.form_error}>{response?.data?.message}</div>,true,null]}
    } else if(response?.data?.resultCode == 3) {
        return {[FORM_ERROR]: [<div className={styles.form_error}>{response?.data?.message}</div>,null,true]}
    } else {
        return {[FORM_ERROR]: [<div className={styles.form_error}>{response?.data?.message}</div>,null,null]}
    }

}

const required = value => (value ? undefined : '* Поле должно быть заполнено')
const minValue = min => value => (value.length >= min ? undefined : `* Поле должно содержать не меньше ${min} символов`)
const maxValue = max => value => (value.length <= max ? undefined : `* Поле должно содержать не более ${max} символов`)
const isLogin  = value => (/^[A-Za-z0-9]+[a-zA-Z0-9_]+[A-Za-z0-9]+$/.test(value) ? undefined : `* Поле может содержать латинские символы, арабские цифры, нижнее подчеркивание (не в начале/конце)`)
const isEmail = value => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? undefined : `* Введите корректный email`)
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)

const RegisterFormDesktop = () => {
    return (
        <div className={styles.pc_form}>
            <Form
                onSubmit={onSubmit}
                validate={values => {
                    const errors = {};
                    if (values.confirm !== values.password) {
                      errors.confirm = `* Пароли должны совпадать`;
                    }
                    return errors;
                  }}
                render={({ submitError,handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>

                        <Field name="login" validate={composeValidators(required, minValue(5), maxValue(30),isLogin)}>
                            {({ input, meta }) => (
                                <div>
                                    <div className={styles.pc_title}>Адрес вашего профиля:</div>
                                    <input {...input} className={meta.error && meta.touched && styles.error || submitError && submitError[1] && styles.error} type="text" placeholder="Введите логин" ></input>
                                    {meta.error && meta.touched && <div className={styles.error_message}>{meta.error}</div>}
                                </div>
                            )}
                        </Field>
                        <div className={styles.address}>ferebrico.host/user/{values['login']}</div>
                        <Field name="email" validate={composeValidators(required, minValue(5), maxValue(30),isEmail)}>
                            {({ input, meta }) => (
                                <div>
                                    <div className={styles.pc_title}>E-mail</div>
                                    <input {...input} className={meta.error && meta.touched && styles.error || submitError && submitError[2] && styles.error} type="text" placeholder="Введите email" ></input>
                                    {meta.error && meta.touched && <div className={styles.error_message}>{meta.error}</div>}
                                </div>
                            )}
                        </Field>
                        <Field name="password"  validate={composeValidators(required, minValue(5), maxValue(20))}>
                            {({ input, meta }) => (
                                <div>
                                    <div className={styles.pc_title}>Пароль:</div>
                                    <input {...input} className={meta.error && meta.touched && styles.error} type="password" placeholder="Введите пароль" ></input>
                                    {meta.error && meta.touched && <div className={styles.error_message}>{meta.error}</div>}
                                </div>
                            )}
                        </Field>
                        <Field name="confirm" validate={composeValidators(required, minValue(5), maxValue(20))}>
                            {({ input, meta }) => (
                                <div>
                                    <div className={styles.pc_title}>Повторно пароль:</div>
                                    <input {...input} className={meta.error && meta.touched && styles.error} type="password" placeholder="Повторите пароль" ></input>
                                    {meta.error && meta.touched && <div className={styles.error_message}>{meta.error}</div>}
                                </div>
                            )}
                        </Field>

                        <button className={styles.button} type="submit" disabled={submitting}>Зарегистрироваться</button>
                        {submitError && submitError[0]}

                    </form>
                )}
            />


        </div>
    )
}

export default RegisterFormDesktop