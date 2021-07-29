const sendAnswer = (res,status,resultCode,message,info) => {
    res.status(status).send({
        resultCode,
        message,
        info
    })
}

export default sendAnswer