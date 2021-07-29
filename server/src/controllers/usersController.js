import { db } from "../../config.js";
import { rds } from '../../config.js'
import sendAnswer from "../utils/sendAnswer.js";
import bcrypt from 'bcrypt'
import hashGenerator from './../utils/hashGenerator.js'
import ErrorAPI from '../utils/errorApi.js'
import baseWrapper from './baseController.js'
import queries from './queries.js'
import rules from './rules.js'


const me = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.users.me.getOne, [req.user])
        if (rows.length === 0) {
            next(ErrorAPI.badRequest(400, "Пользователь с таким id не найден"))
        } else {
            sendAnswer(res, 200, 0, rows)
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const getone = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.users.getone.getOne, [req.params.id])
        if (rows.length === 0) {
            next(ErrorAPI.badRequest(400, "Пользователь с таким id не найден"))
        } else {
            sendAnswer(res, 200, 0, rows[0])
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const gettop = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.users.get_users_top.getTop)
        if (rows.length === 0) {
            next(ErrorAPI.badRequest(400, "Пользователи не найдены"))
        } else {
            sendAnswer(res, 200, 0, rows)
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const getlist = async (req, res, next) => {
    try {
        if (parseInt(req.params.page) > 0) {
            const { rows } = await db.query(queries.users.getlist.getlist, [3, req.params.page * 3 - 3])
            if (rows.length === 0) {
                next(ErrorAPI.badRequest(400, "Вы запросили несуществующую страницу"))
            } else {
                sendAnswer(res, 200, 0, rows)
            }
        } else {
            const { rows } = await db.query(queries.users.getlist.getlist, [3,0])
            if (rows.length === 0) {
                next(ErrorAPI.badRequest(400, "Вы запросили несуществующую страницу"))
            } else {
                sendAnswer(res, 200, 0, rows)
            }
        }

    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}


class usersController {
    async me(req, res, next) {
        try {
            baseWrapper(req, res, next, 'signed', null, me)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async getone(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', null, getone)
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
    async getlist(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', null, getlist)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
}

export default new usersController()