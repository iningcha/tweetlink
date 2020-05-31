const cookieSession = require("cookie-session");
const express = require("express");
const app = express();

const passport = require("passport");
const passportSetup = require("./config/passportSetUp");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // parse cookie header
const bodyParser = require('body-parser');

// connect to mongodb
mongoose.connect(keys.MONGODB_URI, () => {
  console.log("connected to mongo db");
});
app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// set up routes
app.use("/auth", authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

app.get("/getTweets", (req, res) => {
  try {
    const TimelineTweet = require('./models/timelineTweetModel');
    // get all the users
    TimelineTweet.find({}).sort('created_at').exec(function(err, tweets) {
      if (err) throw err;
      res.json(tweets);
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/findByHashTag", (req, res) => {
  try {
    const TimelineTweet = require('./models/timelineTweetModel');
    // get all the users
    var query = "#" + req.query.param;
    TimelineTweet.find({"text": { "$regex": query, "$options": "i" }}, function(err, tweets) {
      if (err) throw err;
      res.json(tweets);
      console.log(tweets.length)
    });

  } catch (err) {
    console.error(err);
  }
});

app.get("/findByLocation", (req, res) => {
  try {
    const TimelineTweet = require('./models/timelineTweetModel');
    // get all the users
    TimelineTweet.find({"user.location": { "$regex": req.query.param, "$options": "i" }}, function(err, tweets) {
      if (err) throw err;
      res.json(tweets);
    });
  } catch (err) {
    console.error(err);
  }
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})


