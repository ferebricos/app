import { forumAPI } from './../api/api.js'

const SET_TOPICS = 'SET_TOPICS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_INFO = 'SET_INFO'

let initialState = {
    topics:[],
    info: {
        id:null,
        currentPage:null,
        totalCount:null,
        pageSize:10,
    },
    isFetching:true
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOPICS: {
            return {...state,topics:action.data}
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
                    totalCount:action.data.totalTopics
                }
            }
        }
        
        default: {
            return state
        }
    }
}

// const initApp = (data) => ({ type: INIT_APP, data })
const setTopics = (data) => ({ type: SET_TOPICS, data })
const toogleFetching = (data) => ({ type: TOGGLE_IS_FETCHING, data })
const setInfo = (data) => ({type:SET_INFO,data})

export const getTopics = (category,page=1) => async (dispatch) => {
    dispatch(toogleFetching(true))
    let data = await forumAPI.getTopics(category,page)
    dispatch(setTopics(data.topics))
    let info = {
        id:category,
        currentPage:page,
        totalTopics:data.info
    }
    dispatch(setInfo(info))
    dispatch(toogleFetching(false))
}

export default categoryReducer


