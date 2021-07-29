import {authAPI} from './../api/api.js'

const VERIFY = 'VERIFY'

let initialState = {
        resultCode:null,
        message:null
}

const verifyReducer = (state = initialState, action) => {
    switch(action.type) {
        case VERIFY: {
            return {
                ...state,
                resultCode:action.data.resultCode,
                message:action.data.message
            }
        }
        default:
            return state;
    }
}

const setVerify = (data) => ({type: VERIFY, data})

export const getVerified = (token) => async (dispatch) => {
    const data = await authAPI.verify(token)
    dispatch(setVerify(data));
}

export default verifyReducer


