class ErrorAPI extends Error {
    constructor(status,resultCode,message) {
        super()
        this.status = status
        this.resultCode = resultCode
        this.message = message
    }
    static badRequest(resultCode,message='Неверный запрос') {
        return new ErrorAPI(200,resultCode,message)
    }
    static internal(resultCode,message='Непредвиденная ошибка') {
        return new ErrorAPI(200,resultCode,message)
    }
    static forbidden(resultCode,message) {
        return new ErrorAPI(200,resultCode,message)
    }

}

export default ErrorAPI