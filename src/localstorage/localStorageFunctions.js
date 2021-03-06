export const checkLocalStorage = (args)=>{
    
    if(localStorage.username && localStorage.password && localStorage.userID){

      args.setUsername(localStorage.username)
      args.setPassword(localStorage.password)
      args.setUserID(localStorage.userID)
      args.setLoggedIn(true)
      
      
      setTimeout(async ()=>{
        const response = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}users/${localStorage.userID}.json`)
        const data = await response.json()
        if(data.trackers) args.setTrackers(data.trackers)
        if(data.color) args.dispatch({type:data.color}); else args.dispatch({type:"CRAYON"})
      },10)

      
    }else{
      args.setTrackers([])
      args.dispatch({type:"CRAYON"})
    }
  }

export const setLocalStorage = (args)=>{
    localStorage.username = args.username
    localStorage.password = args.password
    localStorage.userID = args.userID
  }

 export const clearLocalStorage = ()=>{
    localStorage.username = ""
    localStorage.password = ""
    localStorage.userID = ""
  }