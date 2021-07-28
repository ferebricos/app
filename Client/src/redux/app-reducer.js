import { appAPI, authAPI, statsAPI } from './../api/api.js'

const INIT_APP = 'INIT_APP'
const SET_USER = 'SET_USER'
const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_STATS = 'SET_STATS'
const INITIALIZE_APP = 'INITIALIZE_APP'
const LOGOUT = 'LOGOUT'
const SET_THEME = 'SET_THEME'


let initialState = {
    theme:null,
    categories: [],
    user: {
        isAuth: false,
        id: null,
        username: null,
        useravatar: null
    },
    stats: {
        top_users:[],
        top_topics:[]
    },
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_APP: {
            return {
                ...state,
                user: {
                    ...state.user,
                    isAuth: action.data.isAuth,
                    id: action.data.id,
                    username: action.data.username,
                    useravatar: action.data.useravatar
                },
                categories: [
                    ...action.data.categories
                ],
                initialized: true
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: {
                    ...state.user,
                    isAuth: action.data.isAuth,
                    id: action.data.id,
                    username: action.data.username,
                    useravatar: action.data.useravatar
                }
            }
        }
        case SET_THEME: {
            return {
                ...state,
                theme:action.data
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    isAuth: action.data.isAuth,
                    id: action.data.id,
                    username: action.data.username,
                    useravatar: action.data.useravatar
                }
            }
        }
        case SET_CATEGORIES: {
            return {
                ...state,
                categories: [
                ...action.data.categories
                ]
            }
        }
        case SET_STATS: {
            return {
                ...state,
                stats:{
                    ...action.data.top_topics,
                    ...action.data.top_users
                }
            }
        }
        case INITIALIZE_APP: {
            return {
                ...state,
                initialized: true
            }
        }
        default: {
            return state
        }
    }
}

// const initApp = (data) => ({ type: INIT_APP, data })
const setUser = (data) => ({ type: SET_USER, data })
const setCategories = (data) => ({ type: SET_CATEGORIES, data })
const initApp = () => ({ type: INITIALIZE_APP })
const setStats = (data) => ({type:SET_STATS, data})
const logout = (data) => ({type: LOGOUT,data})
const changeTheme = (data) => ({type:SET_THEME,data})

export const setTheme = (data) => async (dispatch) => {
    localStorage.setItem('theme',data)
    dispatch(changeTheme(data))
}

export const userLogout = () => async (dispatch) => {
    const user = await authAPI.logout()
    let data = {
        isAuth: user.isAuth,
        id: user.id,
        username: user.username,
        useravatar: user.useravatar,
    }
    dispatch(logout(data))
}

export const getUser = () => async (dispatch) => {
    const user = await appAPI.getUser()
    let data = {
        isAuth: user.isAuth,
        id: user.id,
        username: user.username,
        useravatar: user.useravatar ,
    }
    dispatch(setUser(data))
}

export const getStats = () => async (dispatch) => {
    
}

export const initializeApp = () => async (dispatch) => {
    const user = await appAPI.getUser()
    const categories = await appAPI.getCategories()
    const top_users = await statsAPI.getUsersTop()
    const top_topics = await statsAPI.getTopicsTop()

    let data = {
        top_users,
        top_topics
    }
    dispatch(setUser(user))
    dispatch(setCategories(categories))
    dispatch(setStats(data))
    dispatch(initApp())
}

export default appReducer


