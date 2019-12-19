import React from 'react'; 
import { connect } from 'react-redux';
import { addPost, clickedPage } from '../actions/forumActions'
import Moment from 'react-moment';



const UserPage = (props) => { 
    const start = Date.now();
    return (

        <div style={{marginTop: `-300px`}}>
            <h1>
               Welcome to User Page of {props.clicked}
            </h1>
            <h2>List of all user posts</h2>
            {props.forumCatch.map(input => { 
                        if(input.username === props.clicked){
                            return (<div style={{display: `flex`, justifyContent: `space-around`, alignItems:`center`}}>
                                        
                                        <div style={{backgroundColor: `lightGrey`, width: `200px`, height: `100px`, marginBottom: `50px`}}>message: {input.message}</div>
                                       
                                    </div>
                            )
                        }
                })
            }
            
                
        </div>
    )
}

const mapStateToProps = state => { 
    return {
        Intro: state.Intro, 
        forumCatch: state.forumCatch,
        clicked: state.clicked, 
        viewed: state.viewed
    }
}
export default connect(
    mapStateToProps, 
    { clickedPage }
)(UserPage)