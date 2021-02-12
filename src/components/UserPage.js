import React, {useState, useEffect} from 'react'; 
import { connect } from 'react-redux';
import { addPost, clickedPage, getAllMessages, addProf } from '../redux/actions'
import Moment from 'react-moment';
import { useHistory, NavLink } from 'react-router-dom'; 
import {axiosWithAuth} from '../utils/axiosWithAuth';


const UserPage = (addPost, addProf,profileCatch, clickedPage, forumCatch, getAllMessages, allMessages, Intro, clicked ) => { 
    const start = Date.now();

    const [addUser2, setAddUser2] = useState("");
    const [message1, setMessage] = useState("");
    const [homeMessages, setHomeMessages] = useState("");
    const [toggle, setToggle] = useState(false); 
    const history = useHistory();

    useEffect(() => { 
        axiosWithAuth().get('/messages')
        .then(res => { 
            // console.log('useEffect get /messages', res);
            setHomeMessages(res.data)
            // getAllMessages(res.data);
        })
        .catch(err => { 
            console.log('get api/users/messages err', err); 
        })
        // console.log('forumCatch:', forumCatch)
    },[toggle])


    const handleChange = (e) => { 
        setMessage({
            ...message1, 
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const inputPost = {
            from_user: message1.from_user ? message1.from_user : localStorage.getItem('username'), 
            message: message1.message, 
            starRating: 5,
            user_id: Number(localStorage.getItem('userId')),
            views: 0
        };
        // console.log('addProf', item)
        // const local = localStorage.getItem('userId')
        // // console.log('localstorage value', local)
        // addProf({
        //     from_user: message1.from_user ? message1.from_user : localStorage.getItem('username'), 
        //     message: message1.message, 
        //     starRating: 5,
        //     user_id: Number(localStorage.getItem('userId')),
        //     views: 0
        // });
        axiosWithAuth().post(`/${inputPost.user_id}/messages`, {from_user: inputPost.from_user, message: inputPost.message, starRating: inputPost.starRating, user_id: inputPost.user_id, views: inputPost.views})
        setMessage("");
        setToggle(!toggle)
        
    }

    const clickedPage2 = (input, userid) => {
        let { views, id, from_user, message, starRating, user_id } = input 
        views += 1;
        console.log('views variable', views )
        
        axiosWithAuth().put(`/${userid}/views`, { views: views, from_user: from_user, message: message, starRating: starRating})
       
        clickedPage(from_user)
        console.log('clickedPage', from_user);
        
    }
    
    return (

        <div style={{marginTop: `-200px`}}>
            <h1>
               Welcome to User Page of {history.location.pathname.slice(11)}
            </h1>
            <h2>This is a forum</h2>
                <form style={{ marginTop: '200px',  zIndex:'20'}} onSubmit={handleSubmit}>
                    <label>username here...</label>
                    <input
                    type="text"
                    value={message1.from_user === localStorage.getItem('username') || message1.from_user == "" ? message1.from_user : localStorage.getItem('username')}
                    onChange={handleChange}
                    name="from_user"
                    />
                    <label>type something...</label>
                    <textarea
                    type="text"
                    value={message1.message}
                    onChange={handleChange}
                    name="message"
                    />
                    <button>Submit</button>
                </form>
            <h2>List of all user posts</h2>
           
            {/* {homeMessages ? homeMessages.map(input => { 
                        console.log(clicked);
                        if(input.from_user === clicked || input.from_user === history.location.pathname.slice(11)){
                            return (<div key={input.id} style={{display: `flex`, justifyContent: `space-around`, alignItems:`center`}}>
                                        
                                        <div style={{backgroundColor: `lightGrey`, width: `200px`, height: `100px`, marginBottom: `50px`}}>message: {input.message}</div>
                                       
                                    </div>
                            )
                        }

            }): true} */}
                {homeMessages ? homeMessages.map(item => { 
                    let user1 = item.from_user;
                    // console.log('user', item.message);
                    if(item.from_user === clicked || item.from_user === history.location.pathname.slice(11) ||  (item.message && item.message.includes(`@${history.location.pathname.slice(11)}`))){
                        return (
                            
                            <div key={item.id} style={{paddingLeft: '50px', paddingRight: '50px', border: '2px dotted lime', height: '500px', width: '500px'}}>
                            <h2 style={{width: '400px',height: '50px'}}>{item.from_user}</h2>
                            <NavLink className="whiteBackground3" style={{width: '400px',height: '100px'}} to={`/forumList/${item.from_user}`} onClick={() => clickedPage2(item, item.user_id)}>Go to {item.from_user}'s homepage</NavLink>
                            <p style={{width: '400px',height: '200px', border: '2px solid green'}} >Message: {item.message}</p>
                            </div>
                        )
                    }
                }) : null}
            
                
        </div>
    )
}

const mapStateToProps = ({forumReducer}) => { 
    return {
        Intro: forumReducer.Intro, 
        forumCatch: forumReducer.forumCatch,
        clicked: forumReducer.clicked,
        allMessages: forumReducer.allMessages,
        profileCatch: forumReducer.profileCatch
    }
}
export default connect(
    mapStateToProps, 
    { clickedPage, addPost, getAllMessages, addProf}
)(UserPage)