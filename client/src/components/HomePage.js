import React, { useEffect, useState } from 'react'
import TweetFeed from './TweetFeed';
import SearchBox from './SearchBox';
import TopLinks from './TopLinks';
import TopDomains from './TopDomains';
import './HomePage.css'

const HomePage = () => {

  const [listItems, setListItems] = useState([]);
  const [topLink, setTopLink] = useState(null);
  const [topDomains, setTopDomains] = useState(null);

  useEffect(() => {
    loadTweets()
  }, []);

  useEffect(() => {
    getTopDomains();
    getTopLinks();
  }, [listItems]);

  const loadTweets = async () => {
    const response = await fetch(`/getTweets`)
    const tweetItems = await response.json()
    setListItems(tweetItems.slice(0, 50))
  }

  const getTopLinks = () => {
    const domainCountMap = listItems.reduce((map, tweet) => {
      const user = tweet.user.name;
      const domain = tweet.user.entities.url && tweet.user.entities.url.urls[0].expanded_url;
      if (domain !== undefined) {
        if(!map[user]) {
          map[user] = 0;
        }
        map[user]++;
      }
      return map;
    }, {});
    const top1 = Object.entries(domainCountMap).sort((a, b) => b[1] - a[1]).slice(0, 1);
    setTopLink(top1[0]);
  }

  const getTopDomains = () => {
    const domainCountMap = listItems.reduce((map, tweet) => {
      const domain = tweet.user.entities.url && tweet.user.entities.url.urls[0].display_url;
      if (domain !== undefined) {
        if(!map[domain]) {
          map[domain] = 0;
        }
        map[domain]++;
      }
      return map;
    }, {});
    const top5 = Object.entries(domainCountMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
    setTopDomains(top5);
  }

    return (
      <div className="homepage">
        {listItems === [] || topDomains === null || topLink === null ? (
          <div>Loading...Please wait :)</div>
        ) : (
          <div className="container">
            <TweetFeed
              tweets={listItems}
            />
            <div className="rightContainer">
              <div className="linksContainer">
                <TopLinks
                  topLink={topLink}
                />
                <TopDomains
                  topDomains={topDomains}
                />
              </div>
              <SearchBox
                tweets={listItems}
              />
            </div>
          </div>
        )}
      </div>
    );
}
export default HomePage
