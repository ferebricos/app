import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer.js";
import verifyReducer from './verify-reducer'
import categoryReducer from './category-reducer'
import { forumAPI } from "../api/api.js";
import forumReducer from "./forum-reducer.js";

let reducers = combineReducers({
    app:appReducer,
    verified:verifyReducer,
    category:categoryReducer,
    topic:forumReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;