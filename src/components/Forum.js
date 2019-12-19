import React, {useState} from 'react'; 
import { addPost, clickedPage } from '../actions/forumActions'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { ForumList } from './forumList';

const Forum = (props) => { 
    const [addUser, setAddUser] = useState("");
    const [message, setMessage] = useState("");

    const addItem = (username, post) => { 
        let item = {
            username: username, 
            message: post, 
            id: Date.now()
        }
        props.addPost(item);
    }
    const handleChange = (e) => { 
        setAddUser(e.target.value)
    }
    const handleChange2 = (e) => { 
        setMessage(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault(); 
        addItem(addUser, message)
        setMessage("")
        setAddUser("")
    }
    return (
        <div>
            <h2>This is a forum</h2>
            <form onSubmit={handleSubmit}>
                <label>username here...</label>
                <input
                type="text"
                value={addUser}
                onChange={handleChange}
                name="name"
                />
                <label>type something...</label>
                <textarea
                type="text"
                value={message}
                onChange={handleChange2}
                name="random text"
                />
                <button>Submit</button>
            </form>
            
            {props.forumCatch.map(item => { 
                return (
                    <div key={item.id}>
                    <h2>{item.username}</h2>
                    <NavLink to={`/forumList/${item.username}`} onClick={() => props.clickedPage(item.username)}>Go to {item.username}s homepage</NavLink>
                    <p>{item.message}</p>
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        Intro: state.Intro, 
        forumCatch: state.forumCatch,
        clicked: state.clicked
    }
}
export default connect(
    mapStateToProps, 
    { addPost, clickedPage }
)(Forum);