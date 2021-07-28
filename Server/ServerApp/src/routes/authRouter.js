import Router from 'express-promise-router'
import controller from "../controllers/authController.js";
const router = new Router()


router.post('/register',controller.registration)
router.post('/login',controller.login)
router.post('/logout',controller.logout)
router.post('/create_token',controller.create_token)
router.post('/verify_email',controller.verify_email)
router.post('/reset_password',controller.reset_password)
router.get('/me',controller.me)


export default router