import React from 'react'; 
import { NavLink } from 'react-router-dom';
import { addPost } from '../redux/actions'
import { connect } from 'react-redux';
import "../App.css"

const ForumList = ({Intro, forumCatch, addPost}) => { 

    return (
        <div style={{zIndex:'3'}}>
            {console.log('props forumCatch', forumCatch.from_user)}
            
            <h2>{forumCatch.from_user}</h2>
            {<NavLink className="whiteBackground3" to={`/forumList/${forumCatch.from_user}`}>Go to {forumCatch.from_user}s homepage</NavLink>}
            <p>{forumCatch.message}</p>
            

            Welcome to the forum of {forumCatch.from_user}
           
        </div>
    )
}
const mapStateToProps = ({forumReducer}) => {
    return {
        Intro: forumReducer.Intro, 
        forumCatch: forumReducer.forumCatch
    }
}
export default connect(
    mapStateToProps, 
    { addPost }
)(ForumList);
