// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "CqAEfKdv0guT0SCkg07Q2ga3e",
  TWITTER_CONSUMER_SECRET: "7lDJoGOHtCC0hQAAjiedaeElLI1VE70yqHnywvyOFt5VrkFKbq",
  TWITTER_ACCESS_TOKEN: "769225275510956032-lYO7ZjsCZzYXbI5m5E5ahcr9Y3R6Ajp",
  TWITTER_TOKEN_SECRET: "BvZuB9pMHD90QYfymAgjE8Tve9JxD1B4b1WolMejjDuMO",
};

// const DB_USER = "tweetlink";
// const DB_PASSWORD = "DUX8riU9sUUjX7j";
// const MONGODB = {
//   MONGODB_URI: `mongodb+srv://tweetlink:${DB_PASSWORD}@cluster0-0qqap.mongodb.net/test?retryWrites=true&w=majority`
// };
const MONGODB = {
  MONGODB_URI: process.env.MONGODB_URL || "mongodb://localhost/dbName"
};


const SESSION = {
  COOKIE_KEY: "tweeklinksession"
};

const KEYS = {
  ...TWITTER_TOKENS,
  ...MONGODB,
  ...SESSION
};

module.exports = KEYS;
