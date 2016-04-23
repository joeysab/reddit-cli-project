var request = require('request');
var util = require("util");
var inquirer = require("inquirer");
var imageToAscii = require("image-to-ascii");


// imageToAscii("https://octodex.github.com/images/octofez.png", (err, converted) => {
//   console.log(err || converted);
// });

// // Passing options
// imageToAscii("https://octodex.github.com/images/privateinvestocat.jpg", {
//   colored: false
// }, (err, converted) => {
//   console.log(err || converted);
// });





var menuChoices = [{
    name: 'Show homepage',
    value: 'home'
  }, {
    name: 'Show subreddit',
    value: 'sub'
  }, {
    name: 'List subreddits',
    value: 'list'
  },
  new inquirer.Separator(), {
    name: "Quit",
    value: "quit"
  }
];



function whatAreYouLookingFor(callback) {
  inquirer.prompt({
    type: 'input',
    name: 'cat',
    message: 'What are you looking for?'
  }).then(function(answers) {
    callback(answers.cat)
  })
}




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
            mainMenu();
          });
        }
        else if (answers.menu === "sub") {
          whatAreYouLookingFor(function(what) {
            getSubreddit(what, function(result) {
              betterLog(result);
              mainMenu();
            });
          });
        }
        else if (answers.menu === "list") {
          showList(function(result) {
            console.log(result)
          })
        }
        else if (answers.menu === "quit") {
          console.log("Goodbye!")
          console.log('\033c')
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
    });
    callback(selectObj);
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
    });
    callback(selectObj);
  });
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
    });
    callback(selectObj);
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

    });
    callback(homepageObj);
  })
}


//This function should "return" the posts on the front page of a subreddit as an array of objects.
function getSubreddit(subreddit, callback) {

  //WORK HERE 
  var homepageAddress = "https://www.reddit.com/r/" + subreddit + "/.json";
  if (typeof subreddit !== "string") {
    var homepageAddress = subreddit.cat.url + ".json";
  }
  request(homepageAddress, function(err, result) {
    var homepageObj = JSON.parse(result.body)
    if (subreddit === "string") {
      var selectObj = {};
      homepageObj.data.children.forEach(function(post) {
        selectObj[post.data.name] = {
          title: post.data.title,
          url: post.data.url,
          score: post.data.score
        }
      })
      callback(selectObj)
    }
    else {
      callback(homepageObj.data.children);
    }
  })
}













function chooseSubreddit(listOfSubs, callback) {
  var menuChoices2 = [new inquirer.Separator(), {
    name: "GO BACK----------------------------",
    value: "goBack"
  }];
  listOfSubs.data.children.forEach(function(post) {
    menuChoices2.push(new inquirer.Separator());

    var objToPush = {
      name: post.data.title,
      value: post.data
    }

    menuChoices2.push(objToPush)
  })
  inquirer.prompt({
    type: 'list',
    name: 'cat',
    message: 'Choose a post',
    choices: menuChoices2
  }).then(function(answer) {
    if (answer.cat === "goBack") {
      reddit();
    }
    else {
      callback(answer);
    }
  });
}


function selectPostWithinSubreddit(listOfSubSub, callback) {
  var menuChoices3 = [new inquirer.Separator(), {
    name: "GO BACK----------------------------",
    value: "goBack"
  }];
  listOfSubSub.forEach(function(post) {
    menuChoices3.push(new inquirer.Separator());



    var objToPush = {
      name: post.data.title,
      value: post.data
    };

    menuChoices3.push(objToPush);
  });
  inquirer.prompt({
    type: 'list',
    name: 'cat',
    message: 'Choose a post',
    choices: menuChoices3
  }).then(function(answer) {
    if (answer.cat === "goBack") {
      reddit();
    }
    else {
      callback(answer);
    }
  });
}




// 1. retrieve list of subreddits
// 2. Have the user choose a subreddit
// 3. fetch the subreddit that was requested.
// 4. display the post for that subreddit.
// */
function showList(callback) {
  getSubreddits(function(subs) {
    chooseSubreddit(subs, function(choice) {
      getSubreddit(choice, function(list) {
        selectPostWithinSubreddit(list, function(answer) {
          if (answer.cat.thumbnail.indexOf('.jpg', '.gif', '.png')) {
            imageToAscii(answer.cat.thumbnail, {
              colored: true
            }, function(err, converted) {
              if (err) {
                callback({
                  name: answer.cat.title,
                  url: answer.cat.url
                })
              }
              else {
                callback(converted)
              }
            });
          }
        });
      });
    });
  });
}