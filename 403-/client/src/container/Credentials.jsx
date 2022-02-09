import { Card, Tab, Tabs } from '@blueprintjs/core'
import { useState, useContext,  } from 'react'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Welcome from '../pages/Welcome';

import { UserContext } from "../context/UserContext"

const Credentials = () => {
    const [currentTab, setCurrentTab] = useState("login")
    const [userContext, setUserContext] = useContext(UserContext)
   
    return (
      <div className="bp3-dark">
        {!userContext.token ? (<Card>
          <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
            <Tab id="login" title="Login" panel={<Login />}/>
            <Tab id="register" title="Register" panel={<Register />}/>
          </Tabs>
        </Card>) : userContext.token ? (<Welcome />) : (<div>Loading.....</div>)}
      </div>
    );
};

export default Credentials;
