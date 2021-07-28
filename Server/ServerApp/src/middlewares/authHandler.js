import { rds } from '../../config.js'
import ErrorAPI from './../utils/errorApi.js'

const Handler = async (req, res, next) => {
    try {
        if (req.cookies.ses !== null) {
            console.log(req.cookies.ses)
            const value = await rds.get('session:' + req.cookies.ses)
            if (value) {
                req.user = value
                next()
            } else {
                req.user = null
                next()
            }
        } else {
            req.user = null
            next()
        }
    } catch (error) {
        req.user = null
        next(ErrorAPI.internal(500,"Ошибка сервера"))
    }
}

export default Handler