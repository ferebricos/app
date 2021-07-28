import { db } from "../../config.js";
import { rds } from '../../config.js'
import sendAnswer from "../utils/sendAnswer.js";
import bcrypt from 'bcrypt'
import hashGenerator from './../utils/hashGenerator.js'
import ErrorAPI from '../utils/errorApi.js'
import baseWrapper from './baseController.js'
import queries from './queries.js'
import rules from './rules.js'

const register = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.auth.register.getOneUsername, [req.body.login])
        if (rows.length === 0) {
            const { rows } = await db.query(queries.auth.register.getOneEmail, [req.body.email])
            if (rows.length === 0) {
                const generated = { password: bcrypt.hashSync(req.body.password, 8), emailToken: hashGenerator('email', req.body.email) }
                await db.query('BEGIN')
                const uuid = await db.query(queries.auth.register.insertUser, [req.body.login, req.body.email, generated.password])
                await db.query(queries.auth.register.insertEmailToken, [uuid.rows[0].id, 1, generated.emailToken])
                await db.query('COMMIT')
                sendAnswer(res, 200, 0, "Пользователь успешно зарегистрирован")
            } else {
                next(ErrorAPI.badRequest(3, "Пользователь с таким email уже зарегистрирован"))
            }
        } else {
            next(ErrorAPI.badRequest(2, "Указанный адрес профиля уже занят"))
        }
    } catch (e) {
        console.log(e)
        await db.query('ROLLBACK')
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const login = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.auth.login.getOne, [req.body.field])
        if (rows.length === 0) {
            next(ErrorAPI.badRequest(2, "Такого пользователя не удалось найти"))
        } else {
            const { id, password, role, email } = rows[0]
            if (bcrypt.compareSync(req.body.password, password)) {
                if (role == 1) {
                    sendAnswer(res, 200, 4, "Вы ещё не подтвердили свой аккаунт")
                } else {
                    let sessionCreateSuccess = false
                    while (!sessionCreateSuccess) {
                        let sid = hashGenerator('session', req.body.field)
                        const message = await rds.get('session:' + sid)
                        if (message === null) {
                            rds.set('session:' + sid, id, 'EX', 60 * 60 * 24 * 180)
                            sessionCreateSuccess = true
                            res.cookie('ses', sid, {
                                maxAge: 180 * 24 * 60 * 60 * 1000,
                                httpOnly: true
                            })
                        }
                    }
                    sendAnswer(res, 200, 0, "Вы успешно авторизировались")
                }
            } else {
                next(ErrorAPI.badRequest(3, "Вы ввели неверные данные"))
            }

        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const logout = async (req, res, next) => {
    try {
        const se = await rds.del('session:' + req.cookies.ses)
        if (se >= 1) {
            res.cookie('ses', null, {
                maxAge: 0,
                httpOnly: true
            })
            sendAnswer(res, 200, 0, "Вы успешно вышли с аккаунта")
        } else {
            next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const create_token = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.auth.create_token.getOneEmail, [req.body.email])
        if (rows.length === 0) {
            next(ErrorAPI.badRequest(1, "Такого пользователя не удалось найти"))
        } else {
            const { id, role, email } = rows[0]
            switch (parseInt(req.body.type)) {
                case 1:
                    if (role == 1) {
                        await db.query('BEGIN')
                        await db.query(queries.auth.create_token.deleteToken, [id, 1])
                        await db.query(queries.auth.create_token.insertToken, [id, 1, hashGenerator('email', email)])
                        await db.query('COMMIT')
                        sendAnswer(res, 200, 0, "Токен успешно создан")
                    } else {
                        next(ErrorAPI.badRequest(2, "Этот email уже подтвержден"))
                    }
                    break
                case 2:
                    await db.query('BEGIN')
                    await db.query(queries.auth.create_token.deleteToken, [id, 2])
                    await db.query(queries.auth.create_token.insertToken, [id, 2, hashGenerator('password', email)])
                    await db.query('COMMIT')
                    sendAnswer(res, 200, 0, "Токен успешно создан")
                    break
                default:
                    next(ErrorAPI.internal(500, "Непредвиденная ошибка2"))
            }
        }
    } catch (e) {
        await db.query('ROLLBACK')
        console.log('tyt')
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const verify_email = async (req, res, next) => {
    try {
        console.log(req.params)
            const { rows } = await db.query(queries.auth.verify_email.getOneUser, [req.body.token])
            if (rows.length === 0) {
                next(ErrorAPI.badRequest(2, "Неверный адрес подтверждения"))
            } else {
                const uuid = rows[0].user_id
                await db.query('BEGIN')
                await db.query(queries.auth.verify_email.updateUser, [uuid])
                await db.query(queries.auth.verify_email.deleteToken, [uuid])
                await db.query('COMMIT')
                sendAnswer(res, 200, 0, "Email успешно подтверждён")
            }
    } catch (e) {
        await db.query('ROLLBACK')
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const reset_password = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.auth.reset_password.getOneUser, [req.body.token])
        if (rows.length === 0) {
            next(ErrorAPI.badRequest(2, "Неверный токен"))
        } else {
            const { email, user_id } = rows[0]
            await db.query('BEGIN')
            await db.query(queries.auth.reset_password.updateUser, [bcrypt.hashSync(req.body.password, 8),user_id])
            await db.query(queries.auth.reset_password.deleteToken, [user_id])
            await db.query('COMMIT')
            sendAnswer(res, 200, 0, "Пароль успешно изменён")
        }
    } catch (e) {
        await db.query('ROLLBACK')
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}
const me = async (req, res, next) => {
    try {
        const { rows } = await db.query(queries.auth.me.getOne, [req.user])
        if (rows.length === 0) {
            next(ErrorAPI.badRequest(1, "Пользователь с таким id не найден"))
        } else {
            sendAnswer(res, 200, 0, rows)
        }
    } catch (e) {
        console.log(e)
        next(ErrorAPI.internal(500, "Непредвиденная ошибка сервера"))
    }
}

class authController {
    async registration(req, res, next) {
        try {
            baseWrapper(req, res, next, 'unsigned', rules.auth.registration, register)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async login(req, res, next) {
        try {
            baseWrapper(req, res, next, 'unsigned', rules.auth.login, login)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async logout(req, res, next) {
        try {
            baseWrapper(req, res, next, 'signed', null, logout)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async create_token(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', rules.auth.create_token, create_token)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async verify_email(req, res, next) {
        try {
            baseWrapper(req, res, next, 'unsigned', rules.auth.verify_email, verify_email)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async reset_password(req, res, next) {
        try {
            baseWrapper(req, res, next, 'any', rules.auth.reset_password, reset_password)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
    async me(req, res, next) {
        try {
            baseWrapper(req, res, next, 'signed', null, me)
        } catch (e) {
            console.log(e)
            next(ErrorAPI.internal(500, "Непредвиденная ошибка"))
        }
    }
}

export default new authController()