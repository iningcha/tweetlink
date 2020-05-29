const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const TimelineTweet = require("../models/timelineTweetModel");
const request = require('request');
const keys = require("../config/keys");
var mtwitter = require('mtwitter');



// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    failureRedirect: "/auth/login/failed"
  }),(req, res) => { // success

    // get timeline from twitter
    var twitter = new mtwitter({
      consumer_key: keys.TWITTER_CONSUMER_KEY,
      consumer_secret: keys.TWITTER_CONSUMER_SECRET,
      access_token_key: keys.TWITTER_ACCESS_TOKEN,
      access_token_secret: keys.TWITTER_TOKEN_SECRET
  });

  twitter.get("/statuses/home_timeline.json", { "include_entities": false },
      function (err, data) {
          if (err) {
              console.error(err.toString());
          }
          // loading all the tweets into the database
          async function loadTweets() {
            try {
              await TimelineTweet.insertMany(data);
              console.log('Done!');
            } catch(e) {
              console.log(e);
            }
          }

          loadTweets();

      });

    res.redirect(CLIENT_HOME_PAGE_URL);
  });


module.exports = router;
