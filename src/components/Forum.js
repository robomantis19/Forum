import React, {useState, useEffect} from 'react'; 
import { addPost, clickedPage, getAllMessages } from '../redux/actions'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { ForumList } from './forumList';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Forum = ({ addPost, clickedPage, forumCatch, getAllMessages, allMessages, Intro, clicked }) => { 
    const [addUser2, setAddUser2] = useState("");
    const [message1, setMessage] = useState("");
    const [homeMessages, setHomeMessages] = useState("");
    const [toggle, setToggle] = useState(""); 
    
    useEffect(() => { 
        axiosWithAuth().get('/messages')
        .then(res => { 
            // console.log('useEffect get /messages', res);
            setHomeMessages(res.data)
            getAllMessages(res.data);
        })
        .catch(err => { 
            console.log('get api/users/messages err', err); 
        })
        // console.log('forumCatch:', forumCatch)
    },[forumCatch])
    // if(forumCatch == undefined){
    //     console.log('forumCatch:',forumCatch) 
    // }else{ console.log('forumCatch else', forumCatch.id)}


    const handleChange = (e) => { 
        setMessage({
            ...message1, 
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault(); 
        let item = {
            from_user: message1.from_user ? message1.from_user : localStorage.getItem('username'), 
            message: message1.message, 
            starRating: 5,
            user_id: localStorage.getItem('userId'),
            views: 0
        };
        // console.log('addItem', item)
        // const local = localStorage.getItem('userId')
        // console.log('localstorage value', local)
        addPost(item);
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
        <div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', position: 'relative', top:'-200px'}}>
                <h2>This is a forum</h2>
                <form style={{ zIndex:'2'}} onSubmit={handleSubmit}>
                    <label>username here...</label>
                    <input
                    type="text"
                    value={message1.from_user || message1.from_user == "" ? message1.from_user : localStorage.getItem('username')}
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
                <div style={{marginTop: '200px', height: '100%', display:'flex', flexDirection:"row", flexWrap: 'wrap', justifyContent:"space-around", alignItems:'space-between'}}>
                {allMessages.length > 1 ? allMessages.map(item => { 
                    let user1 = item.from_user;
                    // console.log('user', item.message);
                    return (
                        
                        <div key={item.id} style={{paddingLeft: '50px', paddingRight: '50px', border: '2px dotted lime', height: '500px', width: '500px'}}>
                        <h2 style={{width: '400px',height: '50px'}}>{item.from_user}</h2>
                        <NavLink style={{width: '400px',height: '100px'}} to={`/forumList/${item.from_user}`} onClick={() => clickedPage2(item, item.user_id)}>Go to {item.from_user}'s homepage</NavLink>
                        <p style={{width: '400px',height: '200px', border: '2px solid green'}} >Message: {item.message}</p>
                        </div>
                    )
                }) : null}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ forumReducer })  => {
    return {
        Intro: forumReducer.Intro, 
        forumCatch: forumReducer.forumCatch,
        clicked: forumReducer.clicked,
        allMessages: forumReducer.allMessages
    }
}
export default connect(
    mapStateToProps, 
    { addPost, clickedPage, getAllMessages }
)(Forum);