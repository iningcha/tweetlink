import React from 'react'
import { FaTwitter } from 'react-icons/fa';
import './PreLogin.css'

const PreLogin = (props) => {

    return (
      <div className="prelogin">
        <h1>Welcome to TweetLink</h1>
        <h3 className="subtext">Login with Twitter to unlock features</h3>
        <FaTwitter className="twitterIcon"/>
      </div>

    )

}
export default PreLogin
