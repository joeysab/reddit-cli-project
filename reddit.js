var request = require('request');
var util = require("util");
var inquirer = require("inquirer");


var menuChoices = [{
  name: 'Show homepage',
  value: 'home'
}, {
  name: 'Show subreddit',
  value: 'sub'
}, {
  name: 'List subreddits',
  value: 'list'
}];


var question = [{
  type: 'input',
  name: 'cat',
  message: 'What are you looking for?'
}];



var menuChoices2 = [{
    name: 'hot',
    value: 'hot'
  }, {
    name: 'new',
    value: 'new'
  }, {
    name: 'rising',
    value: 'rising'
  }, {
    name: 'controversial',
    value: 'controversial'
  }, {
    name: 'top',
    value: 'top'
  }

];

function reddit() {

  function mainMenu() {
    inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'What do you want to do?',
      choices: menuChoices
    }).then(
      function(answers) {
        if (answers.menu === "home") {
          getHomepage(function(res) {
            betterLog(res);
          });
        }
        else if (answers.menu === "sub") {
          inquirer.prompt(question).then(function(answers) {
            getSubreddit(answers.cat, function(result) {
              betterLog(result);
            });
          });
        }
        else if (answers.menu === "list") {
          inquirer.prompt(question).then(function(answers) {
              getSubreddit(answers.cat, function(result) {
                inquirer.prompt({
                  type: 'list',
                  name: 'secondMenu',
                  message: 'What do you want to do?',
                  choices: menuChoices2
                }).then(
                  if ( answers === "hot") {
                    hey
                  }
                  )

                });
              });
            }
          }
        );
      }
      mainMenu();

    }
    reddit();


    //Function to expand on Objects within the console.log
    function betterLog(value) {
      console.log(require('util').inspect(value, {
        depth: 20,
        colors: true
      }));
    }


    //This function should "return" the default homepage posts as an array of objects
    function getHomepage(callback) {
      var homepageAddress = "https://www.reddit.com/.json";
      request(homepageAddress, function(err, result) {
        var homepageObj = JSON.parse(result.body);

        var selectObj = {};
        homepageObj.data.children.forEach(function(post) {
          selectObj[post.data.name] = {
            title: post.data.title,
            url: post.data.url,
            score: post.data.score
          };
          callback(selectObj);
        });



      });
    }

    // This function should "return" the default homepage posts as an array of objects.
    // In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
    function getSortedHomepage(sortingMethod, callback) {
      var homepageAddress = "https://www.reddit.com/" + sortingMethod + ".json";
      request(homepageAddress, function(err, result) {
        var homepageObj = JSON.parse(result.body);
        var selectObj = {};
        homepageObj.data.children.forEach(function(post) {
          selectObj[post.data.name] = {
            title: post.data.title,
            url: post.data.url,
            score: post.data.score
          };
          callback(selectObj);
        });
      });
    }


    //This function should "return" the posts on the front page of a subreddit as an array of objects.
    function getSubreddit(subreddit, callback) {
      var homepageAddress = "https://www.reddit.com/r/" + subreddit + "/.json";
      console.log(homepageAddress);
      request(homepageAddress, function(err, result) {
        var homepageObj = JSON.parse(result.body)

        var selectObj = {};
        homepageObj.data.children.forEach(function(post) {
          selectObj[post.data.name] = {
            title: post.data.title,
            url: post.data.url,
            score: post.data.score
          }
          callback(selectObj);
        });
      })
    }

    /*
    This function should "return" the posts on the front page of a subreddit as an array of objects.
    In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
    */
    function getSortedSubreddit(subreddit, sortingMethod, callback) {
      var homepageAddress = "https://www.reddit.com/r/" + subreddit + "/" + sortingMethod + ".json";
      request(homepageAddress, function(err, result) {
        var homepageObj = JSON.parse(result.body)
        var selectObj = {};
        homepageObj.data.children.forEach(function(post) {
          selectObj[post.data.name] = {
            title: post.data.title,
            url: post.data.url,
            score: post.data.score
          }
          callback(selectObj);
        });
      });
    }


    //This function should "return" all the popular subreddits
    function getSubreddits(callback) {
      var homepageAddress = "https://www.reddit.com/r/subreddits.json";
      request(homepageAddress, function(err, result) {
        var homepageObj = JSON.parse(result.body);
        var selectObj = {};
        homepageObj.data.children.forEach(function(post) {
          selectObj[post.data.name] = {
            title: post.data.title,
            url: post.data.url,
            score: post.data.score
          }
          callback(selectObj);
        });
      })
    }


    // // Export the API
    // module.exports = {
    //   getHomepage: getHomepage,
    //   getSortedHomepage: getSortedHomepage,
    //   getSubreddit: getSubreddit,
    //   getSortedSubreddit: getSortedSubreddit,
    //   getSubreddits: getSubreddits
    // };
