import { db } from "../../config.js";
import { rds } from '../../config.js'
import sendAnswer from "../utils/sendAnswer.js";
import bcrypt from 'bcrypt'
import hashGenerator from './../utils/hashGenerator.js'
import ErrorAPI from '../utils/errorApi.js'
import baseWrapper from './baseController.js'
import queries from './queries.js'
import rules from './rules.js'



const get_categories = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.forum.get_categories.getAll)
        if (rows.length === 0) {
            next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
        } else {
            sendAnswer(res, 200, 0, rows)
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const get_category = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.forum.get_category.getOne, [req.params.id])
        if (rows.length === 0) {
            next(ErrorAPI.internal(1, "Категория с таким id не найдена"))
        } else {
            sendAnswer(res, 200, 0, rows)
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const get_topics_list= async (req, res, next) => {
    try {
        if (parseInt(req.params.page) > 0) {
            const { rows } = await db.query(queries.forum.get_topics_list.get_t_list, [ req.params.category,10, req.params.page * 10 - 10])
            const result = await db.query('SELECT count_topics FROM forum_categories WHERE id = $1',[req.params.category])
            if (rows.length === 0) {
                next(ErrorAPI.badRequest(1, "Вы запросили несуществующую страницу"))
            } else {
                sendAnswer(res, 200, 0, rows,{totalCount:result.rows[0].count_topics})
            }
        } else {
            const { rows } = await db.query(queries.forum.get_topics_list.getlist, [req.params.category,10,0])
            const result = await db.query('SELECT count_topics FROM forum_categories WHERE id = $1',[req.params.category])
            if (rows.length === 0) {
                next(ErrorAPI.badRequest(1, "Вы запросили несуществующую страницу"))
            } else {
                sendAnswer(res, 200, 0, rows,{totalCount:result.rows[0].count_topics})
            }
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const get_topics_top = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.forum.get_topics_top.getTop)
        if (rows.length === 0) {
            next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
        } else {
            sendAnswer(res, 200, 0, rows,{totalCount:rows.length})
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const get_topic = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.forum.get_topic.get_tpc, [req.params.id])
        if (rows.length === 0) {
            next(ErrorAPI.internal(1, "Тема с таким id не найдена"))
        } else {
            sendAnswer(res, 200, 0, rows)
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}

const get_messages_list= async (req, res, next) => {
    try {
        if (parseInt(req.params.page) > 0) {
            const { rows } = await db.query(queries.forum.get_messages_list.get_m_l, [ req.params.topic,10, req.params.page * 10 - 10])
            const result = await db.query('SELECT count_messages FROM forum_topic WHERE id = $1',[req.params.topic])
            if (rows.length === 0) {
                next(ErrorAPI.badRequest(1, "Вы запросили несуществующую страницу"))
            } else {
                sendAnswer(res, 200, 0, rows,{totalCount:result.rows[0].count_messages-1})
            }
        } else {
            const { rows } = await db.query(queries.forum.get_messages_list.getlist, [req.params.topic,10,0])
            const result = await db.query('SELECT count_messages FROM forum_topic WHERE id = $1',[req.params.topic])
            if (rows.length === 0) {
                next(ErrorAPI.badRequest(1, "Вы запросили несуществующую страницу"))
            } else {
                sendAnswer(res, 200, 0, rows,{totalCount:result.rows[0].count_messages-1})
            }
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const create_topic = async (req, res, next) => {
    try {
        console.log(req.user)
        await db.query('BEGIN')
        let { rows } = await db.query(queries.forum.create_topic.insertTopic, [req.body.category, req.user, req.body.title])
        const topic_id = rows[0].id
        let result = await db.query(queries.forum.create_topic.insertMessage, [topic_id, req.user, req.body.message,{'attachments':req.body.attachments?req.body.attachments.flat(Infinity):[]}])
        const message_id = result.rows[0].id
        await db.query(queries.forum.create_topic.updateTopic, [message_id, topic_id])
        await db.query('COMMIT')
        sendAnswer(res,200,0,'Тема успешно создана')
    } catch (e) {
        await db.query('ROLLBACK')
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const add_message = async (req, res, next) => {
    try {
        let { rows } = await db.query(queries.forum.add_message.addOne,[req.body.topic,req.user,req.body.message,{'attachments':req.body.attachments?req.body.attachments.flat(Infinity):[]}])
        sendAnswer(res, 200, 0, "Сообщение успешно добавлено",rows)
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const gettop = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.forum.get_users_top.getTop)
        if (rows.length === 0) {
            next(ErrorAPI.badRequest(500, "Непредвиденная ошибка сервера"))
        } else {
            sendAnswer(res, 200, 0, rows)
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}


class forumController {
    async get_categories(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', null, get_categories)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async get_category(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', null, get_category)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async create_topic(req, res, next) {
        try {
            baseWrapper(req, res, next, 'signed', rules.forum.create_topic, create_topic)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async get_topics_list(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', null, get_topics_list)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async get_topics_top(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', null, get_topics_top)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async add_message(req, res, next) {
        try {
            baseWrapper(req, res, next, 'signed', rules.forum.add_message, add_message)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async get_topic(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', null, get_topic)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async get_messages_list(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', null, get_messages_list)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async gettop(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', null, gettop)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
}

export default new forumController()