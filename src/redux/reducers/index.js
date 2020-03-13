import { combineReducers } from 'redux'

import { forumReducer } from './forumReducer'; 

export const reducer = combineReducers({
    forumReducer: forumReducer
})