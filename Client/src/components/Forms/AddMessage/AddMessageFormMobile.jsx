import styles from './../AddTopic/AddTopicForm.module.css'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FORM_ERROR } from 'final-form';
import { FieldArray } from 'react-final-form-arrays'
import {forumAPI} from '../../../api/api'
import Editor from '../AddTopic/Editor'

const onSubmit = (props) => async values => {
    let att = []
    if(values.attachments){
        att = values.attachments.map((e)=>{return e?.link || ''})
    }
    const data = {
        "topic":props.topic_id,
        "message": values['editor'],
        "attachments": att
    }
    const response = await forumAPI.addMessage(data)
    if (response?.data?.resultCode === 0) {
        for (let key in values) {
            values[key] = undefined
        }
        let ret_data = {
            message_id:response.data.info[0].id,
            message_date:response.data.info[0].date,
            message_body:response.data.info[0].message,
            message_attachments:response.data.info[0].attachments,
            author_username:props.user.username,
            author_login:props.user.login,
            author_avatar:props.user.avatar,
        }
        props.callback(ret_data)
        return { [FORM_ERROR]: [<div className={styles.form_success}>Сообщение успешно добавлено</div>] }
    } else {
        return { [FORM_ERROR]: [<div className={styles.form_error}>{response?.data?.message}</div>, null, null] }
    }

}

const vall = (values,push) => {
    if(values?.attachments?.length > 2) {
    } else {
        push('attachments', undefined)
    }
}


const AddMessageFormMobile = (props) => {
    return (
        <div className={styles.mobile_form}>
            <Form
                onSubmit={onSubmit(props)}
                mutators={{
                    ...arrayMutators
                }}

                render={({ submitError, handleSubmit, form: {
                    mutators: { push, pop }
                }, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Editor value={values['editor']} />
                        <div className={styles.pc_label}>Прикрепленные материалы</div>
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
                        <button className={styles.button} type="submit" disabled={submitting}>Добавить сообщение</button>
                        {submitError && submitError[0]}
                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default AddMessageFormMobile