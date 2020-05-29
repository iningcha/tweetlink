import React, { useEffect, useState } from 'react'
import Login from './Login'
import PreLogin from './PreLogin'
import './HomePage.css'
import TweetFeed from './TweetFeed';
import SearchBox from './SearchBox';
import TopLinks from './TopLinks';
import TopDomains from './TopDomains';

function HomePage() {

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

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
        console.error("Failed to authenticate user", error);
      });
  }, []);

  const _handleNotAuthenticated = () => {
    setAuthenticated(false);
  };

    return (
      <div className="homepage">
        <Login
          authenticated={isAuthenticated}
          handleNotAuthenticated={_handleNotAuthenticated}
        />
        <div>
          {!isAuthenticated ? (
            <PreLogin/>
          ) : (
            <div className="container">
              <TweetFeed/>
              <div className="rightContainer">
                <SearchBox/>
                <div className="linksContainer">
                  <TopLinks/>
                  <TopDomains/>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
export default HomePage
