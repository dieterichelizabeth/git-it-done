// user parameter w/in the getUserRepos function
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // Response object in the fetch logic with method called json which formats the response
    // make a request to the url
    fetch(apiUrl).then(function(response) {
    // The jason method then returns another promise which callback function captures the data
      response.json().then(function(data) {
        console.log(data);
      });
    });
};

// call the getUserRepos function passing my username
getUserRepos("dieterichelizabeth");
console.log("outside");



  /*
  Notes: 
  You can liken an API endpoint to a function in the sense that the same base URL 
  can return different data depending on the argument(s) given.
  getUserRepos(user); // https://api.github.com/users/<user>/repos
  */