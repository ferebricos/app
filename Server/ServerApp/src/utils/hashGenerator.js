import crypto from 'crypto'
const generator = (type, uniq) => {
    switch (type) {
        case "email":
            return '1' +
                '-' + crypto.randomBytes(8).toString('hex') +
                '-' + crypto.createHash('sha256').update(uniq + crypto.randomBytes(2)).digest('hex') +
                '-' + crypto.randomBytes(8).toString('hex')
        case "password":
            return '2' +
                '-' + crypto.randomBytes(8).toString('hex') +
                '-' + crypto.createHash('sha256').update(uniq + crypto.randomBytes(2)).digest('hex') +
                '-' + crypto.randomBytes(8).toString('hex')
        case "session":
            return crypto.randomBytes(4).toString('hex') +
                '-' + crypto.createHash('sha256').update(uniq + crypto.randomBytes(2)).digest('hex') +
                '-' + crypto.createHash('sha256').update(Date.now() + crypto.randomBytes(2)).digest('hex') +
                '-' + crypto.randomBytes(4).toString('hex')
        default:
            console.log("Sorry, we are out of " + type + ".");
    }
}
export default generator