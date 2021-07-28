import styles from './Editor.module.css'
import { Field } from 'react-final-form'
import markdown from 'markdown-it'
import markdown_hljs from 'markdown-it-highlightjs'


const required = value => (value ? undefined : '* Поле должно быть заполнено')
const minValue = min => value => (value.length >= min ? undefined : `* Поле должно содержать не меньше ${min} символов`)
const maxValue = max => value => (value.length <= max ? undefined : `* Поле должно содержать не более ${max} символов`)
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)


const Editor = (props) => {
    let md = new markdown()
        .use(markdown_hljs, {

        })
        .disable(['image', 'lheading'])
    return (
        <div>
        <Field name="editor" validate={composeValidators(required,minValue(50),maxValue(5000))}>
            {({ input, meta }) => (
                <div className={styles.pc_wrapper}>
                    <div className={styles.pc_label}>Сообщение:</div>
                    <div className={styles.textarea_wrapper}>
                    <textarea {...input} className={meta.error && meta.touched && styles.error} type="textarea" placeholder="Введите сообщение" ></textarea>
                    {meta.error && meta.touched && <div className={styles.error_message}>{meta.error}</div>}
                    </div>
                    <div className={styles.pc_label}>Предпросмотр сообщения:</div>
                    <div className={styles.preview}
                        dangerouslySetInnerHTML={{
                            __html: md.render(props.value || '')
                        }}></div>
                </div>
            )}
        </Field>
        
        </div>
    )
}

export default Editor