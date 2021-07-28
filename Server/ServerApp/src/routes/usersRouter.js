import Router from 'express-promise-router'
import controller from "../controllers/usersController.js";
const router = new Router()


router.get('/me',controller.me)
router.get('/get_users_top',controller.gettop)
router.get('/getone/:id',controller.getone)
router.get('/getlist/:page?',controller.getlist)


export default router