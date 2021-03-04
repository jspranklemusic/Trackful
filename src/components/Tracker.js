import React, {Component} from 'react'
import styled from 'styled-components'
import FlexButtonRow from './FlexButtonRow'

        const WhiteContainer = styled.div`
            width:max-content;
            margin:auto;
            padding:1rem;
            margin-bottom:0;
            margin-top:-0.5rem;
        `

        const DisplayTime = styled.h2`
            text-align:center;
            font-size:2.5rem;
            width:100%;
            margin-bottom:0;
            color:white;
        `
        const TrackerContainer = styled.div`
        background:var(--color-secondary);
        border-radius:0.5rem;
        box-shadow:5px 5px 0px var(--color-secondary-semidark);
        width:85%;
        overflow:hidden;
        max-width:600px;
        margin:2rem auto;

        & input{
            font-size:1rem;
            border:none;
            outline:none;
            padding:0.5rem;
        }
        `
const H2 = styled.h2`
   text-align:center;
   font-size:1.35rem;
   margin-bottom:1rem;
   background:black;
   color:rgba(255,255,255,0.55);
   padding:0.5rem;
   background:var(--color-secondary-semidark);
`

class Tracker extends Component{
    constructor(props){
        super(props)
        this.state={
            inputShown:false,
            timer:this.props.tracker.timer || null,
            text:this.props.tracker.text || null,
            startTime:this.props.tracker.startTime || null,
            stopTime:this.props.tracker.stopTime ||null,
            initialTime:this.props.tracker.initialTime || null,
            cumulativeSecs:this.props.tracker.cumulativeSecs || 0,
            countingSecs:this.props.tracker.countingSecs || 0,
            randomNum:this.props.tracker.randomNum
        }
        this.textInput = React.createRef()
    }

    componentDidMount(){
       if(!this.props.tracker.randomNum) this.setState({
           randomNum:"Anonymous #" + Math.floor(Math.random()*100000)
       })
        if(this.props.tracker.timer){
            this.setState({timer:null},()=>{
                this.startTimer(true,true)
            })
        }
    }

    saveSnapshot = ()=>{
        this.setState({inputShown:false},()=>{
            this.props.modifyTracker({...this.state, timer:this.state.timer ? 'active' : 'null'})
        })
        
    }

    componentWillUnmount(){
        this.stopTimer(true,true)
    }
   

    addText = e =>{
        this.setState({
            text:e.target.value
        })
    }

    //start=true allows this function to be run on start
    startTimer = (e, timerStarted, createdTime = Date.now())=>{

        if(this.state.timer && !timerStarted) return
        if(!this.state.initialTime) this.setState({initialTime:createdTime})
        if(!timerStarted) this.setState({startTime:Date.now()},()=>{
            this.props.modifyTracker({...this.state,timer:'active'})
        })

        

        this.setState({
            timer:setInterval( ()=>{
                let newTime = Date.now()
                let oldTime = this.state.startTime
                let diff = Math.floor((newTime - oldTime)/1000)
                this.setState({countingSecs:diff})
            },1000)
        })
        
    }

    stopTimer = (e,stopFetch=false)=>{

        clearInterval(this.state.timer)

        this.setState(prevState=>({
            countingSecs:0,
            timer:null,
            cumulativeSecs:prevState.countingSecs + prevState.cumulativeSecs
        }))

        setTimeout(()=>{
            if(!stopFetch){
                this.props.modifyTracker({...this.state,timer:null})
            }
        },1)
    
    
    }

    title = ()=>{
        return this.state.text || this.state.randomNum     
    }

    displaySecs = ()=>{
        return (this.state.countingSecs + this.state.cumulativeSecs)%60
    }
    displayMins = ()=>{
        return Math.floor((this.state.countingSecs + this.state.cumulativeSecs)/60)%60
    }

    displayHours = ()=>{
        return Math.floor((this.state.countingSecs + this.state.cumulativeSecs)/3600)
    }

    render(){

        const timerStyle = {
            color:this.state.timer ? 'maroon' : 'rgba(0,0,0,0.500)',
            border:'3px solid rgba(0,0,0,0.200)',
            padding:'1rem 2rem',
            borderRadius:'5px',
        }

        return(

            <TrackerContainer>
            
            <H2>{this.title()}</H2>
            <WhiteContainer>
            <DisplayTime 
            style={timerStyle}>
                <span>{this.displayHours()>9? "" : "0"}{this.displayHours()}:{this.displayMins()>9? "" : "0"}{ this.displayMins() }:{this.displaySecs()>9? "" : "0"}{ this.displaySecs() } </span>
                
            
            </DisplayTime>
            </WhiteContainer>
                <FlexButtonRow>
                    {!this.state.timer ? <button className="green" onClick={this.startTimer}><i class="fas fa-play-circle"></i></button> :
                    <button className="red" onClick={this.stopTimer}><i className="far fa-stop-circle"></i></button>}
                    <button className="blue" onClick={this.props.deleteTracker}><i class="fas fa-trash-alt"></i></button>
                    {!this.state.inputShown ?  <button onClick={()=>this.setState({inputShown:true})}><i class="fas fa-edit"></i></button> :
                        <button onClick={this.saveSnapshot}><i class="fas fa-save"></i></button>
                    }
                    
                    
                </FlexButtonRow>
                {this.state.inputShown && <input type="text" key="1" ref={this.textInput} onBlur={this.saveSnapshot} onInput={this.addText} value={this.state.text} style={{width:'100%'}} placeholder="What are you working on?"/>}
                
            </TrackerContainer>
        )
    }
}

export default Tracker