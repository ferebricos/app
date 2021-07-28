const queries = {
    "auth": {
        "register": {
            "getOneUsername": 'SELECT 1 FROM users WHERE login=$1',
            "getOneEmail": 'SELECT 1 FROM users WHERE email=$1',
            "insertUser": 'INSERT INTO users (login,email,password,regdate) VALUES ($1,$2,$3,NOW()) RETURNING id',
            "insertEmailToken": 'INSERT INTO users_tokens (user_id,type,value) VALUES ($1,$2,$3)'
        },
        "login": {
            "getOne": "SELECT id,password,role,email FROM users WHERE email=$1 OR login=$1",
        },
        "create_token": {
            "getOneEmail": 'SELECT role,email,id FROM users WHERE email=$1',
            "deleteToken": "DELETE FROM users_tokens WHERE user_id=$1 AND type = $2",
            "insertToken": 'INSERT INTO users_tokens (user_id,type,value) VALUES ($1,$2,$3)'
        },
        "verify_email": {
            "getOneUser": 'SELECT user_id FROM users_tokens WHERE value=$1 AND type = 1',
            "deleteToken": "DELETE FROM users_tokens WHERE user_id=$1 AND type = 1",
            "updateUser": "UPDATE users SET role = 2 WHERE id=$1"
        },
        "reset_password": {
            "getOneUser": 'SELECT users.email,user_id FROM users_tokens JOIN users ON users_tokens.user_id = users.id WHERE value=$1 AND type = 2',
            "updateUser": "UPDATE users SET password = $1 WHERE id=$2",
            "deleteToken": "DELETE FROM users_tokens WHERE user_id=$1 AND type = 2",
        },
        "me": {
            "getOne": 'SELECT login,email,role,regdate,avatar,username FROM users WHERE id=$1',
        }
    },
    users: {
        "me": {
            "getOne": 'SELECT login,email,role,regdate,avatar,username FROM users WHERE id=$1',
        },
        "getone": {
            "getOne": 'SELECT login,email,role,regdate FROM users WHERE id=$1',
        },
        "getlist": {
            "getlist": 'SELECT * FROM users ORDER BY regdate DESC LIMIT $1 OFFSET $2 '
        },
        get_users_top: {
            getTop: 'SELECT * FROM users ORDER BY count_messages DESC LIMIT 5'
        }
    },
    forum: {
        get_categories: {
            getAll: `SELECT forum_categories.*,forum_topic.author AS last_topic_author,forum_topic.title AS last_topic_title,users.username AS last_topic_username,
            users.login AS last_topic_login, users.avatar AS last_topic_avatar
            FROM forum_categories 
            LEFT JOIN forum_topic ON forum_categories.last_topic = forum_topic.id
            LEFT JOIN users ON forum_topic.author = users.id
            ORDER BY forum_categories.id ASC`
        },
        get_category: {
            getOne: 'SELECT * FROM forum_categories WHERE id=$1'
        },
        create_topic: {
            insertTopic: 'INSERT INTO forum_topic (category,author,title) VALUES ($1,$2,$3) RETURNING id',
            insertMessage: 'INSERT INTO forum_message (topic,author,message,attachments) VALUES ($1,$2,$3,$4) RETURNING id',
            updateTopic: 'UPDATE forum_topic SET main_message = $1 WHERE id = $2;'
        },
        get_topics_list: {
            get_t_list: `SELECT
            forum_topic.id,
            forum_topic.title,
            forum_topic.date,
            forum_topic.count_messages,
            forum_categories.title AS category_title,
            forum_categories.icon AS icon,
            msg1.date AS last_message_date,
            msg2.message AS main_message_body,
            msg2.date AS main_message_date,
            users.login AS author_login,
            users.username AS author_username,
            users.avatar AS author_avatar
            FROM forum_topic
            LEFT JOIN forum_message AS msg1 ON forum_topic.last_message = msg1.id
            LEFT JOIN forum_message AS msg2 ON forum_topic.main_message = msg2.id
            LEFT JOIN users ON forum_topic.author = users.id
            LEFT JOIN forum_categories ON forum_topic.category = forum_categories.id
            WHERE forum_topic.category = $1 ORDER BY forum_topic.date DESC LIMIT $2 OFFSET $3`
        },
        get_topics_top: {
            getTop:`SELECT forum_categories.icon AS icon, forum_topic.* FROM forum_topic
            LEFT JOIN forum_categories ON forum_topic.category = forum_categories.id
            ORDER BY date DESC LIMIT 5`
        },
        add_message: {
            addOne:'INSERT INTO forum_message (topic,author,message,attachments) VALUES ($1,$2,$3,$4) RETURNING *',
        },
        get_users_top: {
            getTop: 'SELECT * FROM users ORDER BY count_messages DESC LIMIT 5'
        },
        get_topic: {
            getOne:`SELECT forum_topic.*,forum_message.message AS main_message_body
            FROM forum_topic
            LEFT JOIN forum_message ON forum_topic.main_message = forum_message.id
            WHERE forum_topic.id=$1`
            ,
            get_tpc:`SELECT
            forum_topic.title,
            forum_message.message AS main_message_body,
            forum_message.date AS main_message_date,
            forum_message.id AS main_message_id,
            forum_message.attachments AS main_message_attachments,
            users.username AS author_username,
            users.login AS author_login,
            users.avatar AS author_avatar
            FROM forum_topic
            LEFT JOIN forum_message ON forum_topic.main_message = forum_message.id
            LEFT JOIN users ON forum_topic.author = users.id
            WHERE forum_topic.id=$1
            `
        },
        get_messages_list: {
            getlist: 'SELECT * FROM forum_message WHERE topic = $1 AND id != (SELECT main_message FROM forum_topic WHERE id = $1) ORDER BY date ASC LIMIT $2 OFFSET $3 ',
            get_m_l:`SELECT 
            forum_message.id AS message_id,
            forum_message.date AS message_date,
            forum_message.message AS message_body,
            forum_message.attachments AS message_attachments,
            users.username AS author_username,
            users.login AS author_login,
            users.avatar AS author_avatar
            FROM forum_message
            LEFT JOIN users ON forum_message.author = users.id
            WHERE forum_message.topic = $1 
            AND forum_message.id != (SELECT main_message FROM forum_topic WHERE id = $1) ORDER BY date ASC LIMIT $2 OFFSET $3`

        }
    }
}

export default queries