import React, { useEffect, useState } from 'react'
import Login from './Login'
import PreLogin from './PreLogin'
import HomePage from './HomePage'
import './Authentication.css'


const Authentication = () => {

  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        setAuthenticated(true);
      })
      .catch(error => {
        setAuthenticated(false);
        console.error("Failed to authenticate user", error);
      });
  }, []);

  const _handleNotAuthenticated = () => {
    setAuthenticated(false);
  };

    return (
      <div className="mainContainer">
        <Login
          authenticated={isAuthenticated}
          handleNotAuthenticated={_handleNotAuthenticated}
        />
        <div className="body">
          {!isAuthenticated ?
            (<PreLogin/>) : (<HomePage/>)
          }
        </div>
      </div>
    );
}
export default Authentication
