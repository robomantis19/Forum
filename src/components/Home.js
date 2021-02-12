import React, {useState, useEffect} from 'react'; 
import { connect } from 'react-redux';
import { introActions } from '../redux/actions'; 
import { useSpring, animated } from 'react-spring'
import { axiosWithAuth } from '../utils/axiosWithAuth'; 
import { useHistory, NavLink } from 'react-router-dom';
import { clickedPage } from '../redux/actions';


const Home = (props) => { 

    const [homeMessages, setHomeMessages] = useState("");
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
    },[])

    const [count , setCount ] = useState(1);
    const prop = useSpring({
        from: { left: '0%', top: '0%', width: '0%', height: '0%' ,background: 'lightgreen'},
        to: async next => {
        while (count <= 1) {
            
            await next({ left: '0%', top: '0%', width: '100%', height: '10%', background: 'lightblue' })
           
            await next({ top: '50%', height: '5%', background: 'lightsalmon' })
            await next({ width: '50%', left: '10%', background: 'lightcoral' })
            await next({ width: '30%', left: '0%' , background: 'lightseagreen' })
            await next({  top: '0%', width: '10%', height: '50%', background: 'lightskyblue' })
            setCount(count+1)
            return count
        } if(count === 2 ){
            await next({  top: '0%', width: '10%', height: '50%', background: 'darkorange' })
            await next({  top: '0%', width: '100%', height: '50%', background: 'white' })
            // await next({ top: '10%',  left: '-20%', width: '50%', height: '50%', background: 'darkorange'}) 
            await next({ top: '0%',   width: '10%', height: '50%', background: 'darkorange'}) 

        }
        },

    })
    const prop2 = useSpring({
    from: { left: '0%', top: '0%', width: '0%', height: '0%' , background: 'transparent'},
        to: async next => {
            while (count <= 3 && count > 1) {
            
                if( count === 2) {
                await next({ top: '10%',  left: '-20%', width: '50%', height: '50%', background: 'transparent'}) 
                await next({ top: '-5%', left: '-20%', width: '50%', height: '10%', background: 'transparent'})

                }
                setCount(count+1)
                return count
            }
            },
    })


    const clickedPage2 = (input, userid) => {
        let { views, id, from_user, message, starRating, user_id } = input 
        views += 1;
        console.log('views variable', views )
        
        axiosWithAuth().put(`/${userid}/views`, { views: views, from_user: from_user, message: message, starRating: starRating})
       
        props.clickedPage(from_user)
        console.log('clickedPage', from_user);
        
    }

    return (
        <div style={{marginTop: `-300px`}}>
            {localStorage.getItem('username') ? <h1  style = {{zIndex: "50", textAlign:"center"}}>Welcome to the forum {localStorage.getItem('username')}</h1> : false}
            <div style={{width: `900px`, height: `600px`}}>
            <animated.div  className="script-box" style={prop}/>
            
            </div>
            {/* <animated.div className = "script-box" style={prop2}>

            <div style={{zIndex: "50",position: `relative`, left: `400px`, top: `-500px`}}>
                 */}
                    
                {/* <h1  style = {{zIndex: "50", textAlign:"center"}}>Welcome to the forum {localStorage.getItem('username')}</h1> */}
                {/* {props.forumCatch.map(item => { 
                    return (
                        <div  key={item.id}>
                        <h2>{item.username}</h2>
                        <p>{item.message}</p>
                        </div>
                    )
                    
                })} */}
                {/* {localStorage.getItem('username') ? <div  style={{ marginLeft: '800px',marginTop: '350px', display: "flex"}}>
                {homeMessages ? homeMessages.map((item, index) => { 
                        let user1 = item.from_user;
                        // console.log('user', item.message);
                        if(index > 10){
                            return (
                                
                                <div key={item.id} id="#mask" className="carousel" style={{marginLeft: '100px',zIndex: '50', marginTop: '-300px', paddingLeft: '50px', paddingRight: '50px', height: '300px', width: '250px'}}>
                                <h2 style={{width: '150px',height: '50px'}}>{item.from_user}</h2>
                                <NavLink style={{width: '150px',height: '100px'}} to={`/forumList/${item.from_user}`} onClick={() => clickedPage2(item, item.user_id)}>Go to {item.from_user}'s homepage</NavLink>
                                <p style={{width: '150px',height: '50px'}} >Message: {item.message}</p>
                                </div>
                            )
                        }
                    }) : null}
                </div> : <h1  style = {{marginLeft: "-200px", zIndex: "50", textAlign:"center"}}>Welcome to the forum {localStorage.getItem('username')}</h1>}
            </div>
            </animated.div> */}
            
            
        </div>
        
    )
}
const mapStateToProps = ({forumReducer}) => {
    return {
        Intro: forumReducer.Intro,
        forumCatch: forumReducer.forumCatch,
        clicked: forumReducer.clicked
    }
}
export default connect(
    mapStateToProps,{
        introActions, clickedPage
    })(Home);