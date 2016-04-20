var request = require('request');
var util = require("util")


//Function to expand on Objects within the console.log
function betterLog(value) {
  console.log(require('util').inspect(value, {
    depth: 20,
    colors: true
  }));
}


//This function should "return" the default homepage posts as an array of objects
function getHomepage(callback) {
  var homepageAddress = "https://www.reddit.com/.json"; // Load reddit.com/.json and call back with the array of posts
  request(homepageAddress, function(err, result) {
    var homepageObj = JSON.parse(result.body)
    callback(homepageObj.data.children);
  });
}
getHomepage(function(obj) {
  betterLog(obj)
});

/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  var homepageAddress = "https://www.reddit.com/.json"; // Load reddit.com/.json and call back with the array of posts
  request(homepageAddress, function(err, result) {
    var homepageObj = JSON.parse(result.body)
    callback(homepageObj.data.children);
  });
}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
}

/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
}

// Export the API
module.exports = {
  // ...
};
