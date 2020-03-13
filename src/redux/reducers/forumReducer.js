import constants from '../constants';

export const initialState = {

    Intro: "Welcome to the forum",
    forumCatch: [
        {from_user: "haro49", 
        message: [{
            index: "hello wolrd",
        }],
        id:1,  
        viewed: 0}],
    profileCatch: [{from_user: "haro49", 
                    message: "hello world",
                    id:1,  
                    viewed: 0}],
    
    allMessages: [
        {from_user: "haro49", 
        message: "hello world",
        id:1,  
        viewed: 0}], 
    // allMessages: null,
    // forumCatch: {},

    clicked: "",
   
}


export const forumReducer = ( state=initialState, action) => { 
    switch(action.type){

        case constants.FORUM_INTRO: 
            return {...state, 
                    Intro: state.intro
            }
        case constants.ADD_POST:
                // let viewed1 = [...state.forumCatch]; 
                // viewed1.map(item => {
                //     if(item.username === action.payload.username){
                //       return item.message.push(action.payload.message)
                //     }
                //  })
                //  let viewed0 = [...state.messages]
                //  viewed0.map(item => {
                //     if(item.username === action.payload.username){
                //       return item.message.push(action.payload.message)
                //     }
                //  })
                //// below was in the original forum--------------------
                // var output = [state.allMessages.message]
                // output.map(item => { 
                //     if(item != action.payload.user_name){
                //         // let user = item.username;

                //         // return (item.message[user])
                //         return action.payload.message.index
                //     }
                    
                // })
            return {
                    ...state, 
                    forumCatch: action.payload
                    // allMessage: action.payload
                    //----------------------below was in original forum
                    // forumCatch:{
                        
                    //     ...state.forumCatch,
                    //     from_user: action.payload.from_user,
                    //     id: action.payload.id, 
                    //     // viewed: action.payload.viewed, 
                    //     message: { 
                    //         ...state.forumCatch.message,
                    //         index:  action.payload.message
                            
                    //         [state.forumCatch.message[action.payload.username].map(item => {
                    //             if(item != action.payload.username){
                    //                 return action.payload.message.index
                    //             } 
                    //         })]
                            
                    //     }
                    // }
                
               
                
                
                

            }
        case constants.USER_PAGE_CLICKED:
            // let viewed2 = [...state.allMessages] 
            // console.log('action.payload USER_PAGE_CLICKED1', viewed2)
            // viewed2.map(item => {
            //     console.log('action.payload USER_PAGE_CLICKED', action.payload)
            //     if(item.from_user === action.payload){
            //         console.log('viewed item', item.viewed)
            //       return item.viewed += 1
            //     }
            //  }) 
             console.log('clicked', action.payload)
            return {
                ...state, 
                clicked: action.payload
                // ...state.allMessages, 
                // allMessages: viewed2
                // ...state.forumCatch, 
                // forumCatch: [...state.forumCatch, viewed: viewed]
                
            }
    
        case constants.GET_ALL_MESSAGES:
            return {
                ...state, 
                allMessages: action.payload
            }  
        case constants.ADD_PROF:
            return {
                ...state, 
                profileCatch: action.payload
            }
        
        default: 
            return state;
    }
}