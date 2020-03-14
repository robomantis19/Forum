
export const FORUM_INTRO = 'FORUM_INTRO'; 
export const ADD_POST = "ADD_POST";
export const USER_PAGE_CLICKED= "USER_PAGE_CLICKED"; 


export const introActions = () => { 
    return { type: FORUM_INTRO }
}

export const addPost = (post) => {
    return { type: ADD_POST, payload: post }
}

export const clickedPage = (page) => { 
    return {type: USER_PAGE_CLICKED, payload: page};
}