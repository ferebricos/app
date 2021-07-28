import ErrorAPI from './../utils/errorApi.js'

const Handler = (err,req,res,next) => {
    if (err instanceof ErrorAPI) {
        return res.status(200).json({'resultCode':err.resultCode,'message':err.message})
    }
    return res.status(200).json({'resultCode':500,'message':'Непредвиденная ошибка сервера'})
}

export default Handler