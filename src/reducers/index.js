import { FORUM_INTRO, ADD_POST,USER_PAGE_CLICKED } from '../actions/forumActions';

export const initialState = {

    Intro: "Welcome to the forum",
    forumCatch: [{username: "haro49", message: "hello there", id:1}],
    clicked: "",
    viewed: false
}


export const forumReducer = ( state=initialState, action) => { 
    switch(action.type){

        case FORUM_INTRO: 
            return {...state, 
                    Intro: state.intro
            }
        case ADD_POST:
            return {
                ...state, 
                forumCatch: [...state.forumCatch, action.payload]
            }
        case USER_PAGE_CLICKED:
            return {
                ...state, 
                clicked: action.payload,
                viewed: true
            }
        
        default: 
            return state;
    }
}