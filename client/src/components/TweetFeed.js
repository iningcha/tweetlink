import React from 'react'
import './TweetFeed.css'
import { TwitterTweetEmbed } from 'react-twitter-embed';
import PropTypes from 'prop-types';

const TweetFeed = (props) => {

    return (
      <div className="tweetFeed">
        <h1 className="title">TweetFeed</h1>
        <div className="scrollArea">
          {props.tweets.map((listItem, i) =>
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

TweetFeed.propTypes = {
  listItems: PropTypes.array
};
