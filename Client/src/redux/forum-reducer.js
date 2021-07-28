import { forumAPI } from './../api/api.js'

const SET_TOPIC = 'SET_TOPIC'
const SET_MESSAGES = 'SET_MESSAGES'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_INFO = 'SET_INFO'
const ADD_MESSAGE = 'ADD_MESSAGE'

let initialState = {
    topic:{
        main_message_date:null,
        main_message_id:null,
        main_message_body:null,
        main_message_attachments:null,
        title:null,
        author_username:null,
        author_login:null,
        author_avatar:null,
    },
    messages:[],
    info: {
        id:null,
        currentPage:null,
        totalCount:null,
        pageSize:10,
    },
    isFetching:true
}

const forumReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOPIC: {
            return {...state,
                topic: {
                    ...state.topic,
                    main_message_body:action.data.main_message_body,
                    main_message_id:action.data.main_message_id,
                    main_message_date:action.data.main_message_date,
                    main_message_attachments:action.data.main_message_attachments,
                    author_username:action.data.author_username,
                    author_login:action.data.author_login,
                    author_avatar:action.data.author_avatar,
                    title:action.data.title 
                }
            }
        }
        case SET_MESSAGES: {
            return {
                ...state,
                messages:[
                    ...action.data.messages
                ]
            }

        }
        case ADD_MESSAGE: {
            return {
                ...state,
                messages:[
                    ...state.messages,
                    action.data
                ]
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching:action.isFetching}
        }
        case SET_INFO: {
            return {
                ...state,
                info: {
                    ...state.info,
                    id:action.data.id,
                    currentPage:action.data.currentPage,
                    totalCount:action.data.totalMessages
                }
            }
        }
        
        default: {
            return state
        }
    }
}

// const initApp = (data) => ({ type: INIT_APP, data })
const setTopic = (data) => ({ type: SET_TOPIC, data })
const setMessages = (data) => ({ type: SET_MESSAGES, data })
const toogleFetching = (data) => ({ type: TOGGLE_IS_FETCHING, data })
const setInfo = (data) => ({type:SET_INFO,data})
const addMessage = (data) => ({type:ADD_MESSAGE,data})

export const addMsg = (item) => async (dispatch) => {
    dispatch(addMessage(item))
    
}

export const getTopic = (topic,page=1) => async (dispatch) => {
    dispatch(toogleFetching(true))
    let data = await forumAPI.getTopic(topic)
    dispatch(setTopic(data.topic))
    let messages = await forumAPI.getTopicMessages(topic,page)
    dispatch(setMessages(messages))
    let info = {
        id:topic,
        currentPage:page,
        totalMessages:messages.info
    }
    dispatch(setInfo(info))
    dispatch(toogleFetching(false))
}

export default forumReducer


