import {appAPI} from './../api/api.js'

const INIT_STATS = 'INIT_STATS'

let initialState = {
        topusers:[],
        lasttopics:[]
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INIT_APP: {
            return {
                ...state,
                user:{
                    ...state.user,
                    isAuth:action.data.isAuth,
                    id:action.data.id,
                    username:action.data.username,
                    useravatar:action.data.useravatar
                },
                categories: [
                    ...state.categories,
                    ...action.data.categories
                ],
                initialized:true
            }
        }
        default:
            return state;
    }
}

const initStats = (data) => ({type: INIT_STATS, data})

export const getData = () => async (dispatch) => {
    const user = await appAPI.getUser()
    const categories = await appAPI.getCategories()
    let data = {
        isAuth:user.isAuth,
        id:user.id,
        username:user.username,
        useravatar:user.useravatar,
        categories:categories.categories
    }
    dispatch(initApp(data));
}

export default appReducer


