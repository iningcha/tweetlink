import React, { useEffect, useState } from 'react'
import Login from './Login.js'
import './HomePage.css'
function HomePage() {


  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/auth/login/success", {
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
        setUser(responseJson.user);
      })
      .catch(error => {
        setAuthenticated(false);
        setError("Failed to authenticate user", error);
      });
  });

  const _handleNotAuthenticated = () => {
    setAuthenticated(false);
  };

  const logout = () => {
    console.log("woowee")
    fetch("http://localhost:5000/auth/logout")
      // .then(response => {
      //   if (response.status === 200) return response.json();
      //   throw new Error("failed to authenticate user");
      // })
      // .then(responseJson => {
      //   setAuthenticated(false);
      //   setUser({});
      // })
      .catch(error => {
        setError("Failed to log out user", error);
      });
  };


    return (
      <div className="App">
        <Login
          authenticated={isAuthenticated}
          handleNotAuthenticated={_handleNotAuthenticated}
        />
        <div>
          {!isAuthenticated ? (
            <h1>Welcome!</h1>
          ) : (
            <div>
              <h1>You have login succcessfully!</h1>
              <h2>Welcome {user.name}!</h2>
            </div>
          )}
        </div>
      </div>
    );
}
export default HomePage
