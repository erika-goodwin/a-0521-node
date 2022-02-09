import { Card, Button } from "@blueprintjs/core";
import React, { useEffect, useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Welcome = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  return userContext ? (
    <Card>
      <div className="user-details">
        <div>
          <p>
            Welcome! &nbsp;
            <b>{userContext?.name}</b>
          </p>
        </div>
      </div>
    </Card>
  ) : (
    <div>Loading....</div>
  )
};

export default Welcome;
