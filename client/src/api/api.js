import * as axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost/api/',
});

export const appAPI = {
    getUser() {
        return instance.get(`auth/me`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return {
                        isAuth:true,
                        id:response.data.message[0].login,
                        username:response.data.message[0].login,
                        useravatar:response.data.message[0].avatar,
                    }
                } else {
                    return {
                        isAuth:false,
                        id:null,
                        username:null,
                        useravatar:null
                    }
                }
            })

    },
    getCategories() {
        return instance.get(`forum/get_categories`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return {
                        categories:response.data.message
                    }
                } else {
                    return {
                        categories:[]
                    }
                }
            })

    }
}

export const statsAPI = {
    getUsersTop() {
        return instance.get(`forum/get_users_top`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return {
                        top_users:response.data.message
                    }
                } else {
                    return {
                        top_users:[]
                    }
                }
            })

    },
    getTopicsTop() {
        return instance.get(`forum/get_topics_top`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return {
                        top_topics:response.data.message
                    }
                } else {
                    return {
                        top_topics:[]
                    }
                }
            })

    },
   
}

export const authAPI = {
    logout(data) {
        return instance.post(`auth/logout`)
        .then(response => {
            return {
                isAuth:false,
                id:null,
                username:null,
                useravatar:null
            }
        })
    },
    register(data) {
        return instance.post(`auth/register`, {...data})
    },
    login(data) {
        return instance.post(`auth/login`, {...data})
    },
    verify(token) {
        return instance.post(`auth/verify_email/`,{token})
            .then(response => {
                return {
                    resultCode: response.data.resultCode,
                    message: response.data.message,
                }
            })
    }
}

export const forumAPI = {
    addTopic(data) {
        return instance.post('forum/create_topic',{...data})
    },
    addMessage(data) {
        return instance.post('forum/add_message',{...data})
    },
    getTopics(category,page=1) {
        return instance.get(`forum/get_topics_list/`+category+'/'+page)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return {
                        topics:response.data.message,
                        info:response.data.info.totalCount
                    }
                } else {
                    return {
                        topics:[],
                        info:null
                    }
                }
            })
    },
    getTopic(id,page=1) {
        return instance.get(`forum/get_topic/`+id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return {
                        topic:response.data.message[0],
                    }
                } else {
                    return {
                        topic:{},
                    }
                }
            })
    },
    getTopicMessages(topic,page=1) {
        return instance.get(`forum/get_messages_list/`+topic+'/'+page)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return {
                        messages:response.data.message,
                        info:response.data.info.totalCount
                    }
                } else {
                    return {
                        messages:[],
                        info:null
                    }
                }
            })
    }
}
