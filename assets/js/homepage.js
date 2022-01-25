// variables to store a reference to the form element
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
// variables to store a reference to the show repositories element
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// function to be executed upon a form submission
var formSubmitHandler = function(event) {
    // preventDefault prevents the browser from sending the fomr's input data to a URL and lets jS handle
    event.preventDefault();
    // get value from input element via nameInputEl DOM variable and store it in "username" variable
    // trim helps with user submission (if the user leaves spaces in the form)
    var username = nameInputEl.value.trim();
    // check that there's a value in the username variable
    // if there is value- then we pass the data to getUserRepos() and clear the form
    if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
    } 
    // if there is NOT value (invalid username), the window alerts to enter a username
    else {
    alert("Please enter a GitHub username");
    }
    console.log(event);
  };

// user parameter w/in the getUserRepos function
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // Response object in the fetch logic with method called json which formats the response
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
};

// accepts both the array of repo data and the term we searched for as parameters
var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    // clear old content before diplaying new content!
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // For loop to loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
    
        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
    
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

    // create a status element (adds the number of issues to each html item)
    var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // use an if statement to check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        // if no issues, display a blue checkmark 
        else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
    
    // the order of appended elements defines where the element will be placed
    // (ex. titleEl goes first since you want that to the farthest right)
    // append to container
        repoEl.appendChild(titleEl);
    
    // append container to the dom
        repoContainerEl.appendChild(repoEl);
    
    // append to container
        repoEl.appendChild(statusEl);
  }
  };


// // call the getUserRepos function passing my username (step1)
// getUserRepos("dieterichelizabeth");
// console.log("outside");

// submit even listener
userFormEl.addEventListener("submit", formSubmitHandler);

  /*
  Notes: 
  You can liken an API endpoint to a function in the sense that the same base URL 
  can return different data depending on the argument(s) given.
  getUserRepos(user); // https://api.github.com/users/<user>/repos
  */

/*
Step 1: create funtion getUserRepos to fetch data from the 
    Github API and return JSON data
Step 2: create function formSubmitHandler to 
    recieve data from form submission and return through get User Repos
Step 3: create function displayRepos to display both the repos list and search term
    then create a for loop within the funciton to diplay the results in html
Step 4: add if statements to the getUserRepos function to 
    - check the username is valid via Github's API (404 response)
    - check if the user has repositories
    - catch network errors
*/

/*
ADDITIONAL NOTES
    fetch(apiUrl).then(function(response) {
    // The jason method then returns another promise which callback function captures the data (step1)
      response.json().then(function(data) {
        console.log(data);
      });
      
    // when the response data is converted to JSON- it is sent from getUserRepos to displayRepos (step2)
    // use an if else statement to prevent 404 error
    // if the username does not exist- then window alert
    // when the HTTP request status code is in the 200's- the ok property will be true
    if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub User Not Found");
      }
    }); 
    */