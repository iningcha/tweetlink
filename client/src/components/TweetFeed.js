import React, { useEffect, useState } from 'react'
import './TweetFeed.css'
import { TwitterTweetEmbed } from 'react-twitter-embed';


function TweetFeed() {

  const [listItems, setListItems] = useState([]);

  const loadTweets = async () => {
    const response = await fetch(`/getTweets`)
    const tweetItems = await response.json()
    // console.log(tweetItems)
    // listItems.map(listItem =>
    //   console.log("woooyay", listItem)
    // )

    setListItems(tweetItems.slice(0,5))
  }

  useEffect(() => {
    loadTweets();
  }, []);


  // const handleSignInClick = () => {
  //   // Authenticate using via passport api in the backend
  //   // Open Twitter login page
  //   // Upon successful login, a cookie session will be stored in the client
  //   window.open("http://localhost:5000/auth/twitter", "_self");
  // };

  // const handleLogoutClick = () => {
  //   // Logout using Twitter passport api
  //   // Set authenticated state to false in the HomePage
  //   window.open("http://localhost:5000/auth/logout", "_self");
  //   props.handleNotAuthenticated();
  // };

    return (
      <div>
        <h1>TweetFeed</h1>
        <div>
          {listItems.map((listItem, i) =>
            <TwitterTweetEmbed
              key={i}
              tweetId={listItem.id_str}
           />
          )}
        </div>
     </div>

    )
}
export default TweetFeed
