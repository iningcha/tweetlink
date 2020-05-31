import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FaTwitter } from 'react-icons/fa';
import './Login.css'

const Login = (props) => {

  const handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    window.open("https://tweetlinks.herokuapp.com/auth/twitter", "_self");
    console.log("bruh")
    // const response = await fetch(`/auth/twitter`)
    // console.log(response)

  };

  const handleLogoutClick = () => {
    // Logout using Twitter passport api
    window.open("https://tweetlinks.herokuapp.com/auth/logout", "_self");
    // await fetch("/auth/logout");
    props.handleNotAuthenticated();
  };


    const { authenticated } = props;
    return (
      <div className="menu">
        <div className="title">TweetLink</div>
        <div class="links">
          <div className="homeLink">
            <Link className="link" to="/">Home</Link>
          </div>
          {authenticated ? (
            <button className="logout">
              <div onClick={handleLogoutClick}>Logout</div>
            </button>
          ) : (
            <button className="login">
              <div onClick={handleSignInClick}>Login with Twitter <FaTwitter/></div>
            </button>
          )}
        </div>

      </div>
    )

}
export default Login
