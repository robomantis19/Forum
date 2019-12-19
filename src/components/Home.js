import React, {useState} from 'react'; 
import { connect } from 'react-redux';
import { introActions } from '../actions/forumActions'; 
import { useSpring, animated } from 'react-spring'

const Home = (props) => { 

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
    from: { left: '0%', top: '0%', width: '0%', height: '0%' , background: 'lightgreen'},
        to: async next => {
            while (count <= 3 && count > 1) {
            
                if( count === 2) {
                await next({ top: '10%',  left: '-20%', width: '50%', height: '50%', background: 'blue'}) 
                await next({ top: '-5%', left: '-20%', width: '50%', height: '100%', background: 'white'})

                }
                setCount(count+1)
                return count
            }
            },
    })

    return (
        <div style={{marginTop: `-100px`}}>
            <div style={{width: `900px`, height: `600px`}}>
            <animated.div  className="script-box" style={prop}/>
            
            </div>
            <animated.div className = "script-box" style={prop2}>
            <div style={{position: `relative`, left: `400px`, top: `-500px`}}>
                
                    
                <h1>{props.Intro}</h1>
                {/* {props.forumCatch.map(item => { 
                    return (
                        <div  key={item.id}>
                        <h2>{item.username}</h2>
                        <p>{item.message}</p>
                        </div>
                    )
                })} */}
            </div>
            </animated.div>
            
            
        </div>
        
    )
}
const mapStateToProps = (state) => {
    return {
        Intro: state.Intro,
        forumCatch: state.forumCatch
    }
}
export default connect(
    mapStateToProps,{
        introActions
    })(Home);