
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import constants from '../constants';


export const introActions = () => { 
    return { type: constants.FORUM_INTRO }
}
export const getAllMessages = (messages) => { 
    return { type: constants.GET_ALL_MESSAGES, payload: messages }
}

// export const addPost = (post) => {
//     return { type: ADD_POST, payload: post }
// }
export const addPost = (inputPost) => dispatch => { 
    console.log('addPost object', inputPost); 
    // const { from_user, message, starRating, user_id } = inputPost;
    axiosWithAuth().post(`/${localStorage.getItem('userId')}/messages`, {from_user: inputPost.from_user, message: inputPost.message, starRating: inputPost.starRating, user_id: inputPost.user_id, views: inputPost.views})
    .then( res => { 
        console.log('addPost response', res);
        dispatch({ type: constants.ADD_POST, payload: res.data[0] })
    })
    .catch(err => { 
        console.log('addPost error', err)
    })
}
export const addProf = (inputPost) => dispatch => { 
    console.log('addPost object', inputPost); 
    // const { from_user, message, starRating, user_id } = inputPost;
    axiosWithAuth().post(`/${inputPost.user_id}/messages`, {from_user: inputPost.from_user, message: inputPost.message, starRating: inputPost.starRating, user_id: inputPost.user_id, views: inputPost.views})
    .then( res => { 
        console.log('addPost response', res);
        // dispatch({ type: constants.ADD_PROF, payload: res.data[0] })
    })
    .catch(err => { 
        console.log('addPost error', err)
    })
}
export const clickedPage = (page) => { 
    return {type: constants.USER_PAGE_CLICKED, payload: page};
}