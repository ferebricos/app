import ErrorAPI from "../utils/errorApi.js"
import Validator from 'validatorjs'

Validator.register('custom_url', function (value, requirement, attribute) { // requirement parameter defaults to null
    try {
        let tarray = value.flat(Infinity)
        let flag = true
        if(tarray.length > 10) return false
        tarray.map(x => {
            if (!String(x).match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) flag = false
        })
        // .match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
        return flag
    } catch (error) {
        return false
    }

}, 'Get flat array and check if urls, urls limit 3.');


const authWrapper = (req, res, next, flag, rules, callback) => {
    switch (flag) {
        case "signed":
            if (req.user) {
                validationWrapper(req, res, next, rules, callback)
            } else {
                next(ErrorAPI.badRequest(400, "Вы не авторизованы"))
            }
            break
        case "unsigned":
            if (!req.user) {
                validationWrapper(req, res, next, rules, callback)
            } else {
                next(ErrorAPI.badRequest(400, "Вы уже авторизованы"))
            }
            break
        case "any":
            validationWrapper(req, res, next, rules, callback)
            break
        default:
            console.log("Sorry, we are out of " + flag + ".")
            next(ErrorAPI.badRequest(500, "Непредвиденная ошибка сервера"))
    }
}

const validationWrapper = (req, res, next, rules, callback) => {
    try {
        if (rules) {
            const validation = new Validator(req.body, rules)
            if (validation.passes()) {
                callback(req, res, next)
            } else {
                next(ErrorAPI.badRequest(1, "Переданы неккоректные данные"))
            }
        }
        else {
            callback(req, res, next)
        }
    }
    catch (e) {
        console.log(e)
        next(ErrorAPI.badRequest(500, "Непредвиденная ошибка сервера"))
    }

}

const baseWrapper = (req, res, next, auth, rules, callback) => {
    authWrapper(req, res, next, auth, rules, callback)
}

export default baseWrapper