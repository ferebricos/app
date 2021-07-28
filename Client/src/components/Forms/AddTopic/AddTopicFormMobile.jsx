import styles from './AddTopicForm.module.css'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FORM_ERROR } from 'final-form';
import { forumAPI } from '../../../api/api'
import { FieldArray } from 'react-final-form-arrays'
import Editor from './Editor'

const onSubmit = (props) => async values => {
    let att = []
    if(values.attachments){
        att = values.attachments.map((e)=>{return e.link})
    }
    const data = {
        "category": values['category'],
        "title": values['title'],
        "message": values['editor'],
        "attachments": att
    }
    const response = await forumAPI.addTopic(data)
    if (response?.data?.resultCode == 0) {
        for (let key in values) {
            values[key] = undefined
        }
        return { [FORM_ERROR]: [<div className={styles.form_success}>Тема успешно создана</div>] }
    } else {
        return { [FORM_ERROR]: [<div className={styles.form_error}>{response?.data?.message}</div>, null, null] }
    }
}

const required = value => (value ? undefined : '* Поле должно быть заполнено')

const minValue = min => value => (value.length >= min ? undefined : `* Поле должно содержать не меньше ${min} символов`)
const maxValue = max => value => (value.length <= max ? undefined : `* Поле должно содержать не более ${max} символов`)
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)

const vall = (values,push) => {
    if(values?.attachments?.length > 2) {
    } else {
        push('attachments', undefined)
    }
}

const AddTopicFormMobile = (props) => {

    const list = props?.categories
        .map(e => {
            return (<option value={e.id}>{e.title}</option>)
        })

    return (
        <div className={styles.mobile_form}>
            <div className={styles.pc_title}>
                            Создание новой темы</div>
            <Form
                onSubmit={onSubmit(props)}
                mutators={{
                    ...arrayMutators
                }}

                render={({ submitError, handleSubmit, form: {
                    mutators: { push, pop }
                }, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        
                                <Field name="category" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <select {...input} className={meta.error && meta.touched && styles.error}>
                                            <option hidden value='0'>Выберите раздел</option>
                                            {list}
                                        </select>
                                        {meta.error && meta.touched && <div className={styles.error_message}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        <Field name="title" validate={composeValidators(required, minValue(5), maxValue(100))}>
                            {({ input, meta }) => (
                                <div>
                                    <div className={styles.mobile_label}>Название темы</div>
                                    <input {...input} className={meta.error && meta.touched && styles.error || submitError && submitError[1] && styles.error} type="text" placeholder="Введите название темы" ></input>
                                    {meta.error && meta.touched && <div className={styles.error_message}>{meta.error}</div>}
                                </div>
                            )}
                        </Field>
                        <Editor value={values['editor']} />
                        <div className={styles.mobile_label}>Прикрепленные материалы</div>
                        <FieldArray name="attachments">
                            {({ fields, meta }) =>
                                fields.map((name, index) => (
                                    <div key={name}>
                                        <div className={styles.mobile_attachment}>
                                        <Field
                                            name={`${name}.link`}
                                            component="input"
                                            placeholder="Вставьте ссылку на файл или изображение"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fields.remove(index)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Удалить
                                        </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </FieldArray>
                        <button
                            className={styles.button}
                            type="button"
                            onClick={() => vall(values,push)}
                        >
                            Добавить новый материал
                        </button>
                        <div>
                        <button className={styles.button} type="submit" disabled={submitting}>Создать новую тему</button>
                        {submitError && submitError[0]}
                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default AddTopicFormMobile