import styles from './LoginForm.module.css'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form';
import { Redirect } from 'react-router';
import {authAPI} from '../../../api/api'

const onSubmit = (props) => async values => {
    const data = {
        "field":values['field'],
        "password":values['password']
    }
    const response = await authAPI.login(data)
    if(response?.data?.resultCode == 0) {
        for(let key in values) {
            values[key] = undefined
        }
        props.app.getUser()
        return { [FORM_ERROR]: [<div><div className={styles.form_success}>Вы успешно авторизовались</div><Redirect to={"/"}/></div>]}
    } else if(response?.data?.resultCode == 2) {
        return {[FORM_ERROR]: [<div className={styles.form_error}>{response?.data?.message}</div>,true]}
    } else {
        return {[FORM_ERROR]: [<div className={styles.form_error}>{response?.data?.message}</div>,null]}
    }

}

const required = value => (value ? undefined : '* Поле должно быть заполнено')
const minValue = min => value => (value.length >= min ? undefined : `* Поле должно содержать не меньше ${min} символов`)
const maxValue = max => value => (value.length <= max ? undefined : `* Поле должно содержать не более ${max} символов`)
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)

const RegisterFormDesktop = (props) => {
    return (
        <div className={styles.pc_form}>
            <Form
                onSubmit={onSubmit(props)}
                render={({ submitError,handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>

                        <Field name="field" validate={composeValidators(required, minValue(5), maxValue(30))}>
                            {({ input, meta }) => (
                                <div>
                                    <div className={styles.pc_title}>Логин или email:</div>
                                    <input {...input} className={meta.error && meta.touched && styles.error || submitError && submitError[1] && styles.error} type="text" placeholder="Введите логин или email" ></input>
                                    {meta.error && meta.touched && <div className={styles.error_message}>{meta.error}</div>}
                                </div>
                            )}
                        </Field>
                        <Field name="password" validate={composeValidators(required, minValue(5), maxValue(20))}>
                            {({ input, meta }) => (
                                <div>
                                    <div className={styles.pc_title}>Пароль:</div>
                                    <input {...input} className={meta.error && meta.touched && styles.error} type="password" placeholder="Введите пароль" ></input>
                                    {meta.error && meta.touched && <div className={styles.error_message}>{meta.error}</div>}
                                </div>
                            )}
                        </Field>
                        <button className={styles.button} type="submit" disabled={submitting}>Войти</button>
                        {submitError && submitError[0]}
                    </form>
                )}
            />


        </div>
    )
}

export default RegisterFormDesktop