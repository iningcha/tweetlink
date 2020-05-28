import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import './Login.css'

function Login(props) {


  const handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:5000/auth/twitter", "_self");
  };

  const handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:5000/auth/logout", "_self");
    props.handleNotAuthenticated();
  };

    const { authenticated } = props;
    return (
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        {authenticated ? (
          <li onClick={handleLogoutClick}>Logout</li>
        ) : (
          <li onClick={handleSignInClick}>Login</li>
        )}
      </ul>
    )

}
export default Login
