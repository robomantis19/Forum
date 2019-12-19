import React from 'react'; 
import { NavLink } from 'react-router-dom';
import { addPost } from '../actions/forumActions'
import { connect } from 'react-redux';



const ForumList = (props) => { 

    return (
        <div>
            
            <h2>{props.username}</h2>
            {<NavLink to={`/forumList/${props.username}`}>Go to {props.username}s homepage</NavLink>}
            <p>{props.message}</p>
            

            Welcome to the forum of {props.username}
        </div>
    )
}
// const mapStateToProps = state => {
//     return {
//         Intro: state.Intro, 
//         forumCatch: state.forumCatch
//     }
// }
// export default connect(
//     mapStateToProps, 
//     { addPost }
// )(ForumList);
export default ForumList;