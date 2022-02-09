import { Card, Tab, Tabs } from '@blueprintjs/core'
import { useState, useContext, useEffect, useCallback } from 'react'
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome'

import { UserContext } from './context/UserContext'

function App() {
  const [currentTab, setCurrentTab] = useState("login")
  const [userContext, setUserContext] = useContext(UserContext)

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + 'users/refreshtoken', {
      method: 'POST',
      credentials: "include",
      header: { "Content-Type":"application/json"}
    }).then( async response => {
      if(response.ok){
        const data = await response.json()
        setUserContext(prev => ({ ...prev, token: dat a.token }))
      }else{
        setUserContext(prev => ({ ...prev, token: null }))
      }

      setTimeout(verifyUser, 5 * 30 * 1000) //call refreshtoken every 5 minutes to renew token
    })
  }, [setUserContext])

  useEffect(() => verifyUser(), [verifyUser])

  const syncLogout = useCallback(event => {
    if(event.key === 'logout'){
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout)

    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout])

  return (
    <div className="bp3-dark">
      {userContext.token === null ? (<Card>
        <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
          <Tab id="login" title="Login" panel={<Login />}/>
          <Tab id="register" title="Register" panel={<Register />}/>
        </Tabs>
      </Card>) : userContext.token ? (<Welcome />) : (<div>Loading.....</div>)}
    </div>
  );
}

export default App;
