import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import config from './config.js'
import cors from 'cors'
import errorsHandler from './src/middlewares/errorsHandler.js'
import authHandler from './src/middlewares/authHandler.js'
import authRouter from "./src/routes/authRouter.js";
import usersRouter from "./src/routes/usersRouter.js";
import forumRouter from "./src/routes/forumRouter.js";
const app = express()

app.use(cors({origin: true, credentials: true}))
app.use(helmet())
app.use(express.urlencoded({ extended: true, }))
app.use(express.json())
app.use(cookieParser())
app.use(authHandler)
app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/forum", forumRouter)

app.use(errorsHandler)

const start = () => {
    try {
        app.listen(config.PORT, () => {
            console.log(`Server listening ${config.PORT} port ...`)
        })
    } catch (e) {
        console.log(e)
    }

}

start()
