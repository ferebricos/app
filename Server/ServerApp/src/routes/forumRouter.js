import Router from 'express-promise-router'
import controller from "../controllers/forumController.js";
const router = new Router()


router.get('/get_categories',controller.get_categories)
router.get('/get_category/:id',controller.get_category)
router.post('/create_topic',controller.create_topic)
router.post('/add_message',controller.add_message)
router.get('/get_topics_list/:category/:page?',controller.get_topics_list)
router.get('/get_messages_list/:topic/:page?',controller.get_messages_list)
router.get('/get_topics_top',controller.get_topics_top)
router.get('/get_topic/:id',controller.get_topic)
router.get('/get_users_top',controller.gettop)

export default router