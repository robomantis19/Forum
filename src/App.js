import React, {memo, useState, useEffect} from 'react';
import {
  NavLink, 
  Route,
  Switch
} from 'react-router-dom';
import Home from './components/Home';
import Forum from './components/Forum';
import './App.css';
// import ForumList from './components/ForumList';
import UserPage from './components/UserPage';
import ForumList from './components/ForumList';
import { useSpring, a } from 'react-spring'
import { useMeasure, usePrevious } from './treeview/helpers'
import { Global, Frame, Title, Content, toggle } from './treeview/styles'
import * as Icons from './treeview/icons'

import { addPost, clickedPage } from './redux/actions'
import { connect } from 'react-redux';
import Register from './components/Register';
import PrivateRoute from './utils/privateRoute'
import { axiosWithAuth } from './utils/axiosWithAuth'; 

const Tree = memo(({ children, name, style, defaultOpen = false }) => {

  

  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { height: isOpen ? viewHeight : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` }
  })
  const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
  return (
    <Frame>
      <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => setOpen(!isOpen)} />
      <Title style={style}>{name}</Title>
      <Content style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height }}>
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  )
})

  
function App(props) {
  const [data, setData] = useState({}); 
  const [usercount, setUserCount] = useState({})

  useEffect(() => { 
    axiosWithAuth().get('/getAll/views')
    .then(res => { 
      // console.log('getAllViews response', res)
      setData(res.data);
      // const data2 = data.filter((x, ind) => data.indexOf(x.from_user) === ind)
      // setDataMap2(data2)
      const unique = [...new Map(data.map(item => [item.from_user, item])).values()]
      console.log('unique', unique)
    })
    .catch(err => { 
      console.log(err); 
    })
    axiosWithAuth().get('/')
    .then(res => {    
      setUserCount(res.data);
      
    })
    .catch(err => { 
      console.log(err); 
    })
    
  },[])
  return (
    <div style= {{disply: "flex"}}>
      <Global />
      <Tree name="main" defaultOpen>
        <Tree name={<NavLink exact to="/">Home</NavLink>}/>
        <Tree name={<NavLink to="/forum">Forum</NavLink>}/>
        <Tree name={<NavLink to={`/forumList/${localStorage.getItem('username')}`}>Profile</NavLink>}/>
        <Tree name={<NavLink to="/register">Register</NavLink>}/>
        <Tree name="Trending Users">
          <Tree name="hello" />
          {data.length > 0 ? data.filter((v,i,a) => a.findIndex(t=>(t.from_user === v.from_user))===i).map((input, index) => { 

                       
                        if( index < 10){
                          // console.log('mapping app.js input', input)
                        
                            return (
          <Tree name={<h2 key={index}>{input.from_user}</h2>}>
          
            <Tree name={<p>{<NavLink to={`/forumList/${input.from_user}`}onClick={() => props.clickedPage(input.from_user)}>User Hompage</NavLink>}</p>} style={{ color: '#37ceff' }} />
            {/* <Tree name={<h2>{input.username}</h2>}"child 2" style={{ color: '#37ceff' }} />
            <Tree name="child 3" style={{ color: '#37ceff' }} /> */}
            
            <Tree name="views">
              
              <div style={{ position: 'relative', width: '100%', height: 200, padding: 10 }}>
                <div style={{ width: '100%', height: '100%', background: 'black', borderRadius: 5 }} >
                  <p>Total Views: {input.views}</p>
                </div>
              </div>
            </Tree>
          </Tree>
          )}}) : null}
          
        </Tree>
       
        <Tree name="Stats">
          <Tree name="Total Users">
            <div>{usercount ? `${usercount.length} Users` : false}</div>
          </Tree>
        </Tree>
      </Tree>
      {/* <div className="NavLinks">
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/forum">Forum</NavLink>
        <NavLink to="/forumList/:id">users</NavLink>
      </div> */}
      <div className="IntroText">
        <Switch>
        <Route exact path="/" component={Home}/>
        <PrivateRoute path="/forum" component={Forum}/> 
        <PrivateRoute path="/forumList/:id" component={UserPage}/>
        <Route path="/register" component={Register}/>
        </Switch>
      </div>

    </div>
  );
}

const mapStateToProps = ({forumReducer}) => {
  return {
      Intro: forumReducer.Intro, 
      forumCatch: forumReducer.forumCatch,
      clicked: forumReducer.clicked,
      allMessages: forumReducer.allMessages
      
  }
}
export default connect(
  mapStateToProps, 
  { addPost, clickedPage }
)(App);
