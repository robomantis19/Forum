import React, {memo, useState} from 'react';
import {
  NavLink, 
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Forum from './components/Forum';
import './App.css';
// import ForumList from './components/ForumList';
import UserPage from './components/UserPage';

import { useSpring, a } from 'react-spring'
import { useMeasure, usePrevious } from './treeview/helpers'
import { Global, Frame, Title, Content, toggle } from './treeview/styles'
import * as Icons from './treeview/icons'

import { addPost, clickedPage } from './actions/forumActions'
import { connect } from 'react-redux';

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
  return (
    <div>
      <Global />
      <Tree name="main" defaultOpen>
        <Tree name={<NavLink exact to="/">Home</NavLink>}/>
        <Tree name={<NavLink to="/forum">Forum</NavLink>}/>
        <Tree name="Users">
          <Tree name="hello" />
          {props.forumCatch.map(input => { 
                        let views = 0;
                        // if(props.username){
                          
                        
                            return (
          <Tree name={<h2>{input.username}</h2>}>
          
            <Tree name={<p>{<NavLink to={`/forumList/${input.username}`}onClick={() => props.clickedPage(input.username)}>User Hompage</NavLink>}</p>} style={{ color: '#37ceff' }} />
            {/* <Tree name={<h2>{input.username}</h2>}"child 2" style={{ color: '#37ceff' }} />
            <Tree name="child 3" style={{ color: '#37ceff' }} /> */}
            
            <Tree name="messages">
              <p>{input.message}</p>
              <div style={{ position: 'relative', width: '100%', height: 200, padding: 10 }}>
                <div style={{ width: '100%', height: '100%', background: 'black', borderRadius: 5 }} >
                  <p>{input.message}</p>
                </div>
              </div>
            </Tree>
          </Tree>
          )})}
          <Tree name="hello" />
        </Tree>
       
        <Tree name="About" />
      </Tree>
      {/* <div className="NavLinks">
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/forum">Forum</NavLink>
        <NavLink to="/forumList/:id">users</NavLink>
      </div> */}
      <div className="IntroText">
        <Route exact path="/" component={Home}/>
        <Route path="/forum" component={Forum}/> 
        <Route path="/forumList/:id" component={UserPage}/>
      </div>

    </div>
  );
}

const mapStateToProps = state => {
  return {
      Intro: state.Intro, 
      forumCatch: state.forumCatch,
      clicked: state.clicked,
      
  }
}
export default connect(
  mapStateToProps, 
  { addPost, clickedPage }
)(App);
