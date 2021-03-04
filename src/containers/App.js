import './App.css';
import Tracker from '../components/Tracker'
import React,{useState,useEffect} from 'react'
import Modal from '../components/Modal'
import Button from '../components/Button'
import Header from '../components/Header'
import Login from '../components/Login'
import FlexButtonRow from '../components/FlexButtonRow'
import {checkLocalStorage, setLocalStorage, clearLocalStorage} from '../localstorage/localStorageFunctions'
import {motion, AnimatePresence  } from 'framer-motion'


function App() {
  const [trackers, setTrackers] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggingIn, setLoggingIn] = useState(true)
  const [username, setUsername] = useState("")
  const [userID, setUserID] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isChangingPass, setIsChangingPass] = useState(false)



  useEffect(()=>{
    checkLocalStorage({
      setUsername,
      setPassword,
      setUserID,
      setLoggedIn,
      setTrackers
    })
  },[])

  
  const addTracker = ()=>{
      let modifiedTrackers = [...trackers]
      modifiedTrackers.push({randomNum:"Anonymous #" + Math.floor(Math.random()*100000)})
      console.log(trackers)
      updateTrackers(modifiedTrackers)
      setTrackers([...modifiedTrackers])
      
  }

  const updateTrackers = async (updatedTrackers)=>{

      await fetch(process.env.REACT_APP_FIREBASE_DATABASE_URL+`users/${userID}/trackers.json`,{
      method:"PUT",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify([...updatedTrackers])
    })
  }

  const modifyTracker = async(newTracker)=>{
    let ind = trackers.findIndex(tracker=>tracker.randomNum === newTracker.randomNum)
    let modifiedTrackers = [...trackers]
    modifiedTrackers[ind] = {...newTracker}
    updateTrackers(modifiedTrackers)
    setTrackers([...modifiedTrackers])
    
  }

  const deleteTracker = async (num)=>{
    let ind = trackers.findIndex(tracker=>tracker === num)
    let modifiedTrackers = [...trackers]
    modifiedTrackers.splice(ind,1)
    updateTrackers(modifiedTrackers)
    setTrackers([...modifiedTrackers])
    
  }

  const checkUsername = async (checkPass=false)=>{
    const response = await fetch(process.env.REACT_APP_FIREBASE_DATABASE_URL+'users.json')
    const data = await response.json()
    //this is for checking if a username exists
    if(!checkPass){
      for(let user in data){
        if(data[user].username === username){
          return true 
          
        }
      }
      //This is for checking password and logging in
    }else{
      for(let user in data){
        if(data[user].username===username && data[user].password===password){
          setUserID(user)
          if(data[user].trackers){
            setTrackers([...data[user].trackers])
          }
          
          return true    
        }
      }
    }
    
    return false
  }

  const loginAuth = async (e)=>{
    e.preventDefault()
    const valid = await checkUsername(true)
    if( valid ) {
      setLoggedIn(true)
      setTimeout(()=>{
        setLocalStorage({
          username,
          password,
          userID
        })
      },1)
      setError("")
    }else{
      setError("Invalid login credentials.")
      setUsername("")
      setPassword("")
    }
  }

  const viewPasswordChange = async ()=>{
    setIsChangingPass(!isChangingPass)
  }

  const logOut = ()=>{
    setLoggedIn(false)
    setLoggingIn(true)
    setUsername("")
    setPassword("")
    clearLocalStorage()
  }

  const validate = ()=>{
    console.log(username,password)
    if(!username) {setError("You must have a username."); return false}
    else if(!password) {setError("You must have a password."); return false}
    else if(username.length < 4 ) {setError("Username must be at least 4 characters."); return false}
    else if(password.length < 4 ) {setError("Password must be at least 4 characters."); return false}
    else return true
  }


  const registerAuth = async (e)=>{
    e.preventDefault()
    if(!validate()) return
    if( await checkUsername() ) return setError("Username already exists.")

    const response = await fetch(process.env.REACT_APP_FIREBASE_DATABASE_URL+'users.json',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        username,
        password
      })
    })

    if(response.ok){
      const data = await response.json()
      setUserID(data.name)
      setLoggedIn(true)
      setError("")
      setTimeout(()=>{
        setLocalStorage({
          username,
          password,
          userID
        })
      },1)
      
    }

   
      

   
  }

  const trackersArr = trackers.map(tracker=>(

  <motion.div
  initial={{ rotate: 20, scale: 0, opacity:0,  }}
  animate={{ rotate: 0, scale: 1, opacity:1 }}
  key={tracker.randomNum}
  layout
  exit={{ height:0, x:250, rotate:20, opacity:0 }}
  transition={{
    type: "spring",
    stiffness:130,
    damping:20,
    duration:0
  }}
  >
  <Tracker 
    deleteTracker={()=>deleteTracker(tracker)} 
    tracker = {{...tracker}}
    userID={userID} 
    trackersList={[...trackers]}
    key={tracker.randomNum}
    modifyTracker={modifyTracker}
  ></Tracker>
  </motion.div>
  )

  )


  return (
    <div className="App">
      <Header>
      </Header>
      

      {/*LOGIN SCREEN*/}
      {loggedIn && 
      <motion.div
      initial={{x:200}}
      animate={{x:0}}
      >
         <FlexButtonRow >
          <Button className="red" onClick={logOut} href="#">Logout</Button><Button className="blue" onClick={viewPasswordChange} href="#">Edit Password</Button>

          <br/>
        <Button className="green" onClick={addTracker}>Add <i class="fas fa-plus"></i></Button> 
        </FlexButtonRow >
         {isChangingPass && <Modal
        password={password}
        username={username}
        setPassword={setPassword}
        userID={userID}
        viewPasswordChange={viewPasswordChange}
        ></Modal>}
      </motion.div>
     
      
      }
      

      {/* The time trackers */}
      {loggedIn && 
          <AnimatePresence>{trackersArr.reverse()}</AnimatePresence>}

      {/* A login page */}
      {!loggedIn && loggingIn &&
      
      <Login>
        <form onSubmit={loginAuth}>
        <h2>Log In</h2>
        <div className="form-control">
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" type="text"/>
        </div>
        <div className="form-control">
          <input value={password} onChange={e=>setPassword(e.target.value)}  placeholder="password" type="password"/>
        </div>
        <button type="submit">Login</button>
        <p>Or <a onClick={()=>setLoggingIn(false)}  href="#">register.</a></p>
        <br/>
        </form>
      </Login> }


      {/* A register page */}
      {!loggedIn && !loggingIn &&
      <Login>
        <form onSubmit={registerAuth}>
        <h2>Register</h2>
        <div className="form-control">
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" type="text"/>
        </div>
        <div className="form-control">
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password"/>
        </div>
        <button type="submit">Register</button>
        <br/>
        <p>Or <a onClick={()=>setLoggingIn(true)} href="#">login.</a></p>
        <br/>
        </form>
      </Login>}


      {/* An error message */}
      {error && <div style={{color:'red'}}>{error}</div>}

    </div>
  );
}

export default App;
